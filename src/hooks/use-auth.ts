import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

// Base interface for common profile fields
interface ProfileData {
  firstName: string
  lastName: string
  phone: string
  country: string
  city: string
  village: string
  streetAddress: string
}

// For new user registration - requires all fields
interface SignUpData extends ProfileData {
  email: string
  password: string
}

// For profile updates - all fields are optional
interface ProfileUpdateData extends Partial<ProfileData> {
  email?: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<User | null>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: ProfileUpdateData) => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    set({ user: data.user })
  },

  signUp: async (data: SignUpData) => {
    try {
      // Only create the auth user with all metadata
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            country: data.country,
            city: data.city,
            village: data.village,
            street_address: data.streetAddress,
          },
        },
      })

      if (signUpError) throw signUpError

      if (authData.user) {
        // Don't try to create profile manually
        // The trigger will handle it automatically
        set({ user: authData.user })
        return authData.user
      }
      
      return null
    } catch (error) {
      console.error('Error in signUp:', error)
      throw error
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ user: null })
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  },

  updateProfile: async (data: ProfileUpdateData) => {
    // Get current user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) throw new Error('No user logged in');

    // Update auth user email if provided
    if (data.email) {
      const { error: userError } = await supabase.auth.updateUser({
        email: data.email
      });
      if (userError) throw userError;
    }

    // Map the data to match the profiles table column names
    const profileData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      country: data.country,
      city: data.city,
      village: data.village,
      street_address: data.streetAddress,
      updated_at: new Date().toISOString(),
    };

    // Only include properties that are actually provided
    const cleanProfileData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(profileData).filter(([_, v]) => v !== undefined)
    );

    // Update the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update(cleanProfileData)
      .eq('id', currentUser.id);

    if (profileError) throw profileError;
    
    // Re-fetch the user to update the state
    const { data: { user } } = await supabase.auth.getUser();
    if (user) set({ user });
  },
}))

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    useAuth.setState({ user: null, isLoading: false })
  } else if (session?.user) {
    useAuth.setState({ user: session.user, isLoading: false })
  } else {
    useAuth.setState({ isLoading: false })
  }
})