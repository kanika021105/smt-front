import React from 'react';
import PropTypes from 'prop-types';

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
}) => (
    <div className={classes.input}>
        <label>{label}</label>
        <input
            className={classes.input}
            id={id}
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            pattern={pattern}
        />
    </div>
);

export const InputGroup = ({ children }) => <div className={classes['input--group']}>{children}</div>;

Input.propTypes = {
    id: PropTypes.number,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    pattern: PropTypes.string,

};

InputGroup.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Input;
