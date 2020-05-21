import React, { lazy, Suspense } from "react";
import "./App.less";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "./components/loader/pageLoader";
import MenuSider from "./components/layout/sider";
import MenuHeader from "./components/layout/header";
import MenuContent from "./components/layout/content";
import Page404 from "./components/errorPage/result";
import { useSelector } from "react-redux";
import { I18nProvider } from "./asset/i18n";
const Login = lazy(() => import("./components/login"));

function App() {
  const isThemeLight = useSelector((state) => state.setting.isThemeLight);
  const language = useSelector((state) => state.setting.language);
  return (
    <I18nProvider locale={language}>
      <Suspense fallback={<Loader />}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/login" component={Login} />
              <Route>
                <MenuSider />
                <Layout className={isThemeLight ? "bg-gray" : "bg-black"}>
                  <MenuHeader />
                  <MenuContent />
                  <Layout.Footer style={{ textAlign: "center" }}>
                    Ant Design Created by PHVT
                  </Layout.Footer>
                </Layout>
              </Route>
              <Route component={Page404} />
            </Switch>
          </Layout>
        </Router>
      </Suspense>
    </I18nProvider>
  );
}

export default App;
