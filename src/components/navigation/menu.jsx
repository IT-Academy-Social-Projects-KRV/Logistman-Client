import { items } from "./menuItems";
import { logoutUser } from "../../services/authentication";
import { useHistory } from "react-router-dom";
import user_icon from "../../assets/images/user.png";
import { Link } from "react-router-dom";

function Menu({ isOpen, name, surname }) {
    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className={`menu ${isOpen && "open"}`}>
            <Link to="/profile" className="user-profile">
                <div>
                    <img src={user_icon} alt="user-icon" id="menu-user-icon" />
                    <h2 className="user-name">
                        {name} {surname}
                    </h2>
                </div>
            </Link>
            <div className="menu-items">
                {items.map((item, index) => (
                    <Link to={item.itemLink} key={index}>
                        <img src={item.itemIcon} id="menu-icon" />{" "}
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
