// jshint esversion:9

import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

const Loading = (props) =>
    props.show && (
        <Backdrop show={props.show}>
            <div className="loading">
                <div className="loading__1">
                    <div></div>
                </div>
            </div>
        </Backdrop>
    );

export default Loading;
