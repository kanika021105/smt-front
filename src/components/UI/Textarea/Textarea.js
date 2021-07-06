import React from 'react';
import PropTypes from 'prop-types';

import classes from './Textarea.module.scss';

function Textarea({
    label, placeholder, value, rows, cols, onChange,
}) {
    return (
        <div className={classes.textarea}>
            <label>
                {label}
            </label>
            <textarea
                placeholder={placeholder}
                value={value}
                rows={rows}
                cols={cols}
                onChange={onChange}
            />
        </div>
    );
}

Textarea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    onChange: PropTypes.func,
};

export default Textarea;
