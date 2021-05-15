// jshint esversion:9

import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                to={props.to}
                exact={props.exact}
                activeClassName={props.active}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavItem;
