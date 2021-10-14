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

let logoutTimer;

// Calculating token expiry time
function calculateRemainingTime() {
    const remainingMilliseconds = 24 * 60 * 60 * 1000;
    const expiryDate = (Date.now() + remainingMilliseconds);

    return expiryDate;
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

    // Dispatching state update for logout
    function logout() {
        const keyToRemove = ['token', 'expiryDate'];
        keyToRemove.forEach((key) => localStorage.removeItem(key));
        dispatch({ type: 'logout' });
        window.location = '/login';

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    // Dispatching state update request for login
    function login(token, clientId, email, role, firstName, lastName, balance) {
        const expiryTime = calculateRemainingTime();
        console.log(expiryTime);
        // Setting token and expiry time
        localStorage.setItem('expiryDate', expiryTime);
        localStorage.setItem('token', token);
        // logoutTimer = setTimeout(logout, expiryTime);

        return dispatch({
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

        // logoutTimer = setTimeout(logout, localStorage.getItem('expiryDate'));
    }

    // Dispatching state update to update user Balance
    function updateBalance(balance) {
        dispatch({ type: 'updateBalance', payload: { balance } });
    }

    // Dispatching state update to update Website Name
    function updateWebsiteName(websiteName) {
        dispatch({ type: 'updateWebsiteName', payload: { websiteName } });
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
