import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/assets/styles/normalize.less";
import "@/assets/styles/base.less";
import "@/assets/fonts/SourceHanSansCNMedium.ttf";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>
);
