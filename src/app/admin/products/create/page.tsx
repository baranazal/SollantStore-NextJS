import { Metadata } from 'next'
import ProductForm from '@/components/products/product-form'

export const metadata: Metadata = {
  title: 'Create Product - Admin Dashboard',
  description: 'Create a new product',
}

export default function CreateProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>
      <ProductForm />
    </div>
  )
}