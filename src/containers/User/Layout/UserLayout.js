import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navigation/Navbar/Navbar';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <main>{children}</main>
        <Footer />
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
