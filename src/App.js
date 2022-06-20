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
import ConfirmEmailPage from "./components/emailConfirmation";
import ManageUsersPage from './components/users/index';
import UserCarsPage from "./components/userCars";
import CreateOfferPage from "./components/offerPage";
import RoutesPage from "./components/routes";
import {offerRoles} from "./constants/offerRoles";

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
                    allowedRoles={[userRoles.USER, userRoles.LOGIST]}
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
                    path="/user-cars"
                    allowedRoles={[userRoles.LOGIST]}
                >
                    <UserCarsPage />
                </PrivateRoute>

                <PrivateRoute
                    path="/create-sender-offer"
                    allowedRoles={[userRoles.USER]}
                >
                    <CreateOfferPage offerRole={offerRoles.SENDER}/>
                </PrivateRoute>

                <PrivateRoute
                    path="/create-recipient-offer"
                    allowedRoles={[userRoles.USER]}
                >
                    <CreateOfferPage offerRole={offerRoles.RECIPIENT}/>
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/my-offers"
                    allowedRoles={[userRoles.USER]}
                >
                    <MyOffersPage />
                </PrivateRoute>

                <PrivateRoute
                    exact
                    path="/users"
                    allowedRoles={[userRoles.LOGIST]}
                >
                    <ManageUsersPage />
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

                <Route
                    path="/confirm-email"
                >
                    <ConfirmEmailPage/>
                </Route>

                <PrivateRoute
                    exact
                    path="/routes"
                    allowedRoles={[userRoles.LOGIST]}
                >
                    <RoutesPage />
                </PrivateRoute>

                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}
