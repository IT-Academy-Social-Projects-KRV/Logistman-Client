import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from './components/authentication/registration';
import 'antd/dist/antd.css';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>

        <Route exact path="/registration" component={Registration} />

        <Route path="/" >
          <>Home</>
        </Route>

      </Switch>
    </Router>
  );
}
