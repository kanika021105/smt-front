// jshint esversion:9

import React, { useState, useContext } from 'react';

import { Helmet } from 'react-helmet';
import { Button, Form, FormControl, Modal } from 'react-bootstrap';

import Axios from '../../../axiosIns';

import Card from '../../../components/UI/Card/Card';

import { WebsiteDetail } from '../../Context/WebsiteDetailContext';

import classes from './Singup.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);

    const submitHandler = async (e) => {
        e.preventDefault();

        let url = '/signup';
        const signUpData = {
            f_name: firstName,
            l_name: lastName,
            email,
            contact,
            password,
            confirmPassword,
        };

        let { data } = await Axios.post(url, { ...signUpData });

        console.log(data.status);

        if (data) {
            if (data.status === 'success' || data.status === 'Success') {
                setShowModal(true);
            }

            if (data.status === 'failed' || data.status === 'Failed') {
                setErrorMsg(data.errorMsg);
                setShowError(true);
            }
        }

        return;
    };

    const firstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
        return;
    };

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
        return;
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
        return;
    };

    const contactChangeHandler = (e) => {
        setContact(e.target.value);
        return;
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
        return;
    };

    const confirmPasswordChangeHandler = (e) => {
        setConfirmPassword(e.target.value);
        return;
    };

    const handleClose = () => {
        setEmail('');
        setContact('');
        setErrorMsg('');
        setPassword('');
        setLastName('');
        setFirstName('');
        setShowError('');
        setShowModal(false);
        setConfirmPassword('');
    };

    const successModal = (
        <div className={classes.successModal}>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <h3>Account Created Successfully!</h3>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
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
                                        value={firstName}
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
                                        value={lastName}
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
                                value={email}
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
                                value={contact}
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
                                value={password}
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
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={confirmPasswordChangeHandler}
                            />
                        </div>

                        <button className="mt-3 btn btn-primary">Signup</button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default Signup;
