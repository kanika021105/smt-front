import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.scss';

const NavbarComponent = () => (
    <div className={classes.navbar}>
        <div className={classes.logo}>
            SMT Panel
        </div>

        <div className={classes.nav_link}>
            <ul>
                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/services">
                        Services
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        SIGN-UP
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
);

export default React.memo(NavbarComponent);
