import React from 'react';
import PropTypes from 'prop-types';
import { MdKeyboardArrowRight } from 'react-icons/md';

import './PageHeader.scss';

function PageHeader({ header, children }) {
    return (
        <h2 className="pageTitle">
            <MdKeyboardArrowRight style={{ fontSize: '30px' }} />
            {header}
            {children}
        </h2>
    );
}

PageHeader.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default PageHeader;
