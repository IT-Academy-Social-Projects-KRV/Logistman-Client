import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from './components/authentication/registration';
import './styles.css';

export default function App() {
  return (
    <Router>
      <Switch>

        <Route path="/registration" >
          <Registration />
        </Route>

        <Route path="/" >
          <>Home</>
        </Route>

      </Switch>
    </Router>
  );
}
