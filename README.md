# EquipRent

### Rent Smart. Build Faster.

EquipRent is a full-stack equipment rental marketplace where customers can discover, compare, favorite, and book rental equipment while owners manage listings and bookings. The platform also provides dedicated dashboards for customers, equipment owners, and administrators.

> This repository contains the **Next.js frontend** of EquipRent.

<div align="center">

[![Live Website](https://img.shields.io/badge/Live%20Website-EquipRent-f59e0b?style=for-the-badge)](https://equiprent-client-rk.vercel.app/)
[![Backend Repository](https://img.shields.io/badge/Backend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/rezasdsju/equiprent-server)

</div>

---

## Highlights

- Role-based Customer, Owner, and Admin dashboards
- Responsive equipment marketplace with search, filters, and sorting
- Equipment booking flow with Stripe Checkout
- Favorites and customer rental history
- Owner listing and rental management
- Admin user, equipment, rental, and analytics management
- MongoDB-backed Better Auth authentication
- Responsive light and dark themes

---

## Live Links

| Resource | Link |
|---|---|
| Live Website | https://equiprent-client-rk.vercel.app/ |
| Frontend Repository | https://github.com/rezasdsju/equiprent-client |
| Backend Repository | https://github.com/rezasdsju/equiprent-server |

---

## Key Features

### Public Experience

- High-quality responsive homepage banner
- Featured and recently added equipment sections
- Equipment category showcase
- Why Choose Us and customer review sections
- Framer Motion animations
- All Equipment page with:
  - Name and location search
  - Category filtering
  - Rental type filtering
  - Price range filtering
  - Availability filtering
  - Price and recently-added sorting
- Responsive three-column equipment card layout

### Authentication

- Email and password registration
- Password validation for uppercase, lowercase, and minimum length
- Email and password sign-in
- Google social sign-in
- MongoDB-backed Better Auth sessions
- User profile image upload through ImgBB
- Shared profile information for Customer, Owner, and Admin accounts

### Equipment Details and Booking

- Detailed equipment information and owner information
- Available quantity and rental terms
- Customer favorites
- Booking modal with:
  - Rental start and end dates
  - Required quantity
  - Contact number
  - Delivery address
  - Additional notes
- Rental duration and total amount calculation
- Stripe Checkout payment flow
- Payment success verification
- Booking and payment status updates

### Customer Dashboard

- My Rentals
- My Favorites
- My Profile
- Rental, equipment, and payment information

### Owner Dashboard

- Add Equipment
- My Equipment
- Update and delete owned equipment
- My Equipment Rentals
- Owner profile
- Owner analytics
- Monthly earnings visualization

### Admin Dashboard

- All Users
- Role changes and user management
- All Equipment
- Equipment approval and rejection
- Equipment update and deletion
- All Rentals
- Booking status management
- Admin analytics
- Monthly booking visualization

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| UI | Tailwind CSS, shadcn/ui, Base UI |
| Authentication | Better Auth, MongoDB Adapter |
| Database Access | MongoDB |
| Payments | Stripe |
| Animation | Framer Motion |
| Icons | Lucide React, React Icons |
| Theming | next-themes |
| Package Manager | npm |

---

## Project Structure

```text
app/
├── (auth)/                 # Sign in and registration
├── all-equipments/         # Equipment listing and details
├── api/                    # Auth, Stripe, and image upload routes
├── dashboard/              # Role-based dashboard routes
├── payment/                # Checkout review and success
└── page.tsx                # Homepage

components/
├── equipments/             # Equipment cards, details, filters, and booking
├── homepage/               # Homepage sections
├── shared/navbar/          # Desktop and mobile navigation
└── ui/                     # Reusable Base UI components

lib/
├── actions/                # Server-side mutations
├── api/                    # Backend API consumers
├── auth.ts                 # Better Auth server configuration
├── auth-client.ts          # Better Auth client
└── core/server.ts          # Session and authenticated fetch helpers

types/
└── Shared TypeScript interfaces
```

---

## Packages Used

### Runtime

- `next`
- `react`
- `react-dom`
- `tailwindcss`
- `@tailwindcss/postcss`
- `@base-ui/react`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `stripe`
- `@stripe/stripe-js`
- `next-themes`
- `framer-motion`
- `motion`
- `lucide-react`
- `react-icons`
- `embla-carousel-react`
- `class-variance-authority`
- `cn`
- `server-only`
- `shadcn`
- `tw-animate-css`

### Development

- `typescript`
- `eslint`
- `eslint-config-next`
- `prettier`
- `prettier-plugin-tailwindcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`

---

## Local Development

### Prerequisites

- Node.js
- npm
- MongoDB database
- Running EquipRent backend server
- Stripe account
- ImgBB API key
- Google OAuth credentials for social sign-in

### Installation

```bash
git clone https://github.com/rezasdsju/equiprent-client.git
cd equiprent-client
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
IMGBB_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checking |
| `npm run format` | Format TypeScript and TSX files |

---

## Related Repository

- [EquipRent Backend](https://github.com/rezasdsju/equiprent-server)

---

<div align="center">

Built with Next.js and TypeScript for a connected equipment rental marketplace.

</div>
