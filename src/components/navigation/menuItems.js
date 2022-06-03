import changeRoleMenuItem_icon from "../../assets/images/change.png";
import userCarsMenuItem_icon_icon from "../../assets/images/car.png";
import userOffersMenuItem_icon from "../../assets/images/location.png";
import users_icon from "../../assets/images/users_icon.png"

export const menuUserItems = [
    {
        itemIcon: changeRoleMenuItem_icon,
        itemText: "Change role",
        itemLink: "/main"
    },
    {
        itemIcon: userCarsMenuItem_icon_icon,
        itemText: "My cars",
        itemLink: "/my-cars"
    },
    {
        itemIcon: userOffersMenuItem_icon,
        itemText: "My offers",
        itemLink: "/my-offers"
    }
];

export const menuLogistItems = [
    {
        itemIcon: users_icon,
        itemText: "Manage users",
        itemLink: "/users"
    }
];
