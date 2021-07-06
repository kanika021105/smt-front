import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import * as FiIcons from 'react-icons/fi';
import { BiCollection, BiSupport } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';

import { ReactComponent as Logo } from '../../../../assets/images/logo.min.svg';
import Context from '../../../../store/context';

function Links() {
    const {
        firstName,
        lastName,
        role,
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

            <ul className="nav-links u-mt-4">
                <li>
                    <NavLink to="/admin/dashboard" activeClassName="active_link">
                        <RiIcons.RiDashboardLine />
                        <span className="link_name">Dashboard</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Dashboard</span></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <NavLink to="/admin/orders" activeClassName="active_link">
                            <RiIcons.RiFileList3Line />
                            <span className="link_name">Order</span>
                        </NavLink>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">Orders</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="iocn-link">
                        <NavLink to="/admin/categories" activeClassName="active_link">
                            <BiCollection />
                            <span className="link_name">Categories</span>
                        </NavLink>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">Categories</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <NavLink to="/admin/services" activeClassName="active_link">
                        <RiIcons.RiListSettingsLine />
                        <span className="link_name">Services</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Services</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/transactions" activeClassName="active_link">
                        <AiOutlineHistory />
                        <span className="link_name">Transactions</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Transactions</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/support" activeClassName="active_link">
                        <BiSupport />
                        <span className="link_name">Support</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Support</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/clients" activeClassName="active_link">
                        <FiIcons.FiUsers />
                        <span className="link_name">Clients</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Clients</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/settings" activeClassName="active_link">
                        <FiIcons.FiSettings />
                        <span className="link_name">Settings</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Settings</span></li>
                    </ul>
                </li>

                <li>
                    <NavLink to="/admin/api-provider" activeClassName="active_link">
                        <FiIcons.FiShare2 />
                        <span className="link_name">Api Provider</span>
                    </NavLink>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Api Provider</span></li>
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
                        <FiIcons.FiLogOut onClick={logoutHandler} />
                    </div>
                </li>
            </ul>
        </>
    );
}

export default Links;
