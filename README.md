# Perfume eCommerce Project

## Frontend

**Tech Stack:**
- React (with functional components and hooks)
- Vite (for fast development/build)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations)
- React Router DOM (routing)
- Axios (API requests)
- React Hot Toast (notifications)
- React Icons (iconography)
- ESLint (linting)

**Key Functionalities:**
- **Home Page:**  
	- Hero banner, category filter tabs (Men, Women, Unisex)
	- Product grid with cards, loading skeletons, error handling
	- Features section (Free Shipping, Authenticity, Returns, Secure Payment)
- **Product Page:**  
	- Detailed product info, image gallery, available sizes, price/discount
	- Add to cart, wishlist, and share (WhatsApp, Facebook, Twitter, copy link)
	- Reviews section: view and add reviews with live update
- **Theme Support:**  
	- Light/Dark mode with context provider
- **Routing:**  
	- Home and product detail pages

- **Skeleton Loading Components:**
	- Custom skeletons for product cards, product page, and images to enhance perceived performance during data loading.
- **Responsive Design:**
	- Fully responsive layout using Tailwind CSS, optimized for mobile, tablet, and desktop screens.

---

## Backend

**Tech Stack:**
- Node.js with Express.js (REST API)
- MongoDB with Mongoose (database and models)
- dotenv (environment variables)
- CORS (cross-origin requests)
- Nodemon (dev server)

**Key Functionalities:**
- **Product APIs:**  
	- Get all products, get by category, get by ID, search by name/brand/description
- **Review APIs:**  
	- Get all reviews for a product, add a new review (with validation)
	- Automatically updates product’s average rating and review count
- **Models:**  
	- Product: name, descriptions, price, category, sizes, images, rating, stock, brand
	- Review: product reference, user name, rating, comment, timestamp
- **Seed Data:**  
	- Script to populate the database with initial products/reviews
- **Middleware:**  
	- JSON parsing, URL-encoded data, static assets

---

This project is a full-stack perfume eCommerce platform with a modern UI, robust backend, and all essential features for a shopping experience.
