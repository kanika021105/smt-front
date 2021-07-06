/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext({
    token: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    balance: '',
    websiteName: '',
    isLoggedIn: false,
    login: () => {},
    verify: () => {},
    logout: () => {},
    updateBalance: () => {},
    updateWebsiteName: () => {},
});

export const ContextProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [websiteName, setWebsiteName] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, email, role, firstName, lastName, balance) => {
        setToken(token);
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
    };

    const verifyLoginHandler = (email, role, firstName, lastName, balance, websiteName) => {
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
        setWebsiteName(websiteName);
    };

    const updateBalanceHandler = (balance) => {
        setBalance(balance);
    };

    const updateWebsiteNameHandler = (name) => {
        setWebsiteName(name);
    };

    const logoutHandler = () => {
        setEmail(null);
        setToken(null);
        setRole(null);
        setFirstName(null);
        setLastName(null);
        setBalance(null);
        localStorage.clear();
    };

    const contextValue = {
        token,
        email,
        role,
        firstName,
        lastName,
        balance,
        websiteName,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        verify: verifyLoginHandler,
        logout: logoutHandler,
        updateBalance: updateBalanceHandler,
        updateWebsiteName: updateWebsiteNameHandler,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Context;
