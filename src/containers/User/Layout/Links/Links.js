import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { AiOutlineHistory } from 'react-icons/ai';
import { MdAddShoppingCart, MdAttachMoney } from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

import { ReactComponent as Logo } from '../../../../assets/images/logo.min.svg';
import { AuthContext } from '../../../Context/AuthContext';

function Links() {
    const {
        fName,
        lName,
        role,
        balance,
    } = useContext(AuthContext);

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

            <div className="user_balance">
                <span className="title">Balance:</span>
                <span className="amount">
                    {balance.toFixed(2)}
                </span>
            </div>

            <ul className="nav-links">
                <li>
                    <Link to="/dashboard">
                        <RiIcons.RiDashboardLine />
                        <span className="link_name">Dashboard</span>
                    </Link>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Dashboard</span></li>
                    </ul>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/new-order">
                            <MdAddShoppingCart />
                            <span className="link_name">New Order</span>
                        </Link>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">New Order</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <div className="iocn-link">
                        <Link to="/orders">
                            <RiIcons.RiFileList3Line />
                            <span className="link_name">Orders</span>
                        </Link>

                        <ul className="sub-menu blank">
                            <li><span className="link_name">Orders</span></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/services">
                        <RiIcons.RiListSettingsLine />
                        <span className="link_name">Services</span>
                    </Link>

                    <ul className="sub-menu blank">
                        <li><span className="link_name">Services</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/add-fund">
                        <MdAttachMoney />
                        <span className="link_name">Add Fund</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Add Fund</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/support">
                        <BiSupport />
                        <span className="link_name">Support</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><span className="link_name">Support</span></li>
                    </ul>
                </li>

                <li>
                    <Link to="/transactions">
                        <AiOutlineHistory />
                        <span className="link_name">Transactions</span>
                    </Link>
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
                            <div className="profile_name">{`${fName} ${lName}`}</div>
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
