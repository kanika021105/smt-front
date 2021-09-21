import React from 'react';
import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './Dropdown.scss';

function Dropdown({ children }) {
    // Dropdown function
    function dropdown() {
        document.querySelector('#dropdownContent').classList.toggle('show');
    }

    // Close dropdown if user click outside of it
    window.onclick = (e) => {
        if (!e.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName('dropdownContent');
            let i;
            for (i = 0; i < dropdowns.length; i += 1) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    return (
        <div className="dropdown">
            <BsThreeDotsVertical onClick={dropdown} className="dropbtn" />
            <div id="dropdownContent" className="dropdownContent">
                {children}
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Dropdown;
