import React, { useState, useEffect } from "react";
import Menu from "./menu.jsx";
import { userService } from "../api/user";

export default function Header() {
    // For languages
    var ua = "https://cdn-icons-png.flaticon.com/512/330/330540.png";
    var en = "https://cdn-icons-png.flaticon.com/512/330/330425.png";

    // For theme
    var whiteTheme = "https://cdn-icons-png.flaticon.com/512/3094/3094156.png";
    var darkTheme =
        "https://cdn-icons.flaticon.com/png/512/3258/premium/3258157.png?token=exp=1651497410~hmac=b36f81fc5652c4d107d102a31eba8ee4";

    const [language, setLanguage] = useState(ua);
    const [theme, setTheme] = useState(whiteTheme);

    const changeLanguage = () => {
        if (language === ua) setLanguage(en);
        else setLanguage(ua);
    };

    const changeTheme = () => {
        if (theme === whiteTheme) setTheme(darkTheme);
        else setTheme(whiteTheme);
    };

    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState("Null");

    useEffect(() => {
        userService.getUser().then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <>
            <header>
                <button
                    className="material-icons menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828664.png"
                        alt="burger-menu"
                    />
                </button>

                <h1 id="page-wrap" onClick={() => setIsOpen(false)}>
                    Logistman Service
                </h1>
                <div className="support_block">
                    <button onClick={changeLanguage}>
                        <img src={language} alt="language-icon" />
                    </button>
                    <button onClick={changeTheme} id="change-theme">
                        <img src={theme} alt="theme-icon" />
                    </button>
                </div>
            </header>
            <Menu
                isOpen={isOpen}
                onChange={setIsOpen}
                name={data.name}
                surname={data.surname}
            ></Menu>
        </>
    );
}
