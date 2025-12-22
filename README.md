# IMG'folio — Cinematic Portfolio Concept

![Banner](file:///f:/AI Projects/Project A/public/og-image.png)

A high-end, editorial-style portfolio concept built with **Next.js 16**, **Framer Motion**, and **Sanity CMS**. This project focuses on "Luxury UI" through cinematic transitions, subtle micro-interactions, and a sophisticated white-card-over-black-footer layout.

## ✨ Core Features

### 🎬 Cinematic UI/UX
- **Proprietary Cover Strategy**: Seamless transitions from large hero titles to sticky headers.
- **Film Grain Overlay**: Subtle SVG noise texture for an analog, cinematic feel.
- **Lens Focus Transitions**: Rack-focus style route changes using CSS blur filters.
- **Smooth Scrolling**: Integrated with `Lenis` for high-fidelity interactive performance.

### 🍱 Grid & Layout
- **Dynamic Focus Grid**: Masonry layouts that highlight the active project while dimming surroundings.
- **The "White Card" Approach**: A clean, elevated editorial layer scrolling over a fixed back-end footer.
- **Velocity Scroll Index**: Physically interactive gallery strips that accelerate based on scroll speed.

### 🖱️ Micro-Interactions
- **Magnetic Navigation**: Navigation links that physically attract the cursor.
- **Floating Image Previews**: Interactive hover reveals for deep archive browsing.
- **Draggable Physics**: Playful UI elements (stickers/badges) with velocity-based dragging.
- **Adaptive Cursor**: A custom `mix-blend-difference` cursor that scales and inverts colors dynamically.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Smooth Scroll**: [@studio-freight/react-lenis](https://github.com/studio-freight/lenis)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- A Sanity project ID (find this in your Sanity dashboard)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Me-Kalyan/IMG-folio.git
   cd IMG-folio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Cinematic features, Layout, etc.).
- `/lib`: Configuration for Sanity client and other utilities.
- `/public`: Static assets (SVG textures, logos, etc.).

## 📝 License

This project is licensed under the MIT License.

---
Created by [Kalyan](https://github.com/Me-Kalyan)
