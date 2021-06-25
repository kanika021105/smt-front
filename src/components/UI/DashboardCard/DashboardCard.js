import React from 'react';
import PropTypes from 'prop-types';

import classes from './DashboardCard.module.css';

const DashboardCard = ({ children }) => (
    <div className={classes.Card}>{children}</div>
);

DashboardCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardCard;
