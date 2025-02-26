import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')

  let query = supabase
    .from('cart_items')
    .select(`
      *,
      product:products(*)
    `)

  if (user) {
    query = query.eq('user_id', user.id)
  } else if (sessionId) {
    query = query.eq('session_id', sessionId)
  } else {
    return NextResponse.json([])
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    const body = await request.json()

    // Check product stock
    const { data: product } = await supabase
      .from('products')
      .select('quantity')
      .eq('id', body.product_id)
      .single()

    if (!product || product.quantity < body.quantity) {
      return NextResponse.json(
        { error: 'Product out of stock' },
        { status: 400 }
      )
    }

    const cartItem = {
      user_id: user?.id || null,
      session_id: !user ? body.session_id : null,
      product_id: body.product_id,
      quantity: body.quantity
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert(cartItem)
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    const body = await request.json()

    let query = supabase
      .from('cart_items')
      .update({ quantity: body.quantity })
      .eq('id', body.cart_item_id)

    if (user) {
      query = query.eq('user_id', user.id)
    } else {
      query = query.eq('session_id', body.session_id)
    }

    const { data, error } = await query
      .select(`
        *,
        product:products(*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    const { searchParams } = new URL(request.url)
    const cartItemId = searchParams.get('id')
    const sessionId = searchParams.get('sessionId')

    if (!cartItemId) {
      return NextResponse.json(
        { error: 'Cart item ID required' },
        { status: 400 }
      )
    }

    let query = supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (user) {
      query = query.eq('user_id', user.id)
    } else if (sessionId) {
      query = query.eq('session_id', sessionId)
    }

    const { error } = await query

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: Error | unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}