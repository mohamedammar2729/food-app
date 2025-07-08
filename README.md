# 🍕 Food Ordering Application

A modern, full-stack food ordering application built with Next.js, featuring multi-language support, authentication, cart management, and admin functionality.

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.7.0-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24.11-purple?style=flat-square)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Internationalization](#-internationalization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization

- **NextAuth.js** integration with multiple providers
- Role-based access control (Admin/User)
- Secure session management
- Protected routes and API endpoints

### 🛒 E-commerce Functionality

- **Product catalog** with categories
- **Shopping cart** with Redux state management
- **Product customization** (sizes, extras)
- **Order management** system
- **Best sellers** tracking

### 🌍 Internationalization (i18n)

- **Multi-language support** (English & Arabic)
- **RTL/LTR** layout support
- **Dynamic locale switching**
- Server-side translations

### 🎨 Modern UI/UX

- **Responsive design** with TailwindCSS
- **Component-based architecture** with Radix UI
- **Dark/Light theme** support
- **Loading states** and error handling
- **Toast notifications** with Sonner

### 👨‍💼 Admin Panel

- **Product management** (CRUD operations)
- **Category management**
- **User management**
- **Order tracking**
- **Analytics dashboard**

### 🖼️ Media Management

- **Cloudinary** integration for image uploads
- **Optimized image delivery**
- **Multiple image formats** support

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15.3.1](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### State Management

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Predictable state container
- **[React Redux](https://react-redux.js.org/)** - Official React bindings

### Backend & Database

- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js

### Validation & Forms

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms

### Cloud Services

- **[Cloudinary](https://cloudinary.com/)** - Image and video management
- **[Vercel](https://vercel.com/)** - Deployment platform

## 🏗️ Architecture

```
📁 src/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 [locale]/           # Internationalized routes
│   ├── 📁 api/                # API routes
│   └── 📁 auth/               # Authentication pages
├── 📁 components/             # Reusable React components
│   ├── 📁 ui/                 # Base UI components
│   ├── 📁 form-fields/        # Form components
│   └── 📁 menu/               # Menu-specific components
├── 📁 lib/                    # Utility functions
├── 📁 server/                 # Server-side logic
│   ├── 📁 db/                 # Database queries
│   └── 📁 _actions/           # Server actions
├── 📁 redux/                  # State management
├── 📁 Types/                  # TypeScript definitions
└── 📁 validations/           # Zod schemas
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **PostgreSQL** database
- **Yarn** or **npm** package manager
- **Cloudinary** account for image management

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd food-app
```

2. **Install dependencies**

```bash
yarn install
# or
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

4. **Configure your environment variables** (see [Environment Variables](#-environment-variables))

5. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

6. **Start the development server**

```bash
yarn dev
# or
npm run dev
```

7. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/food_app"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application
NODE_ENV="development"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## 🗃️ Database Setup

This project uses **Prisma** with **PostgreSQL**. The database schema includes:

- **Users** - User accounts and profiles
- **Products** - Food items with customizable options
- **Categories** - Product categorization
- **Orders** - Order management
- **Sizes & Extras** - Product customization options

### Key Commands

```bash
# Generate Prisma client
npx prisma generate

# Apply database migrations
npx prisma migrate dev

# Reset database (development only)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 📁 Project Structure

### Key Directories

#### `src/app/`

- **App Router** structure with internationalized routes
- **API routes** for backend functionality
- **Page components** for different routes

#### `src/components/`

- **Reusable components** organized by feature
- **UI components** using Radix UI primitives
- **Form components** with validation

#### `src/lib/`

- **Utility functions** and helpers
- **Database connection** and caching
- **Translation** and internationalization logic

#### `src/server/`

- **Server actions** for form handling
- **Database queries** organized by entity
- **Authentication** configuration

#### `src/redux/`

- **Redux store** configuration
- **Feature slices** (cart management)
- **Type-safe hooks**

## 🔌 API Routes

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth.js handlers

### File Upload

- `POST /api/upload` - Cloudinary image upload

### Protected Routes

All admin routes require authentication and proper role permissions.

## 🌍 Internationalization

The application supports multiple languages with:

- **Dynamic routing** (`/en/...`, `/ar/...`)
- **Server-side translations** using JSON dictionaries
- **RTL/LTR layout** support
- **Middleware-based** locale detection

### Adding New Languages

1. Create a new dictionary file in `src/dictionaries/`
2. Update the `i18n-config.ts` file
3. Add language to the enum in `src/constants/enums.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** automatically on every push to main

### Manual Deployment

```bash
# Build the application
yarn build

# Start the production server
yarn start
```

### Database Migration for Production

```bash
# Apply migrations to production database
npx prisma migrate deploy
```

## 📝 Available Scripts

| Script       | Description                             |
| ------------ | --------------------------------------- |
| `yarn dev`   | Start development server with Turbopack |
| `yarn build` | Build the application for production    |
| `yarn start` | Start the production server             |
| `yarn lint`  | Run ESLint for code quality             |

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting
- Write **meaningful commit messages**
- Add **proper TypeScript types**
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

[⬆ Back to Top](#-food-ordering-application)

</div>
