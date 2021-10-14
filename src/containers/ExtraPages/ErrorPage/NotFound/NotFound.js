import React from 'react';
import { useHistory } from 'react-router';

import PageTitle from '../../../../components/Extra/PageTitle';

import './NotFound.scss';

function NotFound() {
    const history = useHistory();

    function goBack() {
        history.push('/');
    }

    return (
        <>
            <PageTitle title="404 - Page not found!" />
            <div className="notFound">
                <h1 className="notFound__header">Oops!</h1>
                <h2 className="notFound__subHeader">404 - Page not found</h2>
                <p className="notFound__paragraph">
                    The page you are looking for might have been
                    remove had its name changed or its temporarily unavailable.
                </p>
                <button className="notFound__button" type="button" onClick={goBack}>Go to Homepage</button>
            </div>
        </>
    );
}

export default NotFound;
