'use client'

import { CartItem as CartItemType } from '@/types'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import Image from 'next/image'
import { Minus, Plus, Trash } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
  variant?: 'default' | 'compact'
  readonly?: boolean
}

export function CartItem({ item, variant = 'default', readonly }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className={`flex gap-4 ${variant === 'compact' ? 'text-sm' : ''}`}>
      <div className={`relative aspect-square ${variant === 'compact' ? 'h-16 w-16' : 'h-24 w-24'} overflow-hidden rounded-lg`}>
        <Image 
          src={item.product.image_url} 
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-medium">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">
            ${item.product.price.toFixed(2)}
          </p>
        </div>
        {!readonly && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id!, Math.max(1, item.quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id!, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeItem(item.id!)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 