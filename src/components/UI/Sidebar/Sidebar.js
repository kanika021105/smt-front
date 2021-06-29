import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.scss';

function Sidebar({ active, children }) {
    return (
        <>
            <div className={`sidebar ${active && 'active'}`}>
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
