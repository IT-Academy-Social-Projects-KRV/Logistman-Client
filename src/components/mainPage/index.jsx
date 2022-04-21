import React from "react";
import { useHistory } from "react-router-dom";
import { ExportOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { logoutUser } from "../../services/authentication";

function MainPage() {

    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className={styles.body}>
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
