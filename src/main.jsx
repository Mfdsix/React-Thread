import React from "react";
import { createRoot } from "react-dom/client";

import "./styles";

// pages
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
