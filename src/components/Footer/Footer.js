// jshint esversion:9

import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const AdminFooter = () => {
    return (
        <div className={classes.Footer}>
            <span>
                <Link to="/faq">Support</Link>
                <Link to="/faq">Privacy</Link>
                <Link to="/faq">Terms of Service</Link>
            </span>
            <span className={classes.copyright}>&copy; 2021 - SMT Panel</span>
        </div>
    );
};

export default AdminFooter;
