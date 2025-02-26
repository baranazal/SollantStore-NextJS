import dynamic from 'next/dynamic'

const ProductsContent = dynamic(
  () => import('./products-content'),
  { loading: () => <div>Loading...</div> }
)

export default function AdminProductsPage() {
  return <ProductsContent />
}