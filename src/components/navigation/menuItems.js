import change_icon from "../../assets/images/change.png";
import car_icon from "../../assets/images/car.png";
import invite_icon from "../../assets/images/invite.png";
import history_icon from "../../assets/images/history.png";
import location_icon from "../../assets/images/location.png";
import settings_icon from "../../assets/images/settings.png";

export const items = [
    {
        itemIcon: change_icon,
        itemText: "Change role",
        itemLink: "/main",
    },
    {
        itemIcon: car_icon,
        itemText: "My cars",
        itemLink: "/my-cars",
    },
    {
        itemIcon: invite_icon,
        itemText: "My invites",
        itemLink: "/my-invites",
    },
    {
        itemIcon: history_icon,
        itemText: "Trip history",
        itemLink: "/trip-history",
    },
    {
        itemIcon: location_icon,
        itemText: "My offers",
        itemLink: "/my-offers",
    },
    {
        itemIcon: settings_icon,
        itemText: "Settings",
        itemLink: "/settings",
    },
];
