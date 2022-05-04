import { createContext, useState } from "react";

export const UserContext = createContext({
    // username property
    username: "", // getter
    setUsername: () => null, // setter
    // other data ...
});

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const value = { username, setUsername };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
