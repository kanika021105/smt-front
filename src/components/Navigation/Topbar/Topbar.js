/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

// import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import ProfilePic from '../../../assets/img/profile.png';

import AuthContext from '../../../store/AuthContext';
import Theme from '../../../store/theme';
import './Topbar.scss';

function Topbar({ clicked }) {
    const { websiteName, firstName, lastName } = useContext(AuthContext);
    const { toggleTheme, darkTheme } = useContext(Theme);

    return (
        <nav className={`topbar ${darkTheme ? 'dark' : ''}`}>
            <div className="topbar__left">
                <h3 className="logo">{websiteName}</h3>
                <div className="hamburger" onClick={clicked} role="none">
                    <div className="hamburger__line" />
                    <div className="hamburger__line" />
                    <div className="hamburger__line" />
                </div>
            </div>

            <div className="topbar__right">
                <div className="theme__changer">
                    <input
                        type="checkbox"
                        onChange={toggleTheme}
                        className="theme__checkbox"
                        id="theme__checkbox"
                        checked={darkTheme}
                    />
                    <label htmlFor="theme__checkbox" className="theme__checkbox--label">
                        <RiIcons.RiSunFill className="sun" />
                        <RiIcons.RiMoonFill className="moon" />
                        <div className="ball" />
                    </label>
                </div>

                <div className="user">
                    <img src={ProfilePic} alt="Profile Pic" className="user__pic" />
                    <p className="user__name">{`${firstName} ${lastName}`}</p>
                    {/* <HiIcons.HiOutlineChevronDown className="profile_dropdown" /> */}
                </div>
            </div>
        </nav>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default Topbar;
