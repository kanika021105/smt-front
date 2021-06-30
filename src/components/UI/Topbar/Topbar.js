import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';

import AuthContext from '../../../store/auth-context';
import './Topbar.scss';

function Topbar({ clicked }) {
    const { firstName } = useContext(AuthContext);

    return (
        <>
            <div className="top-bar">
                <FaBars onClick={clicked} className="sidebar-btn" />

                <div className="profile">
                    Hi,
                    {' '}
                    {firstName}
                </div>
            </div>
        </>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default Topbar;
