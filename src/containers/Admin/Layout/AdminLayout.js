import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Footer/Footer';
import classes from './AdminLayout.module.css';
import Navbar from '../../../components/Navigation/Navbar/Navbar';

const Layout = ({ children }) => (
    <div className={classes.main}>
        <Navbar />
        <main>{children}</main>
        <Footer />
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
