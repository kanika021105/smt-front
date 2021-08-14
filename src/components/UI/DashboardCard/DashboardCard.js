import React from 'react';
import PropTypes from 'prop-types';
import Theme from '../../../store/theme';

import classes from './DashboardCard.module.css';

const DashboardCard = ({ children }) => {
    const { darkTheme } = React.useContext(Theme);

    return (
        <div className={
            darkTheme
                ? [classes.dark, classes.Card].join(' ')
                : classes.Card
        }
        >
            {children}
        </div>
    );
};

DashboardCard.propTypes = { children: PropTypes.node.isRequired };

export default DashboardCard;
