import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Footer from '../../../components/Footer/Footer';
import Sidebar from '../../../components/Navigation/Sidebar/Sidebar';
import TopBar from '../../../components/Navigation/Topbar/Topbar';

import './UserLayout.scss';
import Links from './Links/Links';
import Theme from '../../../store/theme';

function Layout({ children }) {
    const [active, setActive] = useState(false);
    const { darkTheme } = useContext(Theme);

    const clickHandler = () => setActive(((preState) => !preState));

    return (
        <>
            <TopBar clicked={clickHandler} />
            <div className="main_container">
                <Sidebar active={active}>
                    <Links />
                </Sidebar>
                <main className={darkTheme && 'dark'}>
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
