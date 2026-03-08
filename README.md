# **FrameList Web – Movie Watchlist & Discovery App**

![FrameList Banner](/static/banner.png)

**FrameList Web** is a modern, responsive React app for discovering movies, creating a personalized watchlist, and watching trailers. Built with **React**, **Vite**, and **Tailwind CSS**, it showcases a sleek **neomorphic design** with features inspired by streaming platforms like Netflix.

---

## **Live Demo**

[View it on Vercel](https://framelist-web.vercel.app)

---

## **Features**

- **Top 10 Trending Movies** – A horizontal scroll carousel highlighting trending films.
- **Movie Search** – Search movies instantly with keyboard navigation.
- **Movie Details** – Full details including poster, genres, release date, rating, and overview.
- **Watchlist** – Add/remove movies to a persistent watchlist stored in `localStorage`.
- **Trailer Modal** – Watch movie trailers in a sleek popup directly on the details page.
- **Infinite Scroll / Discover Movies** – Browse a growing list of popular movies.
- **Responsive Design** – Looks great on mobile, tablet, and desktop.
- **Neomorphic UI** – Modern soft UI style for a professional, clean look.

---

## **Screenshots**

| Home Page                   | Movie Details                        | Watchlist                           |
| --------------------------- | ------------------------------------ | ----------------------------------- |
| ![Home](/static/banner.png) | ![Details](/static/movieDetails.png) | ![Watchlist](/static/watchList.png) |

---

## **Tech Stack**

- **Frontend:** React, Vite, Tailwind CSS
- **State Management:** React Context API
- **API:** [TMDB API](https://www.themoviedb.org/)
- **Deployment:** Vercel

---

## **Getting Started**

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/framelist-web.git
cd framelist-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## **Folder Structure**

```
framelist-web/
├─ src/
│  ├─ components/      # Reusable UI components
│  ├─ context/         # Watchlist context
│  ├─ pages/           # Home, MovieDetails, Watchlist pages
│  ├─ services/        # TMDB API service
│  ├─ assets/          # Images, icons
│  └─ App.jsx          # Main app entry
└─ package.json
```

---

## **Future Improvements**

- Preview trailers directly on movie cards on hover
- Add filtering by genres
- Dark mode toggle
- User authentication for saving watchlists across devices

---

## **Author**

**Mintesnot Shikur** – React developer | Portfolio projects

[GitHub](https://github.com/mintesnotshikur) | [LinkedIn](https://linkedin.com/in/mintesnot-shikur-a599a6357)

---

## **License**

This project is **open source** and free to use.
