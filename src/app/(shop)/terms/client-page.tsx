'use client'

import dynamic from 'next/dynamic'

const TermsContent = dynamic(
  () => import('./terms-content'),
  { ssr: false }
)

export default function ClientPage() {
  return <TermsContent />
} 