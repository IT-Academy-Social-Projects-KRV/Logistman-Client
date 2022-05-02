import React from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../services/authentication";
import Header from "../header";

function MainPage() {
    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className="mainPageBody">
            <Header />
        </div>
    );
}

export default MainPage;
