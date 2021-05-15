import React from 'react';

import Footer from '../../../components/Footer/Footer';
import classes from './AdminLayout.module.css';
import Navbar from '../../../components/Navigation/Navbar/Navbar';

const Layout = (props) => {
    return (
        <div className={classes.main}>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
