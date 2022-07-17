import changeRoleMenuItem_icon from "../../assets/images/change.png";
import userCarsMenuItem_icon_icon from "../../assets/images/car.png";
import userOffersMenuItem_icon from "../../assets/images/location.png";
import users_icon from "../../assets/images/users_icon.svg";
import route_icon from "../../assets/images/route_icon.svg";
import invites_icon from "../../assets/images/invites-envelope-icon.svg";

export const menuItems = {
    User: [
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
        },
        {
            itemIcon: invites_icon,
            itemText: "Confirm goods delivery",
            itemLink: "/confirm-goods-delivery"
        },
        {
            itemIcon: invites_icon,
            itemText: "My offers' invites",
            itemLink: "/offers-invites"
        },
        {
            itemIcon: invites_icon,
            itemText: "My drivers' invites",
            itemLink: "/drivers-invites"
        },
        {
            itemIcon: route_icon,
            itemText: "My Routes",
            itemLink: "/my-routes"
        }
    ],
    Logist: [
        {
            itemIcon: users_icon,
            itemText: "Manage users",
            itemLink: "/users"
        },
        {
            itemIcon: route_icon,
            itemText: "Available routes",
            itemLink: "/routes"
        }
    ]
};
