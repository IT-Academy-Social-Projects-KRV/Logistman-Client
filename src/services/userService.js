import { useContext } from "react";
import userService from "../api/user";
import { UserContext } from "../components/context/user.context";

export function GetUserName() {
    const { setName } = useContext(UserContext);
    const { setSurname } = useContext(UserContext);

    userService.getUser().then((res) => {
        setName(res.data.name);
        setSurname(res.data.surname);
    });
}

export default GetUserName;
