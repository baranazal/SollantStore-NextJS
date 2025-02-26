import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

// Use NoSSR to prevent window reference errors
const CartContent = dynamic(() => import('./cart-content'), {
  loading: () => <LoadingCart />,
})

export const metadata: Metadata = {
  title: 'Shopping Cart - E-commerce Store',
  description: 'View your shopping cart',
}

function LoadingCart() {
  return (
    <div className="container py-8">
      <Skeleton className="h-12 w-[200px] mb-8" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-24 w-24" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-[100px]" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="border rounded-lg p-4">
            <Skeleton className="h-6 w-[150px] mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[60px]" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[60px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <CartContent />
    </div>
  )
}