import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/supabase'

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const isProtectedRoute = (path: string) => path.match(/\/(profile|orders)/)
  
  // Check if we're on a protected route using headers
  const headers = new Headers()
  const url = headers.get('x-url') || ''
  
  if (!user && isProtectedRoute(url)) {
    redirect('/login')
  }

  return <>{children}</>
}