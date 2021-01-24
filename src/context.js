import React, {useReducer} from 'react';
import {authReducer} from './reducers';

const Context = React.createContext();

const ContextProvider = ({children}) => {
  const [auth, dispatch] = useReducer(authReducer,
      {username: localStorage['user'], token: localStorage['token']});

  const login = (username, token) => dispatch(
      {type: 'login', auth: {username, token}});

  const logout = () => dispatch({type: 'logout'});

  return (
      <Context.Provider value={{...auth, login, logout}}>
        {children}
      </Context.Provider>
  );
};

export {Context, ContextProvider};