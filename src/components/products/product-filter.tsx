'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductFilterProps {
  productType?: 'digital' | 'electronic'
}

export function ProductFilter({ productType }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState('')
  const [category, setCategory] = useState('')

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams)
    if (priceRange) params.set('price', priceRange)
    if (category) params.set('category', category)
    if (productType) params.set('type', productType)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50">$0 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200+">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronic">Electronic</SelectItem>
            <SelectItem value="digital">Digital</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleFilter} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}