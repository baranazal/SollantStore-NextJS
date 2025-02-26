import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

// Use NoSSR to prevent window reference errors
const TermsContent = dynamic(() => import('./terms-content'), {
  loading: () => <LoadingTerms />,
})

export const metadata: Metadata = {
  title: 'Terms & Conditions - E-commerce Store',
  description: 'Terms and conditions for using our service',
}

function LoadingTerms() {
  return (
    <div className="container py-8">
      <Skeleton className="h-12 w-[300px] mb-8" />
      <div className="space-y-8">
        {/* Section 1 */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-24 w-full" />
        </div>
        {/* Section 2 */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* Section 3 */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-[180px]" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <TermsContent />
    </div>
  )
}