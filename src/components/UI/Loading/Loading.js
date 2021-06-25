import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

const Loading = ({ show }) => show && (
    <Backdrop show={show}>
        <div className="loading">
            <div className="loading__1">
                <div />
            </div>
        </div>
    </Backdrop>
);

Loading.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default Loading;
