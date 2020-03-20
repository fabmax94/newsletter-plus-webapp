import React, { useReducer, useState, useEffect } from 'react';
import { authReducer } from './reducers';
import { get } from './services';


const Context = React.createContext();


const ContextProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer, { username: localStorage["user"], token: localStorage["token"] });

    const [portals, setPortals] = useState(JSON.parse(localStorage.getItem("portals")) || []);



    const login = (username, token) => dispatch({ type: 'login', auth: { username, token } });

    const logout = () => dispatch({ type: 'logout' });

    const init = () => get("/api/portal/", response => {
        let portalsList = response.data.map(item => item.name);
        localStorage["portals"] = JSON.stringify(portalsList);
        setPortals(portalsList);
    });


    useEffect(() => {
        init();
    }, []);


    return (
        <Context.Provider value={{ ...auth, portals, login, logout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };