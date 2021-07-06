import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import classes from './NavigationItems.module.css';

const NavigationItems = () => {
    const navItem = (
        <Nav className="mr-auto">
            <Link to="/">
                Home
            </Link>

            <Link to="/login">
                Login
            </Link>

            <Link to="/signup">
                Signup
            </Link>
        </Nav>
    );

    return <ul className={classes.NavigationItems}>{navItem}</ul>;
};

export default NavigationItems;
