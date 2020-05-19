import React, { lazy, Suspense } from "react";
import "./App.less";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "./components/loader/pageLoader";
import MenuSider from "./components/layout/sider";
import MenuHeader from "./components/layout/header";
import MenuContent from "./components/layout/content";
import Page404 from "./components/errorPage/result";
const Login = lazy(() => import("./components/login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route>
              <MenuSider />
              <Layout>
                <MenuHeader />
                <MenuContent />
                <Layout.Footer style={{ textAlign: "center" }}>
                  Ant Design ©2016 Created by Ant UED
                </Layout.Footer>
              </Layout>
            </Route>
            <Route component={Page404} />
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;
