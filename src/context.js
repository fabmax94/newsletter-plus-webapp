import React, { useReducer, useState, useEffect } from 'react';
import { authReducer } from './reducers';
import axios from 'axios';


const Context = React.createContext();


const ContextProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer, { username: localStorage["user"], token: localStorage["token"] });

    const [portals, setPortals] = useState(JSON.parse(localStorage.getItem("portals")) || []);

    const [lastNews, setLastNews] = useState(JSON.parse(localStorage.getItem("lastNews")) || {});
    const [isLoadingLastNews, setIsLoadingLastNews] = React.useState(true);


    const login = (username, token) => dispatch({ type: 'login', auth: { username, token } });

    const logout = () => dispatch({ type: 'logout' });

    const init = () => axios.get("https://newsletter-plus.herokuapp.com/api/portal/").then(response => {
        let portalsList = response.data.map(item => item.name);
        portalsList.forEach(portal => {
            axios.get(`https://newsletter-plus.herokuapp.com/api/news/?portal=${portal}&last`).then(response => {
                let data = { ...lastNews, [portal]: response.data.news };
                localStorage["lastNews"] = JSON.stringify(data);
                setLastNews(data);
                setIsLoadingLastNews(false);
            });
        });
        localStorage["portals"] = JSON.stringify(portalsList);
        setPortals(portalsList);
    });
    

    useEffect(() => {
        init();
    }, []);


    return (
        <Context.Provider value={{ ...auth, portals, login, logout, lastNews, isLoadingLastNews }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };