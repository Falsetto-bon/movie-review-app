```markdown
# 🎬 MR App (Movie & TV Show Hub)

A sleek, modern media tracking web application built with **React**, **Vite**, and **Tailwind CSS**. This application communicates directly with **The Movie Database (TMDB) API** to fetch live cinema and television data, offering an immersive browsing experience.

---

## 🚀 Key Features

- **Live TMDB Integration:** Fetches real-time, concurrent data for trending, popular, and top-rated content using optimized `Promise.all` requests.
- **Global Search Navigation:** Moved the search bar globally into the `Navbar` to allow instant content exploration from any route.
- **Polymorphic Architecture:** Upgraded `MediaCard` and `MediaDetails` components to dynamically share logic and layout between both **Movies** and **TV Series** seamlessly.
- **Netflix-Style Rows:** Replaced blocky grids with independent, smooth horizontal scrolling tracks (`overflow-x-auto`) for category browsing.
- **Global Favorites Context:** Persistent local storage context allows users to save both movies and TV shows without duplicates or race conditions.

---

## 🛠️ Tech Stack & Architecture

### Frontend Stack

- **Framework:** React 18+ (Functional components with custom hooks)
- **Build Tool:** Vite (Optimized for blazing-fast Hot Module Replacement)
- **Routing:** React Router DOM V6 (Declarative dynamic routes)
- **Styling:** Tailwind CSS V4 (Utility-first, responsive layouts)

### State Architecture

The application minimizes heavy state management libraries by leveraging native React patterns:

- **Polymorphic Routing Pattern:** Uses dynamic parameters (`/:type/:id`) to map URL context directly to API operations, serving two data schemas from a single view.
- **Lazy Initialization State:** Prevents initialization flash or localStorage race-conditions by parsing client-side memory storage inside the hook initializer stage.

---

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You will also need a free API token from [The Movie Database (TMDB)](https://www.themoviedb.org/).

### Installation & Local Setup

1. **Clone the repository:**
```bash
   git clone [https://github.com/Falsetto-bon/movie-review-app.git](https://github.com/Falsetto-bon/movie-review-app.git)
   cd mr-app

```

2. **Install dependencies:**

```bash
   npm install

```

3. **Set up environment variables:**
Create a `.env` file in the root directory and add your TMDB API Key:

```env
   VITE_TMDB_API_KEY=your_api_key_here

```

4. **Run the local development server:**

```bash
   npm run dev

```

5. **Build for production:**

```bash
   npm run build

```

---

## 💬 Suggestions & Feedback

This project is a work in progress, and I am always looking to learn and improve my coding skills! If you have any suggestions, critiques, or advice on how I can optimize the code:

* Please feel free to open an **Issue** or submit a **Pull Request**.
* All I ask is that you share your thoughts in a **polite, constructive, and simple way** so I can easily understand and apply the feedback.

Thank you for checking out my Movie & TV Show Hub App! 🎬

```

```