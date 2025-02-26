'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Route } from 'next'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, cartItems } = useCart()
  const isInCart = cartItems.some(item => item.product_id === product.id)

  const handleAddToCart = async () => {
    try {
      await addItem(product.id)
      toast.success('Added to cart')
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to add to cart')
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{product.name}</CardTitle>
          <Badge variant={product.product_type === 'digital' ? 'secondary' : 'default'}>
            {product.product_type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-2 w-full">
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={isInCart || product.quantity === 0}
          >
            {product.quantity === 0 ? (
              'Out of Stock'
            ) : isInCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            asChild
          >
            <Link href={`/products/${product.id}` as Route<`/products/${string}`>}>
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}