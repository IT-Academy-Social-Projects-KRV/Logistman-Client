import userService from "../api/user";

export function getUserName() {
    userService.getUser().then((res) => {
        return res.data;
    });
}

export default getUserName;
