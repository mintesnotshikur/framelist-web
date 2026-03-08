import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { WatchlistProvider } from "./context/WatchlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WatchlistProvider>
  </React.StrictMode>,
);
