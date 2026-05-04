# Cartzy 🛒

A modern e-commerce web app built with React — featuring dark/light theme, smooth animations, Clerk authentication, EmailJS contact form, and fully responsive design.

🔗 **Live:** https://ecommerce-site-roan-gamma.vercel.app  
💻 **Repo:** https://github.com/anjumhere/Ecommerce-website-react

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS v4 | Styling |
| Swiper.js | Hero carousel |
| Clerk | Authentication |
| EmailJS | Contact form emails |
| Axios | HTTP requests |
| Lucide React + React Icons | Icons |
| Nominatim (OpenStreetMap) | Reverse geocoding |
| Vercel | Deployment |

---

## Project Structure

```
cartzy/
├── public/
├── src/
│   ├── assets/
│   │   └── banner.jpg
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navbar, mobile drawer, theme toggle, location
│   │   ├── Carousel.jsx      # Hero slider with floating product images
│   │   ├── Category.jsx      # Infinite marquee of product categories
│   │   ├── FeaturesSection.jsx
│   │   ├── MidBanner.jsx     # Parallax banner
│   │   └── Footer.jsx
│   ├── context/
│   │   └── DataContext.jsx   # Global state — products, cart
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx      # Grid with sidebar filters
│   │   ├── Cart.jsx          # Cart + order summary
│   │   ├── About.jsx
│   │   ├── Contact.jsx       # Working EmailJS form
│   │   └── SignIn.jsx
│   ├── App.jsx               # Router + theme state + location logic
│   ├── main.jsx              # Entry — ClerkProvider + DataProvider
│   └── index.css
├── .env                      # Local only — never pushed
├── .gitignore
├── README.md
├── vercel.json
└── vite.config.js
```

---

## Features

### Hero Carousel
- Built with Swiper.js, autoplay every 4 seconds
- 5 dark slides each with a unique accent color
- Product image floats with `floatY` CSS keyframe animation
- Ambient glow blob + colored drop-shadow matches each slide's accent
- Decorative concentric rings on desktop
- Responsive: column layout on mobile, side-by-side on desktop
- Uses `useIsMobile` hook — necessary because Swiper overrides Tailwind flex classes on SwiperSlide

### Category Marquee
- Infinite scrolling ticker of 10 product categories
- Duplicated array for seamless loop
- Pauses on hover
- Each chip has its own pastel color scheme

### Products Page
- Category filter — matches against `product.category`
- Price filter — max price thresholds ($100, $200, $400, $500, $1000, $1200)
- Clear Filters button appears when any filter is active
- Collapsible category list
- Mobile: sidebar hidden behind a Filters toggle button
- Product cards with hover lift, discount badge, word-limited titles

### Cart
- Quantity controls (+ / −) via `updateQuantity`
- Remove item via `removeFromCart`
- Subtotal = sum of `price × quantity` (fixed from original bug)
- Shipping = $15 flat, FREE if subtotal > $100
- "Add $X more for free shipping" nudge
- Promo code input field
- Checkout stepper: Cart → Shipping → Payment
- Empty cart state with CTA

### Contact Form (EmailJS)
- Sends real emails directly to Gmail — no backend needed
- Inquiry type selector (General inquiry / Product Support)
- Loading state ("Sending...") while submitting
- Success screen after message is sent
- Error message if something fails
- All fields validated with `required`

### Theme Changer
- `theme` state (`"light"` | `"dark"`) in App.jsx
- Passed as prop to every component
- Toggle button (☀️ / 🌙) in Navbar — desktop and mobile
- Every component responds: backgrounds, text, borders, cards, inputs

### Location Detection
- "Add Address" pill in Navbar
- Uses `navigator.geolocation` → reverse geocoded via Nominatim
- Displays county + state from API response

### Auth (Clerk)
- Sign In / Sign Out via Clerk hosted UI
- `<Show when="signed-in/out">` conditional rendering
- UserButton avatar shown when signed in

### Responsive Navbar
- Desktop: full nav links, location, theme, cart, sign in
- Mobile: hamburger menu with drawer
- Cart badge shows count

### MidBanner Parallax
- Custom JS parallax via `useRef` + scroll listener
- `backgroundPositionY` shifts at 0.2× scroll speed
- Works on iOS Safari (unlike `background-attachment: fixed`)

---

## Bugs Fixed

| File | Bug | Fix |
|---|---|---|
| Cart.jsx | `acc * item.price` (multiplication) | `acc + item.price * item.quantity` |
| Cart.jsx | Order Summary was empty `<div>` | Built full summary panel |
| FeaturesSection.jsx | All 4 features said "Free Shipping" | Each has correct label and description |
| Products.jsx | Filter matched `product.description` | Fixed to match `product.category` |
| MidBanner.jsx | `background-attachment: fixed` breaks on iOS | Replaced with JS scroll parallax |
| Contact.jsx | `ring-blue-500` off-brand | Changed to `ring-red-400` |
| Carousel.jsx | Tailwind flex ignored by Swiper | Switched to inline styles + `useIsMobile` |
| Navbar.jsx | No mobile menu | Added hamburger + drawer |

---

## Installation

```bash
git clone https://github.com/anjumhere/Ecommerce-website-react.git
cd Ecommerce-website-react
npm install
```

Create a `.env` file:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Get your key from [dashboard.clerk.com](https://dashboard.clerk.com)

```bash
npm run dev
```

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | dashboard.clerk.com → API Keys |

> EmailJS credentials are handled directly in `Contact.jsx` — the public key is safe to expose in frontend code by design.

---

## Deployment

Deployed on **Vercel**. To deploy your own:

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add `VITE_CLERK_PUBLISHABLE_KEY` under Settings → Environment Variables
4. Deploy

---

## Routes

| Path | Page |
|---|---|
| `/` | Home — carousel, banner, features |
| `/products` | Product grid with filters |
| `/cart` | Cart + order summary |
| `/about` | Brand story, stats, team |
| `/contact` | Working contact form |
| `/signin` | Sign in placeholder |

---

## Design

### Carousel Accent Colors
| Slide | Background | Accent |
|---|---|---|
| 1 | `#0a0a0a` | `#ff6b35` Orange |
| 2 | `#060d18` | `#3b82f6` Blue |
| 3 | `#08060f` | `#a855f7` Purple |
| 4 | `#06100a` | `#22c55e` Green |
| 5 | `#100808` | `#f43f5e` Rose |

### Animations
| Name | Where | Duration |
|---|---|---|
| `floatY` | Carousel product image | 5s infinite |
| `scroll` | Category marquee | 35s infinite |
| `scrollPulse` | About page hero | 1.8s infinite |
| FadeIn (IntersectionObserver) | About page sections | 0.6s on scroll |

---

## Author

**Adnan**  
GitHub: [@anjumhere](https://github.com/anjumhere)

---

## License

MIT
