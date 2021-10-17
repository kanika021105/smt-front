/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import * as RiIcons from 'react-icons/ri';
import ProfilePic from '../../../assets/img/profile.png';

import AuthContext from '../../../store/AuthContext';
import Theme from '../../../store/theme';
import classes from './Topbar.module.scss';

function Topbar({ clicked }) {
    const { websiteName, firstName, lastName } = useContext(AuthContext);
    const { toggleTheme, darkTheme } = useContext(Theme);

    return (
        <nav className={`${classes.topbar} ${darkTheme ? classes.dark : ''}`}>
            <div className={classes.topbar__left}>
                <h3 className={classes.logo}>{websiteName}</h3>
                <div className={classes.hamburger} onClick={clicked} role="none">
                    <div className={classes.hamburger__line} />
                    <div className={classes.hamburger__line} />
                    <div className={classes.hamburger__line} />
                </div>
            </div>

            <div className={classes.topbar__right}>
                <div className={classes.theme__changer}>
                    <input className={classes.theme__checkbox} type="checkbox" onChange={toggleTheme} id="theme__checkbox" checked={darkTheme} />
                    <label htmlFor="theme__checkbox" className={classes['theme__checkbox--label']}>
                        <RiIcons.RiSunFill className={classes.sun} />
                        <RiIcons.RiMoonFill className={classes.moon} />
                        <div className={classes.ball} />
                    </label>
                </div>

                <div className={classes.user}>
                    <img src={ProfilePic} alt="Profile Pic" className={classes.user__pic} />
                    <p className={classes.user__name}>{`${firstName} ${lastName}`}</p>
                </div>
            </div>
        </nav>
    );
}

Topbar.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default Topbar;
