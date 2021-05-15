import React from 'react';

import classes from './Dropdown.module.css';

const Dropdown = (props) => {
    return (
        <div className={classes.Dropdown}>
            <button className={classes.Dropbtn}>{props.btnTitle}</button>
            <div className={classes.dropdownContent}>
                <ul>{props.children}</ul>
            </div>
        </div>
    );
};

export default Dropdown;
