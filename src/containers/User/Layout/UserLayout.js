import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import { AiOutlineHistory } from 'react-icons/ai';
import { MdAddShoppingCart, MdAttachMoney } from 'react-icons/md';

import Footer from '../../../components/Footer/Footer';
import Sidebar from '../../../components/UI/Sidebar/Sidebar';
import TopBar from '../../../components/Navigation/Topbar/Topbar';

import './UserLayout.scss';
import Theme from '../../../store/theme';

const linksDetail = [
    {
        link: '/dashboard',
        icon: <RiIcons.RiDashboardLine />,
        title: 'Dashboard',
    },
    {
        link: '/new-order',
        icon: <MdAddShoppingCart />,
        title: 'New Order',
    },
    {
        link: '/orders',
        icon: <RiIcons.RiFileList3Line />,
        title: 'Services',
    },
    {
        link: '/services',
        icon: <RiIcons.RiListSettingsLine />,
        title: 'New Order',
    },
    {
        link: '/add-fund',
        icon: <MdAttachMoney />,
        title: 'Add Fund',
    },
    {
        link: '/support',
        icon: <BiIcons.BiSupport />,
        title: 'Support',
    },
    {
        link: '/transactions',
        icon: <AiOutlineHistory />,
        title: 'Transactions',
    },
    {
        link: '/api-docs',
        icon: <BiIcons.BiShareAlt />,
        title: 'API Docs',
    },
];

function Layout({ children }) {
    const [active, setActive] = useState(false);
    const { darkTheme } = useContext(Theme);

    const clickHandler = () => setActive(((preState) => !preState));

    return (
        <>
            <TopBar clicked={clickHandler} />
            <div className="main_container">
                <Sidebar active={active} links={linksDetail} />
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
