import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  let query = supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products(*)
      )
    `)
    .eq('user_id', user.id)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: body.total_amount,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Process each order item
    for (const item of body.items) {
      // Get product details and check stock
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', item.product_id)
        .single()

      if (!product || product.quantity < item.quantity) {
        throw new Error(`Product ${product?.name || item.product_id} is out of stock`)
      }

      // Create order item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: item.product_id,
          product_name: product.name,
          quantity: item.quantity,
          price: product.price
        })

      if (itemError) throw itemError

      // Update product stock
      const { error: stockError } = await supabase
        .from('products')
        .update({ quantity: product.quantity - item.quantity })
        .eq('id', item.product_id)

      if (stockError) throw stockError

      // If digital product, assign codes
      if (product.product_type === 'digital') {
        const { data: codes, error: codesError } = await supabase
          .from('digital_codes')
          .update({ is_used: true, used_by: user.id })
          .eq('product_id', product.id)
          .eq('is_used', false)
          .limit(item.quantity)
          .select()

        if (codesError) throw codesError

        // Add the codes to the order item
        const { error: itemUpdateError } = await supabase
          .from('order_items')
          .update({ digital_codes: codes })
          .eq('order_id', order.id)
          .eq('product_id', product.id)

        if (itemUpdateError) throw itemUpdateError
      }
    }

    // Clear user's cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    return NextResponse.json(order)
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}