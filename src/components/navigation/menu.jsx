import React from "react";
import { menuItems } from "./menuItems";
import { logoutUser } from "../../services/authentication";
import { useHistory } from "react-router-dom";
import user_icon from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { store } from "../../store";

function Menu({ isMenuOpen, data }) {
    let history = useHistory();
    let role = store.getState().authReducer.role;

    const logOut = () => {
        logoutUser(history);
    };

    if (!data) {
        return <div>Loading</div>
    }
    return (
        <div className={`menu ${isMenuOpen && "open"}`}>
            <Link to="/profile" className="user-profile">
                <div className="fullName">
                    <img src={user_icon} alt="user-icon" />
                    <h2 className="user-name">
                        {data.name} {data.surname}
                    </h2>
                </div>
            </Link>

            <div className="menu-items">
                {menuItems[role].map((item, index) => (
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
