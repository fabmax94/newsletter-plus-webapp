import React, { useReducer, useState } from 'react';
import { authReducer } from './reducers';
import axios from 'axios';


const Context = React.createContext();


const ContextProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer, { username: localStorage["user"], token: localStorage["token"] });

    const [portals, setPortals] = useState([]);


    const login = (username, token) => dispatch({ type: 'login', auth: { username, token } });

    const logout = () => dispatch({ type: 'logout' });

    const loadPortal = () => {
        axios.get("https://newsletter-plus.herokuapp.com/api/portal/", response => setPortals(response.data.map(item => item.name)));
    };

    loadPortal();

    return (
        <Context.Provider value={{ ...auth, portals, login, logout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };