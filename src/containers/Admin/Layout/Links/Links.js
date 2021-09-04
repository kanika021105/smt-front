import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import * as FiIcons from 'react-icons/fi';
import { BiCollection, BiSupport } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';

import AuthContext from '../../../../store/AuthContext';
import './Links.css';

function Links() {
    const { logout } = useContext(AuthContext);

    function logoutHandler() {
        logout();
        window.location = '/login';
    }

    return (
        <>
            <NavLink to="/admin/dashboard" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiDashboardLine />
                </div>
                <div className="link_title">
                    Dashboard
                </div>
            </NavLink>

            <NavLink to="/admin/orders" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiFileList3Line />
                </div>
                <div className="link_title">
                    Orders
                </div>
            </NavLink>

            <NavLink to="/admin/categories" className="sidebar_links">
                <div className="link_icon">
                    <BiCollection />
                </div>
                <div className="link_title">
                    Categories
                </div>
            </NavLink>

            <NavLink to="/admin/services" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiListSettingsLine />
                </div>
                <div className="link_title">
                    Services
                </div>
            </NavLink>

            <NavLink to="/admin/transactions" className="sidebar_links">
                <div className="link_icon">
                    <AiOutlineHistory />
                </div>
                <div className="link_title">
                    Transactions
                </div>
            </NavLink>

            <NavLink to="/admin/support" className="sidebar_links">
                <div className="link_icon">
                    <BiSupport />
                </div>
                <div className="link_title">
                    Support
                </div>
            </NavLink>

            <NavLink to="/admin/clients" className="sidebar_links">
                <div className="link_icon">
                    <FiIcons.FiUsers />
                </div>
                <div className="link_title">
                    Clients
                </div>
            </NavLink>

            <NavLink to="/admin/settings" className="sidebar_links">
                <div className="link_icon">
                    <FiIcons.FiSettings />
                </div>
                <div className="link_title">
                    Settings
                </div>
            </NavLink>

            <NavLink to="/admin/api-provider" className="sidebar_links">
                <div className="link_icon">
                    <FiIcons.FiShare2 />
                </div>
                <div className="link_title">
                    Settings
                </div>
            </NavLink>

            <button type="button" className="sidebar_links" onClick={logoutHandler}>
                <div className="link_icon">
                    <FiLogOut />
                </div>
                <div className="link_title">
                    logout
                </div>
            </button>
        </>
    );
}

export default Links;
