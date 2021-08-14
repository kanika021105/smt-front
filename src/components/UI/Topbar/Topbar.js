import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import Context from '../../../store/context';
import Theme from '../../../store/theme';
import './Topbar.scss';

function Topbar({ clicked }) {
    const Ctx = React.useContext(Context);
    const themeCtx = React.useContext(Theme);

    return (
        <>
            <div className={themeCtx.darkTheme ? 'dark top-bar' : 'top-bar'}>
                <FaBars onClick={clicked} className="sidebar-btn" />

                <input
                    onChange={() => {
                        themeCtx.toggleTheme();
                        console.log(themeCtx.darkTheme);
                    }}
                    type="checkbox"
                    checked={themeCtx.darkTheme}
                />

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
