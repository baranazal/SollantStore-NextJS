import { Metadata } from 'next'
import LoginForm from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login - E-commerce Store',
  description: 'Login to your account',
}

export default function LoginPage() {
  return <LoginForm />
}