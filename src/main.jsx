import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MainContextProvider from "./context/ContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
