import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StyleProvider } from "@ant-design/cssinjs";
import { store } from "store";
import "./i18n";
import { Suspense } from "react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StyleProvider hashPriority="high">
        <Suspense fallback="loading">
          <App />
        </Suspense>
      </StyleProvider>
    </Provider>
  </BrowserRouter>
);
