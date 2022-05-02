import React from "react";

import { items } from "./menuItems";
import "./menu.css";

function Menu({ isOpen, onChange }) {
    return (
        <div className={`Menu ${isOpen && "open"}`}>
            <span className="btn-close" onClick={() => onChange(false)}>
                close
            </span>
            <div className="Menu-items">
                <div className="user-profile"></div>
                {items.map((item, index) => (
                    <a href={item.itemLink} key={index}>
                        {item.itemText}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Menu;
