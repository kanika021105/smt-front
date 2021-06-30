import PropTypes from 'prop-types';
import React from 'react';

import classes from './Checkbox.module.scss';

function Checkbox({ text }) {
    return (
        <div className={classes.checkbox}>
            <input type="checkbox" />
            <p>{text}</p>
        </div>
    );
}

Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Checkbox;
