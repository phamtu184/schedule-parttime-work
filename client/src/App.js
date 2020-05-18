import React, { lazy, Suspense } from "react";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loader from "./components/loader/pageLoader";
const Login = lazy(() => import("./components/login"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
