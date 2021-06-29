import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import * as FiIcons from 'react-icons/fi';
import { BiCollection, BiSupport } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';

import { ReactComponent as Logo } from '../../../../assets/images/logo.min.svg';
import { AuthContext } from '../../../Context/AuthContext';

function Links() {
    const { fName, lName, role } = useContext(AuthContext);

    const logoutHandler = (e) => {
        e.preventDefault();

        localStorage.clear();
        window.location = '/login';
    };

    return (
        <>
            <div className="logo-details">
                <Logo />
                <span className="logo_name">SMT Panel</span>
            </div>

            <ul className="nav-links u-mt-4">
                <li>
                    <Link to="/admin/dashboard">
                        <RiIcons.RiDashboardLine />
                        <span className="link_name">Dashboard</span>
                    </Link>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Dashboard</span></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/admin/orders">
                            <RiIcons.RiFileList3Line />
                            <span className="link_name">Order</span>
                        </Link>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">Orders</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/admin/categories">
                            <BiCollection />
                            <span className="link_name">Categories</span>
                        </Link>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">Categories</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/admin/services">
                        <RiIcons.RiListSettingsLine />
                        <span className="link_name">Services</span>
                    </Link>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Services</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/transactions">
                        <AiOutlineHistory />
                        <span className="link_name">Transactions</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Transactions</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/support">
                        <BiSupport />
                        <span className="link_name">Support</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Support</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/clients">
                        <FiIcons.FiUsers />
                        <span className="link_name">Clients</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Clients</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/settings">
                        <FiIcons.FiSettings />
                        <span className="link_name">Settings</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Settings</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/api-provider">
                        <FiIcons.FiShare2 />
                        <span className="link_name">Api Provider</span>
                    </Link>
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
                            <div className="profile_name">{`${fName} ${lName}`}</div>
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
