import React from 'react';
import PropTypes, { number, string } from 'prop-types';

import classes from './Select.module.scss';

function Select({
    children, label, value, onChange, disabled, required,
}) {
    return (
        <div className={classes.select}>
            <label>
                {label}
            </label>

            <select
                className="select"
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            >
                {children}
            </select>
        </div>
    );
}

Select.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([string, number]).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,

};

export default Select;
