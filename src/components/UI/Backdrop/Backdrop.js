import React from 'react';
import classes from './Backdrop.module.css';

function keyPress(e) {
    if (e.key === 'Escape') {
        // write your logic here.
    }
}

const backdrop = ({ clicked, show, children }) => show && (
    <div
        role="none"
        className={classes.Backdrop}
        onClick={clicked}
        onKeyPress={keyPress}
    >
        {children}
    </div>
);

export default backdrop;
