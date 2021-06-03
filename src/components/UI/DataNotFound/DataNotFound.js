import React from 'react';

import classes from './DataNotFound.module.scss';

const DataNotFound = (props) => {
    return (
        <div className={classes.dataNotFound}>
            <div className={'centered'}>
                <img
                    className={classes.dataNotFound__image}
                    src={'/images/empty.svg'}
                    alt={'Nothing to show!'}
                />
            </div>
            <div className={classes.dataNotFound__text}>
                Nothing to show! {props.message}
            </div>
        </div>
    );
};

export default DataNotFound;
