import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import ProductList from '@/components/products/product-list'
import { ProductFilter } from '@/components/products/product-filter'

export const metadata: Metadata = {
  title: 'Electronic Products - E-commerce Store',
  description: 'Browse our electronic products',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ElectronicProductsPage() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('product_type', 'electronic')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching electronic products:', error)
      return (
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Electronic Products</h1>
          <p className="text-red-500">Error loading products. Please try again later.</p>
        </div>
      )
    }

    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Electronic Products</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilter productType="electronic" />
          </div>
          <div className="lg:col-span-3">
            <ProductList products={(products || []) as Product[]} />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in ElectronicProductsPage:', error)
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Electronic Products</h1>
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    )
  }
} 