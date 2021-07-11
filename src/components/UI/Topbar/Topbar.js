import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import Context from '../../../store/context';
import './Topbar.scss';

function Topbar({ clicked }) {
    const Ctx = React.useContext(Context);

    return (
        <>
            <div className="top-bar">
                <FaBars onClick={clicked} className="sidebar-btn" />

                <div className="profile">
                    Hi,
                    {' '}
                    {Ctx.firstName}
                    {' '}
                    <Link to={`/profile/${Ctx.clientId}`}>
                        <CgProfile />
                    </Link>
                </div>
            </div>
        </>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default Topbar;
