/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import Theme from '../../../store/theme';
import AuthContext from '../../../store/AuthContext';

import './Sidebar.scss';

function Sidebar({ active: expand, links }) {
    const { darkTheme } = useContext(Theme);
    const { logout } = useContext(AuthContext);

    function logoutHandler() {
        logout();
    }

    return (
        <div className={`sidebar ${expand ? 'expand' : ''} ${darkTheme ? 'dark' : ''}`}>
            <ul>
                {
                    React.useMemo(() => links.map((item) => (
                        <li key={`${item.title}${Math.random()}} `}>
                            <NavLink to={item.link} className="sidebar__link">
                                <div className="link__icon">{item.icon}</div>
                                <div className="link__title">{item.title}</div>
                            </NavLink>
                        </li>
                    )), [])
                }

                <li key="logout">
                    <NavLink to="/login" className="sidebar__link" onClick={logoutHandler}>
                        <div className="link__icon"><FiLogOut /></div>
                        <div className="link__title">Logout</div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
