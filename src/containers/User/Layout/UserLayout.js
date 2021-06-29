import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Footer/Footer';
import Sidebar from '../../../components/UI/Sidebar/Sidebar';
import TopBar from '../../../components/UI/Topbar/Topbar';

import './UserLayout.scss';
import Links from './Links/Links';

function Layout({ children }) {
    const [active, setActive] = useState(false);

    const clickHandler = () => setActive(((preState) => !preState));

    return (
        <>
            <div className="layout-container">
                <Sidebar active={active}>
                    <Links />
                </Sidebar>

                <main className="main">
                    <TopBar clicked={clickHandler} />
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
