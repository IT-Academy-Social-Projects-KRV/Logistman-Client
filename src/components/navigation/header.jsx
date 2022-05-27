import React, { useEffect, useState } from "react";
import Menu from "./menu";
import { getFullUserName } from "../../services/users.js";
import burger_menu from "../../assets/images/burger_menu.png";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(async () => {
        setData(await getFullUserName());
    }, []);

    return (
        <>
            <header>
                <button
                    className="material-icons menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <img src={burger_menu} alt="burger-menu" />
                </button>

                <h1 onClick={() => setIsMenuOpen(false)}>
                    Logistman Service
                </h1>

                <div className="support_block"></div>
            </header>

            <Menu isMenuOpen={isMenuOpen} onChange={setIsMenuOpen} data={data}></Menu>
        </>
    );
}

export default Header;
