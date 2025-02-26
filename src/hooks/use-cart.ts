'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import { CartItem } from '@/types'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useEffect } from 'react'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  totalPrice: number
  cartItems: CartItem[]
  cartItemsCount: number
  toggleCart: () => void
  addItem: (productId: string) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => void
  setItems: (items: CartItem[]) => void
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalPrice: 0,
      cartItems: [],
      cartItemsCount: 0,
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      addItem: async (productId: string) => {
        try {
          const { data: product } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()

          if (!product) throw new Error('Product not found')
          if (product.quantity < 1) throw new Error('Product out of stock')

          const { data: { user } } = await supabase.auth.getUser()
          
          const cartItem: CartItem = {
            product_id: productId,
            user_id: user?.id,
            quantity: 1,
            product: {
              ...product,
              product_type: product.product_type as 'digital' | 'electronic'
            }
          }

          if (user) {
            const { error } = await supabase
              .from('cart_items')
              .insert(cartItem)

            if (error) throw error
          }

          const currentItems = get().items;
          const newItems = [...currentItems, cartItem];
          
          set({
            items: newItems,
            totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
            cartItemsCount: newItems.length
          })
        } catch (error) {
          console.error('Error adding item to cart:', error)
          throw error
        }
      },

      removeItem: async (itemId: string) => {
        try {
          const { data: { user } } = await supabase.auth.getUser()

          if (user) {
            const { error } = await supabase
              .from('cart_items')
              .delete()
              .eq('id', itemId)

            if (error) throw error
          }

          const currentItems = get().items;
          const newItems = currentItems.filter(item => item.id !== itemId);
          
          set({
            items: newItems,
            totalPrice: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
            cartItemsCount: newItems.length
          })
        } catch (error) {
          console.error('Error removing item from cart:', error)
          throw error
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        try {
          const { data: { user } } = await supabase.auth.getUser()

          if (user) {
            const { error } = await supabase
              .from('cart_items')
              .update({ quantity })
              .eq('id', itemId)

            if (error) throw error
          }

          set(state => ({
            items: state.items.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            )
          }))
        } catch (error) {
          console.error('Error updating cart item quantity:', error)
          throw error
        }
      },

      clearCart: () => set({ items: [] }),

      setItems: (items) => set({ 
        items,
        totalPrice: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        cartItemsCount: items.length
      })
    }),
    {
      name: 'cart-storage',
    }
  )
)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartStore>("cart", {
    items: [],
    isOpen: false,
    totalPrice: 0,
    cartItems: [],
    cartItemsCount: 0,
    toggleCart: () => {},
    addItem: async () => {},
    removeItem: async () => {},
    updateQuantity: async () => {},
    clearCart: () => {},
    setItems: () => {}
  });

  const cartStore = useCart();

  useEffect(() => {
    if (cart.items.length > 0) {
      cartStore.setItems(cart.items);
    }
  }, [cart.items, cartStore]);

  useEffect(() => {
    setCart(prev => ({
      ...prev,
      items: cartStore.items,
      totalPrice: cartStore.totalPrice,
      cartItems: cartStore.cartItems,
      cartItemsCount: cartStore.cartItemsCount
    }));
  }, [
    cartStore.items,
    cartStore.totalPrice,
    cartStore.cartItems,
    cartStore.cartItemsCount,
    setCart
  ]);

  return children;
};