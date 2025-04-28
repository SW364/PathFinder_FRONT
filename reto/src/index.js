import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* Mostramos el componente principal con Sidebar */}
    {/* <LoginPage /> */} {/* Ocultamos temporalmente el Login */}
  </React.StrictMode>
);

reportWebVitals();
