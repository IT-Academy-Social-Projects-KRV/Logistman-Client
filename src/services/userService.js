import { useContext } from "react";
import userService from "../api/user";
import { UserContext } from "../components/context/user.context";

export function GetUserName() {
    const { setUsername } = useContext(UserContext);

    userService.getUser().then((res) => {
        console.log(res.data.name);
        setUsername(res.data.name);
    });
}

export default GetUserName;
