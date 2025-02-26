'use client'

import { useCart } from '@/hooks/use-cart'
import { CartItem } from '@/components/products/cart-item'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function OrderSummary() {
  const { cartItems, totalPrice } = useCart()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item}
              variant="compact"
              readonly
            />
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between font-medium pt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}