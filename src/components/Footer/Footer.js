import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.scss';

const AdminFooter = () => (
    <div className={classes.footer}>
        <div className={classes.footer__container}>
            <div className={classes.footer__item}>
                <span>
                    <Link to="/faq">Support</Link>
                    <Link to="/faq">Privacy</Link>
                    <Link to="/faq">Terms of Service</Link>
                </span>
            </div>

            <div className={classes.footer__item}>
                <span className={classes.copyright}>
                    &copy; 2021 - SMT Panel
                </span>
            </div>
        </div>
    </div>
);

export default AdminFooter;
