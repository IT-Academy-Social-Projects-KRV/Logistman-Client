import {items} from "./menuItems";
import {logoutUser} from "../../services/authentication";
import {useHistory} from "react-router-dom";
import user_icon from "../../assets/images/user.png";
import {Link} from "react-router-dom";
import React from "react";

function Menu({isOpen, data}) {
    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };
    if (!data) {
        return <div>Loading</div>
    }
    return (
        <div className={`menu ${isOpen && "open"}`}>
            <Link to="/profile" className="user-profile">
                <div className={"fullName"}>
                    <div className={"imgIcon"}>
                        <img src={user_icon} alt="user-icon" id="menu-user-icon"/>
                    </div>
                    <h2 className="user-name">
                        {data.name} {data.surname}
                    </h2>
                </div>
            </Link>
            <div className="menu-items">
                {items.map((item, index) => (
                    <Link to={item.itemLink} key={index}>
                        <img src={item.itemIcon} id="menu-icon"/>{" "}
                        {item.itemText}
                    </Link>
                ))}
            </div>
            <button className="logout" onClick={logOut}>
                Logout
            </button>
        </div>
    );
}

export default Menu;
