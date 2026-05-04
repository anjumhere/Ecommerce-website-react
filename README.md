# Cartzy 🛒

> A modern, full-featured e-commerce web app built with React — featuring a dark/light theme, smooth animations, Clerk authentication, and a responsive design across all devices.

---

## 📸 Preview

| Hero Carousel | Products Page | Cart |
|---|---|---|
| Dark animated slides with floating product images | Filterable product grid | Full order summary with promo codes |

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **React Router DOM v6** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **Swiper.js** | Hero carousel / slider |
| **Clerk** | Authentication (Sign In, User Button) |
| **Axios** | HTTP requests (products API + geolocation) |
| **Lucide React** | Icons (Truck, Lock, Repeat, Clock, MapPin, etc.) |
| **React Icons** | Additional icons (Remix Icon set, Font Awesome) |
| **Nominatim (OpenStreetMap)** | Reverse geocoding for user location |

---

## 📁 Project Structure

```
cartzy/
├── public/
├── src/
│   ├── assets/
│   │   └── banner.jpg              # MidBanner background image
│   ├── components/
│   │   ├── Navbar.jsx              # Sticky navbar with mobile drawer + theme toggle
│   │   ├── Carousel.jsx            # Hero slider with floating product images
│   │   ├── Category.jsx            # Infinite marquee of product categories
│   │   ├── FeaturesSection.jsx     # 4-feature highlights strip
│   │   ├── MidBanner.jsx           # Full-width parallax banner
│   │   └── Footer.jsx              # Footer with newsletter, social links, nav
│   ├── context/
│   │   └── DataContext.jsx         # Global state — products, cart, fetchAllProducts, fetchNewProducts
│   ├── pages/
│   │   ├── Home.jsx                # Carousel + MidBanner + FeaturesSection
│   │   ├── Products.jsx            # Product grid with sidebar filters
│   │   ├── Cart.jsx                # Cart items + order summary
│   │   ├── About.jsx               # Brand story, stats, mission, values, team, CTA
│   │   ├── Contact.jsx             # Contact form with inquiry type selector
│   │   └── SignIn.jsx              # Sign-in placeholder page
│   ├── App.jsx                     # Router, theme state, location logic
│   ├── main.jsx                    # Entry point — ClerkProvider + DataProvider
│   └── index.css                   # Tailwind import + marquee keyframes
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ✨ Features

### 🎠 Hero Carousel
- Built with **Swiper.js** with autoplay (4s delay)
- 5 dark themed slides, each with a unique accent color (`#ff6b35`, `#3b82f6`, `#a855f7`, `#22c55e`, `#f43f5e`)
- Product image floats with a CSS `floatY` keyframe animation (bobs up/down 16px)
- Ambient glow blob behind each product image matches the slide's accent color
- Accent-colored `drop-shadow` on the product image
- Decorative concentric rings on desktop (bottom-right of image panel)
- Responsive: **column layout on mobile** (image top, content bottom), **row layout on desktop** (content left, image right)
- Uses a `useIsMobile` hook (`window.innerWidth < 768`) to switch layout via JS — necessary because Swiper overrides Tailwind's flex classes on `<SwiperSlide>`

### 🏷️ Category Marquee
- Infinite scrolling ticker of 10 product categories (duplicated for seamless loop)
- Each chip has a unique pastel color scheme (bg, text, border)
- Pauses on hover
- Animated via `@keyframes scroll` CSS

### 🛍️ Products Page
- Fetches products from the DataContext (`fetchNewProducts`)
- **Filter Sidebar**:
  - Category filter (checkbox) — matches against `product.category`
  - Price filter (pill buttons) — filters by max price thresholds: $100, $200, $400, $500, $1000, $1200
  - "Clear Filters" button appears when any filter is active
  - Collapsible category list (toggle +/−)
  - Mobile: sidebar hidden behind a "Filters" toggle button
- Product cards with:
  - Hover lift + shadow effect
  - "20% OFF" badge (top-right)
  - Strikethrough original price (calculated as `price / 0.8`)
  - Word-limited title (max 9 words, truncated with `…`)
  - "Add to Cart" button → calls `addToCart(product)` from DataContext

