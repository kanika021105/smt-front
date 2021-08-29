import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import { MdAddShoppingCart, MdAttachMoney } from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

import { ReactComponent as Logo } from '../../../../assets/img/logo.min.svg';
import Context from '../../../../store/context';

function Links() {
    const {
        firstName,
        lastName,
        role,
        balance,
        logout,
    } = useContext(Context);

    const logoutHandler = () => {
        // e.preventDefault();

        // localStorage.clear();
        // window.location = '/login';
        logout();
    };

    return (
        <>
            <div className="logo-details">
                <Logo />
                <span className="logo_name">SMT Panel</span>
            </div>

            <div className="user_balance">
                <span className="title">Balance:</span>
                <span className="amount">
                    {balance && balance.toFixed(2)}
                </span>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/dashboard" activeClassName="active_link">
                        <RiIcons.RiDashboardLine />
                        <span className="link_name">Dashboard</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Dashboard</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/new-order" activeClassName="active_link">
                        <MdAddShoppingCart />
                        <span className="link_name">New Order</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">New Order</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/orders" activeClassName="active_link">
                        <RiIcons.RiFileList3Line />
                        <span className="link_name">Orders</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Orders</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/services" activeClassName="active_link">
                        <RiIcons.RiListSettingsLine />
                        <span className="link_name">Services</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Services</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/add-fund" activeClassName="active_link">
                        <MdAttachMoney />
                        <span className="link_name">Add Fund</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Add Fund</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/support" activeClassName="active_link">
                        <BiSupport />
                        <span className="link_name">Support</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Support</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/transactions" activeClassName="active_link">
                        <AiOutlineHistory />
                        <span className="link_name">Transactions</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Transactions</span></li>
                    </ul>
                </li>

                <li>
                    <div className="profile-details">
                        <div className="profile-content">
                            {/* <img src="image/profile.jpg" alt="profile" /> */}
                        </div>
                        <div className="name-role">
                            <div className="profile_name">{`${firstName} ${lastName}`}</div>
                            <div className="role">{role}</div>
                        </div>
                        <FiLogOut onClick={logoutHandler} />
                    </div>
                </li>
            </ul>
        </>
    );
}

export default Links;
