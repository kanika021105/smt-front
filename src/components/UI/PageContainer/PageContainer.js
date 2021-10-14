import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Theme from '../../../store/theme';
import classes from './PageContainer.module.scss';

function PageContainer({ children }) {
    const { darkTheme } = useContext(Theme);

    return (
        <div className={darkTheme ? `${classes.dark} ${classes.container}` : `${classes.container}`}>
            <div className={classes.page__container}>
                {children}
            </div>
        </div>
    );
}

PageContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PageContainer;
