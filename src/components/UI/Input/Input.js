import React from 'react';

// eslint-disable-next-line no-unused-vars
import './Input.module.css';

const Input = (props) => {
    return (
        <input
            id={props.id}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.disabled}
        ></input>
    );
};

export default Input;
