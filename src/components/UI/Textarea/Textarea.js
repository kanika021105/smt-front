import React from 'react';
import PropTypes from 'prop-types';

import classes from './Textarea.module.scss';

function Textarea({
    label, id, placeholder, value, rows, cols, onChange,
}) {
    return (
        <div className={classes.textarea}>
            <label htmlFor={id || 'textarea'}>
                {label}
                <textarea
                    id={id || 'textarea'}
                    placeholder={placeholder}
                    value={value}
                    rows={rows}
                    cols={cols}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}

Textarea.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    onChange: PropTypes.func,
};

export default Textarea;
