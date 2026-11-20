# EquipRent: Rent Smart, Build Faster

EquipRent is an equipment rental marketplace where users can explore equipment available for rent. It provides an easy way to browse equipment, search by name or location, and find suitable equipment using filters and sorting options.

> This repository contains the **frontend** of the EquipRent project.

## Live Demo

🔗 [EquipRent Live](https://equiprent-client-rk.vercel.app/)

## Backend Repository

🔗 [EquipRent Server](https://github.com/rezasdsju/equiprent-server)

## Features

- **Responsive Navbar:** Navigation across the application.
- **User Authentication:** Sign up and sign in with email and password, including profile image upload via ImgBB.
- **User Information:** Displays the signed-in user's email and avatar in the navbar.
- **Theme Toggle:** Switch between light and dark themes.
- **Home Page Banner:** Hero section with a title, description, and call-to-action buttons.
- **All Equipment Page:** Displays approved equipment in a card layout.
- **Search:** Search equipment by name or location.
- **Filters:** Equipment category, rental type, price range, and availability status.
- **Sorting:** Price (low to high), price (high to low), and recently added.
- **Equipment Cards:** Display equipment image, name, category, rental price, rental type, location, and availability status.
- **Equipment Details Page:** Private route, available to authenticated users only.

## Technologies

- **Next.js:** React framework (App Router)
- **TypeScript:** Type-safe JavaScript
- **Tailwind CSS:** Utility-first CSS framework
- **shadcn/ui:** UI components
- **next-themes:** Light and dark theme management
- **React Icons:** Icon library
- **Framer Motion:** Animations and interactive motion effects

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB connection string
- Running EquipRent backend server

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rezasdsju/equiprent-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd equiprent-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

   Add the appropriate values for your local environment.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Related Repository

- **Frontend:** [equiprent-client](https://github.com/rezasdsju/equiprent-client)
- **Backend:** [equiprent-server](https://github.com/rezasdsju/equiprent-server)

---

Built with Next.js and TypeScript.