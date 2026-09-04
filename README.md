# CodeNPixels — Digital Web Engineering & Software Solutions

Official website and digital service portal for **CodeNPixels** ([https://codenpixels.in](https://codenpixels.in)). CodeNPixels is a modern digital engineering and web development agency crafting high-performance custom web applications, Smart QR restaurant menu systems, cloud ERP software, billing & GST invoicing platforms, Point of Sale (POS) software, and bespoke personal branding portfolios.

---

## 🚀 Key Features

- **High-Performance Architecture**: Built with React 19, Vite 6, and Tailwind CSS 4 with ultra-smooth Motion transitions.
- **Service Portfolio & Specialized Solutions**:
  - Custom Web Application Development
  - Smart QR Menu & Restaurant Ordering Systems
  - Custom Billing & GST Invoicing Software
  - Point of Sale (POS) Systems for Retail & Hospitality
  - Cloud ERP Systems & Enterprise Resource Planning
  - Portfolio Design & Personal Branding
  - Frontend Engineering (React / Next.js) & Backend APIs
  - Website Optimization & Core Web Vitals Auditing
- **Interactive Scope & Cost Estimator**: Transparent dual-currency project pricing (INR ₹ for India, USD $ for USA/Canada/Global) with real-time scope, hours, price calculation, and 1-click form auto-population.
- **Interactive Showcase Carousels**:
  - 3D Recent Works Showcase Carousel with live demo links and tech stacks.
  - Client Success Stories Carousel with verified customer photos, star ratings, and product tags.
- **Client-Side Admin Console (`/admin`)**: Zero-backend content management with localStorage persistence and JSON backup/restore for client reviews, portfolio projects, and service pricing tiers.
- **Serverless SMTP Email Gateway**: Vercel Serverless Functions (`api/send-mail.js`) and Netlify Functions powered by Nodemailer for real-time inquiry lead alerts and automated customer confirmation receipts.
- **Technical SEO & SSG Prerendering**: Pre-rendered static HTML routes with dynamic JSON-LD Schema.org graphs, canonical URLs, descriptive OpenGraph tags, XML sitemap, and robots.txt.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Build** | React 19, Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **Animations & Icons** | Motion (`motion/react`), Lucide React |
| **Rendering Strategy** | Static Site Generation (SSG) with Node.js Prerender Pipeline |
| **Serverless Functions**| Vercel Serverless Functions (`/api/send-mail`) / Netlify Functions + Nodemailer (SMTP) |
| **Hosting & CDN** | Vercel / Netlify |

---

## 📁 Project Structure

```text
Codenpixels/
├── api/
│   └── send-mail.js         # Vercel serverless SMTP mail handler (/api/send-mail)
├── netlify/
│   └── functions/
│       └── send-mail.js     # Netlify serverless SMTP mail handler
├── public/
│   ├── google*.html         # Search Console verification file
│   ├── logo.png             # Brand logo asset
│   ├── og-image.jpg         # Social sharing preview card
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # XML URL sitemap index
├── scripts/
│   ├── prerender.js         # SSG static HTML pre-rendering pipeline
│   └── verify-routes.js     # Automated SEO, metadata & route validation
├── src/
│   ├── components/
│   │   ├── About.jsx        # Company narrative & philosophy
│   │   ├── AdminDashboard.jsx # Client-side reviews/projects/pricing console
│   │   ├── Contact.jsx      # Interactive cost estimator & inquiry intake form
│   │   ├── FAQ.jsx          # Frequently asked questions accordion
│   │   ├── Footer.jsx       # Corporate navigation & branding
│   │   ├── Hero.jsx         # Hero section with dynamic CTA
│   │   ├── Navbar.jsx       # Sticky glassmorphic navigation bar
│   │   ├── Process.jsx      # 7-Step delivery lifecycle
│   │   ├── Projects.jsx     # Filterable portfolio project gallery
│   │   ├── ServiceDetail.jsx # Dedicated detail layout for each service
│   │   ├── Services.jsx     # Services catalogue with pricing tiers
│   │   ├── Testimonials.jsx # Customer reviews carousel with client photos
│   │   └── WorkCarousel.jsx # 3D interactive recent works slider
│   ├── utils/
│   │   └── storage.js       # Client-side CRUD & sync storage controller
│   ├── App.jsx              # Single Page Application router
│   ├── data.js              # Master dataset (services, projects, reviews)
│   ├── entry-server.jsx     # SSR rendering entry point
│   ├── index.css            # Global design system & Tailwind styles
│   └── main.jsx             # Client mounting entry point
├── vercel.json              # Vercel deployment, SSG routing & security headers
├── netlify.toml             # Netlify deployment & routing configuration
├── package.json             # Dependencies & project scripts
└── vite.config.ts           # Vite configuration & dev server functions plugin
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/Chintusa/codenPixels.git
cd codenPixels
npm install
```

### 2. Configure Environment Variables
Create a local `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Fill in your SMTP credentials for contact form submissions:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="codenpixel.2022@gmail.com"
SMTP_PASS="your_16_char_app_password"
CONTACT_RECEIVER_EMAIL="codenpixel.2022@gmail.com"
SMTP_FROM_NAME="CodeNPixels Client Portal"
SMTP_SEND_AUTOREPLY="true"
```

### 3. Local Development
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The local development server automatically intercepts `/api/send-mail` and runs the serverless function handler locally.

---

## 🏗️ Building for Production & Testing

### Build & Prerender Static Pages
```bash
npm run build
```
This compiles the client bundle and generates static HTML files in `dist/` for all public routes.

### Validate SEO, Metadata & Routes
```bash
node scripts/verify-routes.js
```
Runs automated validation across all 20+ routes, checking `<h1>` hierarchy, meta titles, descriptions, canonical links, OpenGraph metadata, JSON-LD schemas, and verification files.

### Preview Production Build
```bash
npm run preview
```
Serves the compiled `dist/` output locally on [http://localhost:4173](http://localhost:4173).

---

## 🌐 Deployment

### Deploying on Vercel (Recommended)
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Vercel automatically detects configuration from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add your SMTP credentials under **Project Settings > Environment Variables**:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_SECURE`: `false`
   - `SMTP_USER`: `codenpixel.2022@gmail.com`
   - `SMTP_PASS`: `your_app_password`
   - `CONTACT_RECEIVER_EMAIL`: `codenpixel.2022@gmail.com`
   - `SMTP_FROM_NAME`: `CodeNPixels Client Portal`
   - `SMTP_SEND_AUTOREPLY`: `true`
4. Deploy the project.

### Deploying on Netlify
1. Link your GitHub repository to [Netlify](https://netlify.com).
2. Netlify will auto-detect settings from `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Functions Directory**: `netlify/functions`
3. Add your SMTP credentials under **Site configuration > Environment variables**.
4. Deploy the site.

---

## 📬 Contact & Support

- **Website**: [https://codenpixels.in](https://codenpixels.in)
- **Email**: [codenpixel.2022@gmail.com](mailto:codenpixel.2022@gmail.com)
- **Location**: Bhubaneswar, Odisha, India

---

&copy; 2026 CodeNPixels. All rights reserved.
