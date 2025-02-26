# 🛍️ SollantStore - Next.js E-commerce Platform

A cutting-edge, full-featured e-commerce platform built with **Next.js 13, TypeScript, Tailwind CSS, and Supabase** for a seamless shopping experience.

---

## ✨ Features

🚀 **User Experience**
- 🛒 Full shopping cart with persistent state
- 🔐 Secure user authentication with Supabase Auth
- 💳 Seamless order processing & tracking
- 🎨 Beautiful, responsive UI with dark mode support
- 📱 Mobile-first, optimized performance
- 🔍 Advanced product search and filtering
- 👤 User profiles with order history

🎯 **Admin Features**
- 📦 Product & inventory management
- 📊 Dashboard with analytics
- 🔑 Role-based access control
- 🎯 Discount & coupon system

🌍 **Performance & SEO**
- ⚡ Lightning-fast page loads with Next.js 13
- 🌐 Fully optimized for search engines
- 📡 API caching & SSR for better performance

---

## 🚀 Tech Stack

**Frontend:** Next.js 13, TypeScript, Tailwind CSS, shadcn/ui  
**Backend:** Supabase (PostgreSQL, Auth, Storage)  
**State Management:** Zustand  
**Forms & Validation:** React Hook Form, Zod  
**Styling:** Tailwind CSS, shadcn/ui  
**Deployment:** Vercel  
**Testing:** Jest, React Testing Library

---

## 📋 Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Supabase account
- Git

---

## 🛠️ Installation

1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/SollantStore-NextJS.git
cd SollantStore-NextJS
```

2️⃣ **Install Dependencies**
```sh
npm install  # or yarn install
```

3️⃣ **Set Up Environment Variables**  
Create a `.env.local` file in the root directory with the following:
```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4️⃣ **Initialize Supabase**
```sh
npx supabase init
```

5️⃣ **Run Development Server**
```sh
npm run dev  # or yarn dev
```

---

## 🗄️ Database Setup

1️⃣ **Create a new Supabase project**
2️⃣ **Run Database Migrations**
```sh
npx supabase db push
```
3️⃣ **Set Up Database Tables:**
- `products`
- `orders`
- `cart_items`
- `users`
- `profiles`
- `discounts`

---

## 🚀 Deployment

🌐 **Deploy to Vercel**
```sh
vercel login
vercel
```

📲 **Deploy to Mobile (Expo)**
```sh
expo build:android  # Android APK
expo build:ios  # iOS build
```

---

## 🧪 Testing

✅ **Run Tests**
```sh
npm run test  # or yarn test
```

---

## 📝 Environment Variables

**Required:**
```sh
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📚 Documentation

📖 [Next.js Documentation](https://nextjs.org/docs)  
📖 [Supabase Documentation](https://supabase.io/docs)  
📖 [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1️⃣ **Fork the repository**  
2️⃣ **Create your feature branch**
```sh
git checkout -b feature/my-new-feature
```
3️⃣ **Commit your changes**
```sh
git commit -m 'Add some feature'
```
4️⃣ **Push to the branch**
```sh
git push origin feature/my-new-feature
```
5️⃣ **Submit a pull request**

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👏 Acknowledgments

- 🚀 Next.js - [https://nextjs.org](https://nextjs.org)
- 🔥 Supabase - [https://supabase.io](https://supabase.io)
- 🎨 Tailwind CSS - [https://tailwindcss.com](https://tailwindcss.com)
- 🖌️ shadcn/ui - [https://ui.shadcn.com](https://ui.shadcn.com)

---

## 📧 Contact

📨 Bara Nazal - bara.naser002@gmail.com

💙 If you like this project, **give it a ⭐️!**