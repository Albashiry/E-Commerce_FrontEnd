import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import MenuContext from "./constants/MenuContext";
import WindowContext from "./constants/WindowContext";
import "./index.css";
import "./custom.css";
import "./assets/styles/dashboard/button.css";
import "./assets/styles/dashboard/loading.css";
import "./assets/styles/dashboard/alerts.css";
import "./assets/styles/dashboard/google.css";
import "./assets/styles/dashboard/auth.css";
import "./assets/fontawesome/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
