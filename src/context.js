import React, { useState } from 'react';
const Context = React.createContext();


const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({ username: localStorage["user"], token: localStorage["token"] });

    const login = (username, token) => {
        localStorage["token"] = response.data.token;
        localStorage["user"] = response.data.user.username;
        setAuth({
            username: username,
            token: token
        })
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({
            username: null,
            token: null
        });
    };

    return (
        <Context.Provider value={{ ...auth, login, logout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };