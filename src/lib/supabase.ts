import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Initialize the Supabase client with explicit headers
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Prefer': 'return=minimal'
      }
    }
  }
)

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function isAdmin(userId: string) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return false;

    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()
      .throwOnError();
    
    return data?.is_admin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function setUserAsAdmin(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', userId)
    
  if (error) {
    console.error('Error setting user as admin:', error)
    return false
  }
  return true
} 