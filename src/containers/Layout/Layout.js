import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../components/Navigation/Navbar/Navbar';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <main className="main">{children}</main>
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
