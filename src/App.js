import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./privateRoute";
import { userRoles } from "./constants/userRoles";
import "antd/dist/antd.css";
import MainPage from './components/main/index';
import ProfilePage from './components/profile/index';
import MyCarsPage from './components/myCars/index';
import MyOffersPage from './components/myOffers/index';
import RegistrationPage from './components/authentication/registration/index';
import LoginPage from './components/authentication/login/index';
import HomePage from './components/home/index';

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
                    <ProfilePage />
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/my-cars"
                    allowedRoles={[userRoles.USER]}
                >
                    <MyCarsPage />
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/my-offers"
                    allowedRoles={[userRoles.USER]}
                >
                    <MyOffersPage />
                </PrivateRoute>

                <Route
                    exact
                    path="/registration"
                >
                    <RegistrationPage />
                </Route>

                <Route
                    exact
                    path="/login"
                >
                    <LoginPage />
                </Route>

                <Route
                    exact
                    path="/home"
                >
                    <HomePage />
                </Route>

                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}