### 🛒 Cart Page
- Lists all cart items with image, title, description
- **Quantity controls** (+ / −) via `updateQuantity(id, delta)`
- **Remove item** button via `removeFromCart(id)`
- **Order Summary panel** (right column on desktop, below items on mobile):
  - Subtotal = `sum of (item.price × item.quantity)`
  - Shipping = **$15** flat, or **FREE** if subtotal > $100
  - "Add $X more for free shipping" nudge message
  - Promo code input field (UI only)
  - "Proceed to Checkout" CTA button
- **Checkout stepper**: Cart → Shipping → Payment (visual progress indicator)
- Empty cart state with illustration and "Continue Shopping" link

### 📄 About Page
- Scroll-triggered **FadeIn** animation on every section (uses `IntersectionObserver`)
- Hero section with animated entry (80ms delay), decorative gradient blobs
- **Stats strip** (dark background): 10K+ Customers, 500+ Products, 50+ Brands, 99% Satisfaction
- **Mission section**: two-column layout — text left, "Why Cartzy?" card right
- **Core Values**: 4 cards (Fast Delivery, Secure Payments, Easy Returns, 24/7 Support) with hover lift + red border effect
- **Team section**: single card for the founder with GitHub link
- **CTA section**: dark background, "Explore Products →" button
- Scroll indicator with a pulsing line animation at the bottom of the hero
- Theme-aware: all backgrounds, text, and card colors respond to dark/light mode

### 📬 Contact Page
- Inquiry type selector (General inquiry / Product Support) — active state highlighted in red
- First Name + Last Name in a 2-column grid
- Email input
- Message textarea
- All inputs use red focus ring (consistent with brand theme)
- Theme-aware card background and input styling

### 🌙 Theme Changer
- `theme` state (`"light"` | `"dark"`) lives in **`App.jsx`**
- Passed as a prop to every page and component
- Toggle button (☀️ / 🌙) in the Navbar — visible on both **desktop and mobile**
- All components respond: backgrounds, text colors, borders, card surfaces, input fields

### 📍 Location Detection
- "Add Address" pill in the Navbar
- Clicking the caret opens a dropdown with "Detect My Location" button
- Uses `navigator.geolocation` → reverse geocoded via **Nominatim (OpenStreetMap)**
- Displays `county` and `state` from the API response
- Closes dropdown automatically after location is set

### 🔐 Authentication (Clerk)
- `<ClerkProvider>` wraps the entire app in `main.jsx`
- **Signed out**: shows `<SignInButton>` → triggers Clerk's hosted sign-in flow
- **Signed in**: shows `<UserButton>` (avatar + dropdown)
- Uses Clerk's `<Show when="signed-in/out">` conditional rendering
- `DataProvider` wraps `ClerkProvider` (outermost layer)

### 📱 Responsive Navbar
- **Desktop**: Logo + location pill + nav links + theme toggle + cart icon + sign in
- **Mobile**: Logo + theme toggle + cart icon + hamburger (☰)
- Mobile drawer slides in below the header with all nav links + sign in/out
- Location pill hidden on mobile (space constraint)
- Cart badge shows item count (hidden when 0)

### 🖼️ MidBanner (Parallax)
- Full-width banner with a dark overlay on `banner.jpg`
- Custom JS parallax via `useRef` + `scroll` event listener
- `backgroundPositionY` shifts at `0.2×` scroll speed relative to element center
- Works on **iOS Safari** (unlike `background-attachment: fixed` which breaks with `border-radius`)
- `{ passive: true }` on the scroll listener for performance

### 🏗️ Features Strip
- 4 cards: Free Shipping, Secure Payments, Easy Returns, 24/7 Support
- Each has a Lucide icon inside a red-tinted rounded box
- Responsive: `grid-cols-2` on mobile, `grid-cols-4` on desktop
- Theme-aware hover background

---

## ⚠️ Bugs Fixed (from original codebase)

