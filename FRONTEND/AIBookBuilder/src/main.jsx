import React from "react";
import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
// import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      
        <App />
        <Toaster position="top-right" />

    </StrictMode>
  </AuthProvider>,
);
