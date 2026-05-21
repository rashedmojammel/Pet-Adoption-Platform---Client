# 🐾 PetNest — Pet Adoption Platform

## Purpose

PetNest is a full-stack pet adoption platform that connects pet owners with potential adopters. Users can browse available pets, submit adoption requests, and manage their listings — all in one place.

---

## 🌐 Live URL

[https://pet-adoption-platform-client.vercel.app](https://pet-adoption-platform-client.vercel.app)

---

## ✨ Features

- **JWT Authentication** — Secure login, signup, and Google OAuth via `better-auth` with HTTPOnly cookie-based JWT tokens
- **Pet Listings** — Add, edit, and delete pet listings with full details including species, breed, age, health status, vaccination, and adoption fee
- **Adoption Request System** — Users can submit adoption requests; pet owners can approve or reject from a requests modal — approving one auto-rejects all others and marks the pet as adopted
- **Adoption Control** — Pet owners cannot adopt their own pets; adopted pets are locked from further requests
- **My Listings Dashboard** — Pet owners see all their listed pets with live stats (Total / Available / Adopted) and manage requests per pet
- **My Requests Page** — Adopters can track request status (Pending / Approved / Rejected) and cancel pending requests
- **Search & Filter** — Search pets by name with debounce and filter by species using MongoDB `$regex` and `$in` operators
- **Wishlist** — Save favourite pets to a local wishlist with one click; persisted in `localStorage`
- **Framer Motion Animations** — Smooth fade-in and slide-up animations on all home page sections and pet cards
- **Fully Responsive** — Mobile-first design across all pages using Tailwind CSS

---

## 📦 NPM Packages Used

### Frontend (Next.js)

| Package | Purpose |
|---|---|
| `next` | React framework with server components and routing |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication (email/password + Google OAuth + JWT plugin) |
| `@heroui/react` | UI component library (Modal, Button, Select, TextField, etc.) |
| `framer-motion` | Page and card animations |
| `react-toastify` | Toast notifications |
| `react-icons` | Icon library (FaPaw, FaDog, etc.) |
| `@gravity-ui/icons` | Additional icon set |
| `tailwindcss` | Utility-first CSS framework |

### Backend (Express)

| Package | Purpose |
|---|---|
| `express` | Node.js web framework |
| `mongodb` | MongoDB driver for database operations |
| `dotenv` | Environment variable management |
| `cors` | Cross-origin resource sharing |
| `jose-cjs` | JWT verification using JWKS from better-auth |

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/pet-adoption-platform.git
```

### Frontend setup

```bash
cd client
npm install
npm run dev
```

### Backend setup

```bash
cd server
npm install
node index.js
```

### Environment Variables

**Frontend `.env.local`**

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Backend `.env`**

```env
MONGODB_URI=your_mongodb_uri
PORT=5000
CLIENT_URL=http://localhost:3000
```

---

## 🗂️ Project Structure
