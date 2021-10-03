import React from 'react';
import {
    bool, func, node, number, oneOfType, string,
} from 'prop-types';

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
        <label htmlFor={id || 'input'}>
            {label}
            <input
                id={id || 'input'}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                pattern={pattern}
                required={required}
            />
        </label>
    </div>
);

export const InputGroup = ({ children }) => <div className={classes['input--group']}>{children}</div>;

Input.propTypes = {
    id: oneOfType([number, string]),
    type: string,
    name: string,
    value: oneOfType([string, number]),
    placeholder: oneOfType([string, number]),
    onChange: func,
    disabled: bool,
    label: string,
    pattern: string,
    required: bool,
};

InputGroup.propTypes = {
    children: node.isRequired,
};

export default Input;
