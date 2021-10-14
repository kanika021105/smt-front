import React from 'react';
import { number, oneOfType, string } from 'prop-types';

import Theme from '../../../store/theme';
import classes from './DashboardCard.module.scss';

function DashboardCard({ title, value }) {
    const { darkTheme } = React.useContext(Theme);

    return (
        <div className={`${classes.card} ${darkTheme ? `${classes.dark} ${classes.card}` : ''}`}>
            <span className={classes.title}>{title}</span>
            <span className={classes.value}>{value}</span>
        </div>
    );
}

DashboardCard.propTypes = {
    title: string.isRequired,
    value: oneOfType([string, number]).isRequired,
};

export default DashboardCard;
