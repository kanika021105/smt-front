import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import * as FiIcons from 'react-icons/fi';
import * as RiIcons from 'react-icons/ri';
import { AiOutlineHistory } from 'react-icons/ai';
import { BiCollection, BiSupport } from 'react-icons/bi';

import Footer from '../../../components/Footer/Footer';
import Sidebar from '../../../components/UI/Sidebar/Sidebar';
import TopBar from '../../../components/Navigation/Topbar/Topbar';

import './AdminLayout.scss';
import Theme from '../../../store/theme';

const linkDetails = [
    {
        link: '/admin/dashboard',
        icon: <RiIcons.RiDashboardLine />,
        title: 'Dashboard',
    },
    {
        link: '/admin/orders',
        icon: <RiIcons.RiFileList3Line />,
        title: 'Orders',
    },
    {
        link: '/admin/categories',
        icon: <BiCollection />,
        title: 'Categories',
    },
    {
        link: '/admin/services',
        icon: <RiIcons.RiListSettingsLine />,
        title: 'Services',
    },
    {
        link: '/admin/transactions',
        icon: <AiOutlineHistory />,
        title: 'Transactions',
    },
    {
        link: '/admin/support',
        icon: <BiSupport />,
        title: 'Support',
    },
    {
        link: '/admin/clients',
        icon: <FiIcons.FiUsers />,
        title: 'Clients',
    },
    {
        link: '/admin/settings',
        icon: <FiIcons.FiSettings />,
        title: 'Settings',
    },
    {
        link: '/admin/api-provider',
        icon: <FiIcons.FiShare2 />,
        title: 'API Providers',
    },
];

function Layout({ children }) {
    const { darkTheme } = useContext(Theme);
    const [active, setActive] = useState(false);

    const clickHandler = () => setActive(((preState) => !preState));

    return (
        <>
            <TopBar clicked={clickHandler} />
            <div className="main_container">
                <Sidebar active={active} links={linkDetails} />
                <main className={darkTheme ? 'dark' : ''}>
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
