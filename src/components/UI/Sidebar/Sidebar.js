/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';

import Theme from '../../../store/theme';
import AuthContext from '../../../store/AuthContext';

import './Sidebar.scss';

function Sidebar({ active: expand, links }) {
    const { darkTheme } = useContext(Theme);
    const { logout } = useContext(AuthContext);

    function logoutHandler() {
        logout();
        window.location = '/login';
    }

    return (
        <div className={`sidebar ${expand && 'expand'} ${darkTheme && 'dark'}`}>
            <ul>
                {links.map((item) => (
                    <li>
                        <NavLink to={item.link} className="sidebar_link">
                            <div className="link_icon">
                                {item.icon}
                            </div>
                            <div className="link_title">
                                {item.title}
                            </div>
                        </NavLink>
                    </li>
                ))}

                <li>
                    <NavLink to="/login" className="sidebar_link" onClick={logoutHandler}>
                        <div className="link_icon">
                            <FiLogOut />
                        </div>
                        <div className="link_title">
                            Logout
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

Sidebar.propTypes = {
    active: PropTypes.bool.isRequired,
};

export default Sidebar;
