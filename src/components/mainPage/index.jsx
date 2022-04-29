import React from "react";
import { useHistory } from "react-router-dom";
import { ExportOutlined } from '@ant-design/icons';
import { logoutUser } from "../../services/authentication";

function MainPage() {

    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className="mainPageBody">
            <header>
                <div onClick={logOut}>
                    <ExportOutlined />
                    <p>Log out</p>
                </div>
            </header>
        </div>
    );
}

export default MainPage;
