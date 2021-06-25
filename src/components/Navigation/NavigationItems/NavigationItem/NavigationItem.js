import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavItem = ({
    to,
    exact,
    active,
    children,
}) => (
    <li className={classes.NavigationItem}>
        <NavLink to={to} exact={exact} activeClassName={active}>
            {children}
        </NavLink>
    </li>
);

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default NavItem;
