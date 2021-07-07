import PropTypes from 'prop-types';
import React from 'react';

import classes from './Checkbox.module.scss';

function Checkbox({ text, checked, onChange }) {
    return (
        <div className={classes.checkbox}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <p>{text}</p>
        </div>
    );
}

Checkbox.propTypes = {
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Checkbox;
