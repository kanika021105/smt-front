import React from 'react';
import PropTypes from 'prop-types';

import './Label.module.css';

const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor}>{children}</label>
);

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Label;
