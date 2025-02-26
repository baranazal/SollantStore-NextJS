import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import ProductForm from '@/components/products/product-form'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: product } = await supabase
    .from('products')
    .select()
    .eq('id', (await params).id)
    .single()

  return {
    title: product ? `Edit ${product.name} - Admin Dashboard` : 'Edit Product - Admin Dashboard',
    description: 'Edit product details',
  }
}

export default async function EditProductPage({ params }: Props) {
  const { data: product } = await supabase
    .from('products')
    .select()
    .eq('id', (await params).id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm product={product as unknown as Product} />
    </div>
  )
}