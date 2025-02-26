'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/lib/schemas'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import type { Route } from 'next'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail } from "lucide-react"

type SignInFormValues = {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verificationPending = searchParams.get('verification') === 'pending'
  const verified = searchParams.get('verified') === 'true'
  const verificationError = searchParams.get('error') === 'verification_failed'
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (verified) {
        toast.success('Email verified successfully! You can now log in.')
      } else if (verificationError) {
        toast.error('Email verification failed. Please try again.')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [verified, verificationError])

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      setIsLoading(true)
      await signIn(values.email, values.password)
      router.push('/')
      toast.success('Welcome back!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationPending && (
          <Alert className="mb-4">
            <Mail className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Please check your email to verify your account before logging in.
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="Enter your password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          <Link 
            href={'/forgot-password' as Route}
            className="text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link 
            href="/signup"
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}