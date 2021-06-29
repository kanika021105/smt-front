import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';

import { AuthContext } from '../../../containers/Context/AuthContext';
import './Topbar.scss';

function Topbar({ clicked }) {
    const { fName } = useContext(AuthContext);

    return (
        <>
            <div className="top-bar">
                <FaBars onClick={clicked} className="sidebar-btn" />

                <div className="profile">
                    Hi,
                    {' '}
                    {fName}
                </div>
            </div>
        </>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.node,
};

export default Topbar;
