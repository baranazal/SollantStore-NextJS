import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

// Use NoSSR to prevent window reference errors
const OrdersContent = dynamic(() => import('./orders-content'), {
  loading: () => <LoadingOrders />,
})

export const metadata: Metadata = {
  title: 'My Orders - E-commerce Store',
  description: 'View your order history',
}

function LoadingOrders() {
  return (
    <div className="container py-10">
      <Skeleton className="h-12 w-[200px] mb-8" />
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 bg-muted">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 p-4">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="h-6 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      <OrdersContent />
    </div>
  )
}