import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

// Creating context
const AuthContext = React.createContext({
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

// Defining reducer function for useReducer hook
function reducer(state, action) {
    // Evaluates action.type value from dispatched state update and updating state accordingly
    switch (action.type) {
        case 'login':
            return { ...state, ...action.payload };

        case 'verifyLogin':
            return { ...state, ...action.payload };

        case 'updateBalance':
            return { ...state, ...action.payload };

        case 'updateWebsiteName':
            return { ...state, ...action.payload };

        case 'logout':
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                clientId: '',
                email: '',
                role: '',
                firstName: '',
                lastName: '',
                balance: '',
                websiteName: '',
            };

        default:
            return {
                ...state,
                ...action.payload,
            };
    }
}

export function AuthContextProvider({ children }) {
    // Getting token from local storage
    const initialToken = localStorage.getItem('token');

    // setting useReducer hook
    const [state, dispatch] = useReducer(reducer, {
        token: initialToken,
        clientId: '',
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        balance: '',
        websiteName: '',
    });

    // Updating login state depending on token availability in local storage
    const userIsLoggedIn = !!state.token;

    // Dispatching state update request for login
    function login(token, clientId, email, role, firstName, lastName, balance) {
        dispatch({
            type: 'login',
            payload: {
                token, clientId, email, role, firstName, lastName, balance,
            },
        });
    }

    // Dispatching state update after login verification
    function verifyLogin(clientId, email, role, firstName, lastName, balance, websiteName) {
        dispatch({
            type: 'verifyLogin',
            payload: {
                clientId,
                email,
                role,
                firstName,
                lastName,
                balance,
                websiteName,
            },
        });
    }

    // Dispatching state update to update user Balance
    function updateBalance(balance) {
        dispatch({ type: 'updateBalance', payload: { balance } });
    }

    // Dispatching state update to update Website Name
    function updateWebsiteName(websiteName) {
        dispatch({ type: 'updateWebsiteName', payload: { websiteName } });
    }

    // Dispatching state update for logout
    function logout() {
        dispatch({ type: 'logout' });
    }

    // Setting context value
    const contextValue = {
        token: state.token,
        clientId: state.clientId,
        email: state.email,
        role: state.role,
        firstName: state.firstName,
        lastName: state.lastName,
        balance: state.balance,
        websiteName: state.websiteName,
        isLoggedIn: userIsLoggedIn,
        login,
        verify: verifyLogin,
        logout,
        updateBalance,
        updateWebsiteName,
    };

    // Jsx in below lines
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// PropTypes validation
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
