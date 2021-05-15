import React from 'react';

import classes from './DashboardCard.module.css';

const DashboardCard = (props) => {
    return <div className={classes.Card}>{props.children}</div>;
};

export default DashboardCard;
