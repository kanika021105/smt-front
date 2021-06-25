import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';

const Table = ({ children }) => <table>{children}</table>;
export const THead = ({ children }) => <thead>{children}</thead>;
export const TBody = ({ children }) => <tbody>{children}</tbody>;

Table.propTypes = {
    children: PropTypes.node,
};

THead.propTypes = {
    children: PropTypes.node,
};

TBody.propTypes = {
    children: PropTypes.node,
};

export default Table;
