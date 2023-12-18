import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/ContextUser.jsx";
import Header from "./components/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
  </UserProvider>
);
