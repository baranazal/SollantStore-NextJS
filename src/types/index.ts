export interface Product {
    id: string
    name: string
    description: string
    price: number
    quantity: number
    product_type: 'digital' | 'electronic'
    category: string
    image_url: string
    created_at: string
    updated_at: string
  }
  
  export interface CartItem {
    id?: string
    user_id?: string | null
    session_id?: string | null
    product_id: string
    quantity: number
    product: Product
    created_at?: string
  }
  
  export interface Order {
    id: string
    user_id: string
    total_amount: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    shipping_address: ShippingAddress
    payment_method: 'card' | 'paypal'
    order_items: OrderItem[]
    created_at: string
    updated_at: string
    profiles?: {
      first_name: string | null
      last_name: string | null
      email: string
    }
  }
  
  export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    product_name: string
    quantity: number
    price: number
    product?: Product
  }
  
  export interface ShippingAddress {
    first_name: string
    last_name: string
    email: string
    phone: string
    country: string
    city: string
    street_address: string
    postal_code: string
  }
  
  export interface UserProfile {
    id: string
    email: string
    first_name: string
    last_name: string
    phone?: string
    country: string
    city: string
    village: string
    street_address: string
    is_admin?: boolean
    created_at: string
    updated_at: string
  }
  
  export interface Review {
    id: string
    user_id: string
    product_id: string
    rating: number
    comment: string
    user?: {
      first_name: string
      last_name: string
    }
    created_at: string
  }
  
  export interface DigitalCode {
    id: string
    product_id: string
    code: string
    is_used: boolean
    used_by?: string
    used_at?: string
    created_at: string
  }