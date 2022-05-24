import React, {useEffect, useState} from "react";
import Menu from "./menu";
import {getUserFullName} from "../../services/userService.js";
import ukraine_language from "../../assets/images/ukraine_language.png";
import english_language from "../../assets/images/english_language.png";
import white_theme from "../../assets/images/white_theme.png";
import dark_theme from "../../assets/images/dark_theme.png";
import burger_menu from "../../assets/images/burger_menu.png";

export default function Header() {
    const [language, setLanguage] = useState(ukraine_language);
    const [theme, setTheme] = useState(white_theme);

    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState("Null");

    const changeLanguage = () => {
        if (language === ukraine_language) setLanguage(english_language);
        else setLanguage(ukraine_language);
    };

    const changeTheme = () => {
        if (theme === white_theme) setTheme(dark_theme);
        else setTheme(white_theme);
    };

    useEffect(async () => {
        setData(await getUserFullName());
    }, []);

    return (
        <>
            <header>
                <button
                    className="material-icons menu-btn"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={burger_menu} alt="burger-menu"/>
                </button>

                <h1 id="page-wrap" onClick={() => setIsOpen(false)}>
                    Logistman Service
                </h1>

                <div className="support_block">
                    <button onClick={changeLanguage}>
                        <img src={language} alt="language-icon"/>
                    </button>

                    <button onClick={changeTheme} id="change-theme">
                        <img src={theme} alt="theme-icon"/>
                    </button>
                </div>
            </header>

            <Menu isOpen={isOpen} onChange={setIsOpen} data={data}></Menu>
        </>
    );
}
