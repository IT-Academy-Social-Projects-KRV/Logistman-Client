import { items } from "./menuItems";
import { logoutUser } from "../../services/authentication";
import { useHistory } from "react-router-dom";

function Menu({ isOpen, name, surname }) {
    let history = useHistory();

    const logOut = () => {
        logoutUser(history);
    };

    return (
        <div className={`menu ${isOpen && "open"}`}>
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
            <div className="menu-items">
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
