/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import ProfilePic from '../../../assets/img/profile.png';

import AuthContext from '../../../store/AuthContext';
import Theme from '../../../store/theme';
import './Topbar.scss';

function Topbar({ clicked }) {
    const { websiteName } = useContext(AuthContext);
    const { toggleTheme, darkTheme } = useContext(Theme);

    return (
        <>
            <nav className={darkTheme ? 'dark' : ''}>
                <div className="topbar_left">
                    <h3 className="logo">{websiteName}</h3>
                    <RiIcons.RiMenuFill onClick={clicked} className="sidebar_button" />
                </div>

                <div className="topbar_right">
                    <div className="theme_changer">
                        <input type="checkbox" onChange={toggleTheme} className="theme_checkbox" id="theme_checkbox" checked={darkTheme} />
                        <label htmlFor="theme_checkbox" className="theme_checkbox_label">
                            <RiIcons.RiSunFill className="sun" />
                            <RiIcons.RiMoonFill className="moon" />
                            <div className="ball" />
                        </label>
                    </div>

                    <div className="user-detail">
                        <img src={ProfilePic} alt="Profile Pic" className="profilePic" loading="lazy" />
                        <p className="user_name">Sofia Leon</p>
                        <HiIcons.HiOutlineChevronDown className="profile_dropdown" />
                    </div>
                </div>
            </nav>
        </>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default Topbar;
