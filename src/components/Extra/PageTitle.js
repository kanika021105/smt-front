import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import AuthContext from '../../store/AuthContext';

function PageTitle({ title }) {
    const { websiteName } = useContext(AuthContext);

    return (
        <Helmet>
            <title>
                {`${title} - ${websiteName || ''}`}
            </title>
        </Helmet>

    );
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;
