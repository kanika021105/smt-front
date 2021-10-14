import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';
import Theme from '../../../store/theme';

function Table({ children }) {
    const { darkTheme } = React.useContext(Theme);

    return (
        <div className={`table ${darkTheme ? 'dark' : ''}`}>
            <table>{children}</table>
        </div>
    );
}
export function THead({ children }) {
    return <thead>{children}</thead>;
}

export function TBody({ children }) {
    return <tbody>{children}</tbody>;
}

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
