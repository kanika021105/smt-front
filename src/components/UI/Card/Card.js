import React from 'react';
import PropTypes from 'prop-types';
import Theme from '../../../store/theme';

import classes from './Card.module.css';

const Card = ({ children }) => {
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

Card.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Card;
