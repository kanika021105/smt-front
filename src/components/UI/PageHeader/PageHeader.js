import React from 'react';
import PropTypes from 'prop-types';
import { VscListSelection } from 'react-icons/vsc';

function PageHeader({ header }) {
    return (
        <h2 className="pageTitle">
            <VscListSelection style={{ fontSize: '30px' }} />
            {' '}
            {header}
        </h2>
    );
}

PageHeader.propTypes = {
    header: PropTypes.string.isRequired,
};

export default PageHeader;
