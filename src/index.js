import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./assets/styles/button.css";
import "./assets/styles/loading.css";
import "./assets/styles/alerts.css";
import "./assets/styles/google.css";
import "./assets/styles/auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontawesome/all.min.css";
import MenuContext from "./constants/MenuContext";
import WindowContext from "./constants/WindowContext";

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
