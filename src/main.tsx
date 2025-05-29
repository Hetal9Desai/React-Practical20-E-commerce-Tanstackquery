import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
