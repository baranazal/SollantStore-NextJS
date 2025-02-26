import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { Database } from '@/types/supabase'

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export const getCurrentUser = cache(async () => {
  try {
    const supabase = createServerComponentClient({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return null
    }

    return session.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
})

export async function isAdminServer() {
  try {
    const user = await getCurrentUser()
    if (!user) return false

    const supabase = createServerSupabaseClient()
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error checking admin status:', error)
      return false
    }

    return profile?.is_admin === true
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}