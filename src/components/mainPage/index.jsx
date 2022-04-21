import React from "react";
import { useDispatch } from "react-redux";
import { ExportOutlined } from '@ant-design/icons';
import { logout } from "../../reduxActions/auth";
import styles from './styles.module.css';

function MainPage() {

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
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
