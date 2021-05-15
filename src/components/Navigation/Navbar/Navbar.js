// jshint esversion:9

import React, { useContext } from 'react';

import { Navbar } from 'react-bootstrap';

// import classes from './Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import { AuthContext } from '../../../containers/Context/AuthContext';
import classes from './Navbar.module.css';

const NavbarComponent = () => {
    const { isLoggedIn } = useContext(AuthContext);

    const logoutClickHandler = (e) => {
        e.preventDefault();

        localStorage.clear();
        return (window.location = '/login');
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <div className="container">
                    <Navbar.Brand>
                        <img
                            rel="preconnect"
                            className={classes.brandLogo}
                            width="120"
                            height="50"
                            src="https://smtpanel.in/assets/images/SMT-Logo.png"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <NavigationItems />
                        {isLoggedIn && (
                            <button
                                className="btn btn-danger"
                                onClick={logoutClickHandler}
                            >
                                Logout
                            </button>
                        )}
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    );
};

export default React.memo(NavbarComponent);
