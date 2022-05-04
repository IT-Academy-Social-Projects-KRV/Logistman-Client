import { createContext, useState } from "react";

export const UserContext = createContext({
    name: "",
    setName: () => null,
    surname: "",
    setSurname: () => null,
});

export const UserProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const value = { name, setName, surname, setSurname };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
