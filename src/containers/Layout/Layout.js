// jshint esversion:9

import React from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <main className={'main'}>{props.children}</main>
        </>
    );
};

export default Layout;
