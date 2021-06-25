import React from 'react';
import PropTypes from 'prop-types';

import classes from './Dropdown.module.css';

const Dropdown = ({ btnTitle, children }) => (
    <div className={classes.Dropdown}>
        <button type="button" className={classes.Dropbtn}>
            {btnTitle}
        </button>
        <div className={classes.dropdownContent}>
            <ul>{children}</ul>
        </div>
    </div>
);

Dropdown.propTypes = {
    btnTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Dropdown;
