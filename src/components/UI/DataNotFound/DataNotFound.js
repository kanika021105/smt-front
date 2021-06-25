import React from 'react';
import PropTypes from 'prop-types';

import classes from './DataNotFound.module.scss';

const DataNotFound = ({ message }) => (
    <div className={classes.dataNotFound}>
        <div className="centered">
            <img
                className={classes.dataNotFound__image}
                src="/images/empty.svg"
                alt="Nothing to show!"
            />
        </div>

        <div className={classes.dataNotFound__text}>
            Nothing to show!
            {' '}
            {message}
        </div>
    </div>
);

DataNotFound.propTypes = {
    message: PropTypes.string.isRequired,
};

export default DataNotFound;
