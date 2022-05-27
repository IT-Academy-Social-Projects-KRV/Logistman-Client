import React from "react";
import { menuItems } from "./menuItems";
import { logoutUser } from "../../services/authentication";
import { useHistory } from "react-router-dom";
import user_icon from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { Button } from 'antd';

function Menu({ isMenuOpen, data }) {
    var history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    if (!data) {
        return <div>Loading</div>
    }
    return (
        <div className={`menu ${isMenuOpen && "open"}`}> {/* ??? */}
            <Link to="/profile" className="user-profile">
                <div className="fullName">
                    <div className="imgIcon">
                        <img src={user_icon} alt="user-icon" id="menu-user-icon" />
                    </div>
                    <h2 className="user-name">
                        <p>{data.name} {data.surname}</p>
                    </h2>
                </div>
            </Link>
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <Link to={item.itemLink} key={index}>
                        <img src={item.itemIcon} id="menu-icon" />
                        <p>{item.itemText}</p>
                    </Link>
                ))}
            </div>
            <Button className="logout" onClick={logOut}>
                Logout
            </Button>
        </div>
    );
}

export default Menu;
