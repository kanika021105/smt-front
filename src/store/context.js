/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext({
    clientId: '',
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
    const [clientId, SetClientId] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [websiteName, setWebsiteName] = useState(null);

    const userIsLoggedIn = !!token;

    function loginHandler(
        token, clientId, email, role, firstName, lastName, balance,
    ) {
        setToken(token);
        SetClientId(clientId);
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
    }

    function verifyLoginHandler(
        clientId, email, role, firstName, lastName, balance, websiteName,
    ) {
        SetClientId(clientId);
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
        setWebsiteName(websiteName);
    }

    function updateBalanceHandler(balance) {
        setBalance(balance);
    }

    function updateWebsiteNameHandler(name) {
        setWebsiteName(name);
    }

    function logoutHandler() {
        SetClientId(null);
        setEmail(null);
        setToken(null);
        setRole(null);
        setFirstName(null);
        setLastName(null);
        setBalance(null);
        localStorage.clear();
    }

    const contextValue = {
        token,
        clientId,
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
