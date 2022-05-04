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
import "antd/dist/antd.css";
import { UserProvider } from "./components/context/user.context";

const history = createBrowserHistory();

export default function App() {
    return (
        <UserProvider>
            <Router history={history}>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/main"
                        allowedRoles={[userRoles.USER]}
                    >
                        <MainPage />
                    </PrivateRoute>

                    <Route
                        exact
                        path="/registration"
                        component={Registration}
                    />
                    <Route path="/login" component={Login} />

                    <Route exact path="/home">
                        <>Home page</>
                    </Route>

                    <Route path="/">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    );
}
