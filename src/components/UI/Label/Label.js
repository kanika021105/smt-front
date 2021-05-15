import React from 'react';

import './Label.module.css';

const Label = (props) => {
    return <label htmlFor={props.for}>{props.children}</label>;
};

export default Label;
