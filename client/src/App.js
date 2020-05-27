import React, { lazy, Suspense } from "react";
import "./styles/index.less";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "./components/loader/pageLoader";
import MenuSider from "./components/layout/sider";
import MenuHeader from "./components/layout/header";
import MenuContent from "./components/layout/content";
import { useSelector } from "react-redux";
import { I18nProvider } from "./asset/i18n";
const Login = lazy(() => import("./components/login"));

function App() {
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
                <Layout className="bg-gray">
                  <MenuHeader />
                  <MenuContent />
                  <Layout.Footer style={{ textAlign: "center" }}>
                    Ant Design Created by PHVT
                  </Layout.Footer>
                </Layout>
              </Route>
            </Switch>
          </Layout>
        </Router>
      </Suspense>
    </I18nProvider>
  );
}

export default App;
