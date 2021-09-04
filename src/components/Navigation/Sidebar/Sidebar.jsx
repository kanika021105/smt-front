import React from 'react';
import PropTypes from 'prop-types';
import Theme from '../../../store/theme';

import './Sidebar.scss';

function Sidebar({ active: expand, children }) {
    const { darkTheme } = React.useContext(Theme);

    return (
        <>
            <div className={`sidebar ${expand && 'expand'} ${darkTheme && 'dark'}`}>
                {children}
            </div>
        </>
    );
}

Sidebar.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default Sidebar;
