import React from 'react';
import PropTypes, { number, string } from 'prop-types';

import classes from './Input.module.scss';

const Input = ({
    id,
    type,
    name,
    value,
    placeholder,
    onChange,
    disabled,
    label,
    pattern,
    required,
}) => (
    <div className={classes.input}>
        <label>
            {label}
        </label>

        <input
            id={id}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            pattern={pattern}
            required={required}
        />
    </div>
);

export const InputGroup = ({ children }) => <div className={classes['input--group']}>{children}</div>;

Input.propTypes = {
    id: PropTypes.number,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([string, number]),
    placeholder: PropTypes.oneOfType([string, number]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    pattern: PropTypes.string,
    required: PropTypes.bool,
};

InputGroup.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Input;
