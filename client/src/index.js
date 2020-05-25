import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ConfigProvider } from "antd";
import Vietnamese from "antd/es/locale/vi_VN";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <ConfigProvider locale={Vietnamese}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();