import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    balance: '',
    isLoggedIn: false,
    login: () => {},
    verify: () => {},
    logout: () => {},
});

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [balance, setBalance] = useState(null);

    const userIsLoggedIn = !!token;

    // eslint-disable-next-line no-shadow
    const loginHandler = (token, email, role, firstName, lastName, balance) => {
        setToken(token);
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
    };

    // eslint-disable-next-line no-shadow
    const verifyLoginHandler = (email, role, firstName, lastName, balance) => {
        setEmail(email);
        setRole(role);
        setFirstName(firstName);
        setLastName(lastName);
        setBalance(balance);
    };

    const logoutHandler = () => {
        setEmail(null);
        setToken(null);
        setRole(null);
        setFirstName(null);
        setLastName(null);
        setBalance(null);
    };

    const contextValue = {
        token,
        email,
        role,
        firstName,
        lastName,
        balance,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        verify: verifyLoginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
