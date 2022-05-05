import userService from "../api/user";

export function getUserName() {
    return userService
        .getUser()
        .then(
            (response) => {
                console.log(response.data.name + " " + response.data.surname);
                return response.data.name + " " + response.data.surname;
            },
            (err) => {
                console.error(err);
            }
        )
        .catch((err) => {
            console.error(err);
        });
}
