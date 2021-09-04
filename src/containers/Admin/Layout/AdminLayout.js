import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Footer/Footer';
import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import TopBar from '../../../components/Navigation/Topbar/Topbar';

import './AdminLayout.scss';
import Links from './Links/Links';

function Layout({ children }) {
    const [active, setActive] = useState(false);

    const clickHandler = () => setActive(((preState) => !preState));

    return (
        <>
            <TopBar clicked={clickHandler} />
            <div className="main_container">
                <Sidebar active={active}>
                    <Links />
                </Sidebar>
                <main className="dark">
                    {children}
                    <Footer />
                </main>
            </div>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