| File | Bug | Fix |
|---|---|---|
| `Cart.jsx` | `subtotal` used `acc * item.price` (multiplication) | Changed to `acc + item.price * item.quantity` |
| `Cart.jsx` | Order Summary was an empty `<div>` | Built full summary with subtotal, shipping, promo, checkout |
| `FeaturesSection.jsx` | All 4 features had identical "Free Shipping" label | Each feature now has correct title + description |
| `Products.jsx` | Category filter matched on `product.description` | Fixed to match on `product.category` |
| `MidBanner.jsx` | `background-attachment: fixed` breaks on iOS Safari | Replaced with JS scroll-based parallax |
| `Contact.jsx` | Focus ring used `ring-blue-500` (off-brand) | Changed to `ring-red-400` |
| `Carousel.jsx` | Tailwind flex classes ignored by Swiper on `<SwiperSlide>` | Switched to inline `style` props + `useIsMobile` hook |
| `Navbar.jsx` | No mobile menu — nav links invisible on small screens | Added hamburger + mobile drawer |

---

## 🔧 Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/anjumhere/cartzy.git
cd cartzy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Clerk

Create a `.env` file in the root:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

Get your key from [dashboard.clerk.com](https://dashboard.clerk.com).

### 4. Run the dev server

```bash
npm run dev
```

App runs at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

---

## 🌐 API & Data

### Products
Products are fetched via `DataContext` — the context exposes:

| Function | Description |
|---|---|
| `fetchAllProducts()` | Fetches products for the Hero Carousel |
| `fetchNewProducts()` | Fetches products for the Products page grid |
| `addToCart(product)` | Adds a product to `cartItems` |
| `removeFromCart(id)` | Removes an item from cart by ID |
| `updateQuantity(id, delta)` | Increments or decrements item quantity |

### Geolocation
```
GET https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json
```
Returns `address.county` and `address.state` which are displayed in the Navbar location pill.

---

## 🗺️ Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Hero carousel, parallax banner, features strip |
| `/products` | `Products` | Filterable product grid |
| `/cart` | `Cart` | Cart items + order summary |
| `/about` | `About` | Brand story, stats, team, CTA |
| `/contact` | `Contact` | Contact form |
| `/signin` | `SignIn` | Sign-in placeholder |

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| Primary Red | `#ef4444` / `#f43f5e` | Buttons, accents, badges, borders |
| Dark BG | `#0a0a0a` | Carousel slides, footer, CTA sections |
| Light BG | `#fafafa` / `#f9fafb` | Page backgrounds in light mode |
| White | `#ffffff` | Cards, navbar (light mode) |

### Carousel Accent Colors
| Slide | Background | Accent |
|---|---|---|
| 1 | `#0a0a0a` | `#ff6b35` (Orange) |
| 2 | `#060d18` | `#3b82f6` (Blue) |
| 3 | `#08060f` | `#a855f7` (Purple) |
| 4 | `#06100a` | `#22c55e` (Green) |
| 5 | `#100808` | `#f43f5e` (Rose) |

### Typography
- **Serif** (`Georgia`): Logo "C", About page headings
- **Sans-serif** (`Helvetica Neue` / system): All body text, UI elements
- **Font sizes**: Use `clamp()` throughout for fluid scaling between mobile and desktop

### Animations
| Name | Usage | Duration |
|---|---|---|
| `floatY` | Carousel product image floating | 5s infinite |
| `scroll` / `marquee` | Category marquee ticker | 35s infinite |
| `scrollPulse` | About page hero scroll indicator | 1.8s infinite |
| FadeIn (JS) | All About page sections on scroll | 0.6s per element |

---

## 📦 Key Dependencies

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router-dom": "^6",
  "swiper": "latest",
  "@clerk/react": "latest",
  "axios": "latest",
  "lucide-react": "latest",
  "react-icons": "latest",
  "remixicon": "latest"
}
```

---

## 👤 Author

**Adnan**
- GitHub: [@anjumhere](https://github.com/anjumhere)
- Project: Cartzy — built as a portfolio e-commerce project

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
