import React from 'react';
import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './Dropdown.scss';

function Dropdown({ children, id }) {
    // Dropdown function
    function dropdown(e) {
        const targetId = e.target.id;
        document.getElementById(`${targetId}dropdown`).classList.toggle('show');
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
            <BsThreeDotsVertical id={id} onClick={dropdown} className="dropbtn" />
            <div id={`${id}dropdown`} className="dropdownContent">
                {children}
            </div>
        </div>
    );
}

Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};

export default Dropdown;
