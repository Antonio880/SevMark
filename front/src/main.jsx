import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/ContextUser.jsx";
import { LocalProvider } from "./Context/ContextLocation.jsx";
import Header from "./components/Header.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <LocalProvider>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </LocalProvider>
  </UserProvider>
);
