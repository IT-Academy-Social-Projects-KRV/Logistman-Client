import React, { useEffect, useState } from "react";
import { items } from "./menuItems";
import { logoutUser } from "../services/authentication";
import { useHistory } from "react-router-dom";
import "../assets/scss/assets/components/_menu.scss";

function Menu({ isOpen, name, surname }) {
    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className={`Menu ${isOpen && "open"}`}>
            <div className="user-profile">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                    alt="user-icon"
                    id="menu-user-icon"
                />
                <h2 className="user-name">
                    {name} {surname}
                </h2>
            </div>
            <div className="Menu-items">
                {items.map((item, index) => (
                    <a href={item.itemLink} key={index}>
                        <img src={item.itemIcon} id="menu-icon" />{" "}
                        {item.itemText}
                    </a>
                ))}
            </div>
            <button className="logout" onClick={logOut}>
                Logout
            </button>
        </div>
    );
}

export default Menu;
