import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import RegistrationPage from "./components/authentication/registration";
import LoginPage from "./components/authentication/login";
import MainPage from "./components/mainPage";
import PrivateRoute from "./privateRoute";
import { userRoles } from "./constants/userRoles";
import "antd/dist/antd.css";
import UserCarsPage from './components/userCars/userCars';
import UserOffersPage from "./components/userOffers/userOffers";
import HomePage from './components/home/home';
import UserProfilePage from './components/userProfile/userProfile';

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

                <PrivateRoute
                    exact
                    path="/my-cars"
                    allowedRoles={[userRoles.USER]}
                >
                    <UserCarsPage />
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/my-offers"
                    allowedRoles={[userRoles.USER]}
                >
                    <UserOffersPage />
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

                <Redirect to="/home" />
            </Switch>
        </Router>
    );
}
