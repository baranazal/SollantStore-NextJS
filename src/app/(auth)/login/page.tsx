// Add force-dynamic to prevent static optimization
export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { default as dynamicImport } from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

// Import LoginForm dynamically to prevent server-side rendering
const LoginForm = dynamicImport(
  () => import('@/components/auth/login-form'),
  {
    loading: () => (
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }
)

export const metadata: Metadata = {
  title: 'Login - E-commerce Store',
  description: 'Login to your account'
}

export default function LoginPage() {
  return <LoginForm />
}