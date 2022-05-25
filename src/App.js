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
import UserProfilePage from "./components/userProfile/index.js";
import "antd/dist/antd.css";
import OfferCreateOfferPage from "./components/offerPage";
import UserCarsPage from "./components/userCars/userCars";
import UserCarsPage from './components/userCars/userCars';
import UserOffersPage from "./components/userOffers/userOffers";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/main" allowedRoles={[userRoles.USER]}>
          <MainPage />
        </PrivateRoute>

        <PrivateRoute exact path="/profile" allowedRoles={[userRoles.USER]}>
          <UserProfilePage />
        </PrivateRoute>

        <PrivateRoute exact path="/offer" allowedRoles={[userRoles.USER]}>
          <OfferCreateOfferPage />
        </PrivateRoute>
        <PrivateRoute exact path="/my-cars" allowedRoles={[userRoles.USER]}>
          <UserCarsPage />
        </PrivateRoute>

        <PrivateRoute
            exact
            path="/my-offers"
            allowedRoles={[userRoles.USER]}
        >
            <UserOffersPage />
        </PrivateRoute>

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
