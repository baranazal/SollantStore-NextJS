import * as z from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  village: z.string().min(1, 'Village is required'),
  street_address: z.string().min(1, 'Street address is required')
})

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  quantity: z.number().int().min(0, 'Quantity must be greater than or equal to 0'),
  product_type: z.enum(['digital', 'electronic']),
  category: z.string().min(1, 'Category is required'),
  image: z.any().optional(),
})

export const orderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string(),
    quantity: z.number().int().min(1),
  })),
  shipping_address: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    country: z.string(),
    city: z.string(),
    street_address: z.string(),
    postal_code: z.string(),
  }),
  payment_method: z.enum(['card', 'paypal']),
})

export const reviewSchema = z.object({
  product_id: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Review comment is required'),
})

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})