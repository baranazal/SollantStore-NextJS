import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

const ProfileContent = dynamic(
  () => import('./profile-content'),
  { 
    loading: () => <LoadingProfile />,
    ssr: true
  }
)

export const metadata: Metadata = {
  title: 'Profile - E-commerce Store',
  description: 'Manage your profile settings',
}

function LoadingProfile() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-6">
        <div className="space-y-4">
          {/* First Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Last Name */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Country */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* City */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Village */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Street Address */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          
          {/* Submit Button */}
          <Skeleton className="h-10 w-[120px] mt-6" />
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <ProfileContent />
    </div>
  )
}