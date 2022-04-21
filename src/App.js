import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./components/authentication/registration";
import Login from "./components/authentication/login";
import { createBrowserHistory } from "history";
import "antd/dist/antd.css";

const history = createBrowserHistory();

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/registration" component={Registration} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/main">
                    Main
                </Route>

                <Route path="/">
                    <>Home</>
                </Route>
            </Switch>
        </Router>
    );
}
