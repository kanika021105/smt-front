import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.scss';
import AuthContext from '../../../store/AuthContext';

const NavbarComponent = () => {
    const { websiteName } = useContext(AuthContext);
    const [showHamburger, setShowHamburger] = useState(false);

    return (
        <div className={classes.navbar}>
            <div className={classes.logo}>
                {websiteName || 'SMT Panel'}
            </div>

            <div className={classes.nav_link}>
                <div
                    className={classes.hamburger}
                    role="none"
                    onClick={() => { setShowHamburger(!showHamburger); }}
                >
                    <div className={classes.hamburger_line} />
                    <div className={classes.hamburger_line} />
                    <div className={classes.hamburger_line} />
                </div>

                <div className={showHamburger ? classes.navlink__holder : classes.hide_links}>
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
        </div>
    );
};

export default React.memo(NavbarComponent);
