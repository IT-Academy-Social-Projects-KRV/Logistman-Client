import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Registration from "./components/authentication/registration";
import Login from "./components/authentication/login";
import MainPage from "./components/mainPage";
import PrivateRoute from "./privateRoute";
import { userRoles } from "./constants/userRoles";
import UserProfilePage from "./components/userProfile";
import "antd/dist/antd.css";
import Offer from "./components/offerPage";

const history = createBrowserHistory();

export default function App() {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute
                    exact
                    path="/main"
                    allowedRoles={[userRoles.USER]}
                >
                    <MainPage />
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/profile"
                    allowedRoles={[userRoles.USER]}
                >
                    <UserProfilePage />
                </PrivateRoute>

                <Route path="/offer" component={Offer} />

                <Route exact path="/registration" component={Registration} />
                <Route path="/login" component={Login} />

                <Route exact path="/home">
                    <>Home page</>
                </Route>

                <Route path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
}
