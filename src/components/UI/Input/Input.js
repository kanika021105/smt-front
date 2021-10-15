import React, { useContext } from 'react';
import {
    bool, func, node, number, oneOfType, string,
} from 'prop-types';

import Theme from '../../../store/theme';
import classes from './Input.module.scss';

function Input({
    id, type, name, value, placeholder, onChange, disabled, label, pattern, required,
}) {
    const { darkTheme } = useContext(Theme);

    return (
        <div className={`${classes.input} ${darkTheme ? classes.dark : ''}`}>
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
}

export function InputGroup({ children }) {
    const { darkTheme } = useContext(Theme);
    return (<div className={`${classes.input__group} ${darkTheme ? classes.dark : ''}`}>{children}</div>);
}

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
