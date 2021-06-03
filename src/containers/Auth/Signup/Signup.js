// jshint esversion:9

import React, { useState, useContext } from 'react';

import { Helmet } from 'react-helmet';
import { FormControl, Modal } from 'react-bootstrap';

import classes from './Signup.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../../../components/UI/Card/Card';

import Axios from '../../../axiosIns';
import { WebsiteDetail } from '../../Context/WebsiteDetailContext';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const { websiteName } = useContext(WebsiteDetail);

    const submitHandler = async (e) => {
        e.preventDefault();

        const url = '/signup';

        const { data } = await Axios.post(url, { ...userDetails });
        console.log(data.status);

        if (data.status === 'failed' || data.status === 'Failed') {
            setErrorMsg(data.errorMsg);
            setShowError(true);
        }

        setShowModal(true);
    };

    const firstNameChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            firstName: e.target.value,
        }));
    };

    const lastNameChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            lastName: e.target.value,
        }));
    };

    const emailChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            email: e.target.value,
        }));
    };

    const contactChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            contact: e.target.value,
        }));
    };

    const passwordChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            password: e.target.value,
        }));
    };

    const confirmPasswordChangeHandler = (e) => {
        setUserDetails((preState) => ({
            ...preState,
            confirmPassword: e.target.value,
        }));
    };

    const handleClose = () => {
        setUserDetails({
            firstName: '',
            lastName: '',
            email: '',
            contact: '',
            password: '',
            confirmPassword: '',
        });

        setErrorMsg('');
        setShowError('');
        setShowModal(false);
    };

    const successModal = (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Body>
                <div className={classes.successModal}>
                    <div className="centered">
                        <img
                            className={classes.signUp__success__img}
                            src="/images/success.svg"
                            alt="successImage"
                        />
                    </div>
                    <h3 className={classes.signUp__success__heading}>
                        Congratulations!
                    </h3>

                    <p className={classes.signUp__success__paragraph}>
                        Your account have been created successfully! Please{' '}
                        <Link
                            className={classes.signUp__success__paragraph__link}
                            to={'/login'}
                        >
                            Login
                        </Link>{' '}
                        to your account to use our panel.
                    </p>

                    <div className="centered">
                        <button
                            className="btn btn-primary"
                            onClick={handleClose}
                        >
                            Okay!
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <Helmet>
                <title>SignUp - {websiteName || 'SMT'}</title>
            </Helmet>

            {successModal}

            <div className={classes.SignUp}>
                <Card>
                    <h2>Create a new account!</h2>

                    {showError && (
                        <small className={classes.errorMsg}>{errorMsg}</small>
                    )}

                    <form onSubmit={submitHandler}>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className={classes.formControl}>
                                    <label className="input__label">
                                        First Name
                                    </label>
                                    <input
                                        className="input"
                                        id="firstName"
                                        type="text"
                                        value={userDetails.firstName}
                                        placeholder="First Name"
                                        onChange={firstNameChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12">
                                <div className={classes.formControl}>
                                    <label className="input__label">
                                        Last Name
                                    </label>
                                    <input
                                        className="input"
                                        id="lastName"
                                        type="text"
                                        value={userDetails.lastName}
                                        placeholder="Last Name"
                                        onChange={lastNameChangeHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">Email</label>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                value={userDetails.email}
                                placeholder="Email"
                                onChange={emailChangeHandler}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">
                                WhatsApp/Telegram
                            </label>
                            <input
                                className="input"
                                id="contact"
                                type="number"
                                value={userDetails.contact}
                                placeholder="+91"
                                onChange={contactChangeHandler}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">Password</label>
                            <FormControl
                                className="input"
                                id="password"
                                type="password"
                                value={userDetails.password}
                                placeholder="Password"
                                onChange={passwordChangeHandler}
                            />
                        </div>

                        <div className={classes.formControl}>
                            <label className="input__label">
                                Confirm Password
                            </label>
                            <input
                                className="input"
                                id="confirmPassword"
                                type="password"
                                value={userDetails.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={confirmPasswordChangeHandler}
                            />
                        </div>

                        <button type="submit" className="mt-3 btn btn-primary">
                            Signup
                        </button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Signup;
