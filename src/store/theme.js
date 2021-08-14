import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Theme = React.createContext({
    darkTheme: false,
    toggleTheme: () => {},
});

export const ContextProvider = ({ children }) => {
    const initialTheme = localStorage.getItem('darkTheme');
    const [darkTheme, setDarkTheme] = useState(
        initialTheme === 'true' ? true : false || false,
    );

    function themeToggler() {
        setDarkTheme((preState) => !preState);
        localStorage.setItem('darkTheme', !darkTheme);
    }

    const contextValue = {
        darkTheme,
        toggleTheme: themeToggler,
    };

    return (
        <Theme.Provider value={contextValue}>
            {children}
        </Theme.Provider>
    );
};

ContextProvider.propTypes = { children: PropTypes.node.isRequired };

export default Theme;
