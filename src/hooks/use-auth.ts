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
    const { email, password, ...profile } = data
    
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: profile.firstName,
          last_name: profile.lastName,
          phone: profile.phone,
          country: profile.country,
          city: profile.city,
          village: profile.village,
          street_address: profile.streetAddress
        }
      }
    })

    if (signUpError || !user) {
      throw signUpError || new Error('Failed to create user')
    }

    return user
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
    const { data: user, error: userError } = await supabase.auth.updateUser({
      email: data.email
    })
    if (userError) throw userError

    const { error: profileError } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.user.id)

    if (profileError) throw profileError
    set({ user: user.user })
  },
}))

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  useAuth.setState({ user: session?.user || null, isLoading: false })
})