import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import { MdAddShoppingCart, MdAttachMoney } from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

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

            {/* <div className="user_balance">
                <span className="title">Balance:</span>
                <span className="amount">
                    {balance && balance.toFixed(2)}
                </span>
            </div> */}

            <NavLink to="/dashboard" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiDashboardLine />
                </div>
                <div className="link_title">
                    Dashboard
                </div>
            </NavLink>

            <NavLink to="/new-order" className="sidebar_links">
                <div className="link_icon">
                    <MdAddShoppingCart />
                </div>
                <div className="link_title">
                    New Order
                </div>
            </NavLink>

            <NavLink to="/orders" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiFileList3Line />
                </div>
                <div className="link_title">
                    Orders
                </div>
            </NavLink>

            <NavLink to="/services" className="sidebar_links">
                <div className="link_icon">
                    <RiIcons.RiListSettingsLine />
                </div>
                <div className="link_title">
                    Services
                </div>
            </NavLink>

            <NavLink to="/add-fund" className="sidebar_links">
                <div className="link_icon">
                    <MdAttachMoney />
                </div>
                <div className="link_title">
                    Add Fund
                </div>
            </NavLink>

            <NavLink to="/support" className="sidebar_links">
                <div className="link_icon">
                    <BiIcons.BiSupport />
                </div>
                <div className="link_title">
                    Support
                </div>
            </NavLink>

            <NavLink to="/transactions" className="sidebar_links">
                <div className="link_icon">
                    <AiOutlineHistory />
                </div>
                <div className="link_title">
                    Transactions
                </div>
            </NavLink>

            <NavLink to="/api-docs" className="sidebar_links">
                <div className="link_icon">
                    <BiIcons.BiShareAlt />
                </div>
                <div className="link_title">
                    API Docs
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
