import React from "react";
import { menuUserItems, menuLogistItems } from "./menuItems";
import { logoutUser } from "../../services/authentication";
import { useHistory } from "react-router-dom";
import user_icon from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { userRoles } from '../../constants/userRoles';
import jwt from 'jwt-decode';
import tokenService from "../../services/tokens";

function Menu({ isMenuOpen, data }) {
    let history = useHistory();
    let accessToken = tokenService.getLocalAccessToken();
    let decodedAccessToken = jwt(accessToken);
    let menuItems = menuUserItems;

    switch (decodedAccessToken.role) {
        case userRoles.USER: {
            menuItems = menuUserItems;
            break;
        }
        case userRoles.LOGIST: {
            menuItems = menuLogistItems;
            break;
        }
        default:
            menuItems = menuUserItems;
            break;
    }

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
