import React from 'react';

import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navigation/Navbar/Navbar';

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </>
    );
};

export default Layout;
