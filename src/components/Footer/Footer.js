import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Theme from '../../store/theme';
import classes from './Footer.module.scss';

const AdminFooter = () => {
    const { darkTheme } = useContext(Theme);

    return (
        <footer className={darkTheme
            ? [classes.dark, classes.footer].join(' ')
            : classes.footer}
        >
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
        </footer>
    );
};

export default AdminFooter;
