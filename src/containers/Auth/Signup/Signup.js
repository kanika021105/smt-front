import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../../../axiosIns';
import classes from './Signup.module.scss';
import Toast from '../../../components/UI/Toast/Toast';
import Modal from '../../../components/UI/Modal/Modal';
import PageTitle from '../../../components/Extra/PageTitle';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
    });

    const [showModal, setShowModal] = useState(false);

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

        setShowModal(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const url = '/signup';
            await Axios.post(url, {
                ...userDetails,
            });

            setShowModal(true);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    const successModal = (
        <Modal show={showModal} onClose={handleClose} hideButton centered>
            <div className={classes.modal_body}>
                <img
                    className={classes.success_img}
                    src="/images/success.svg"
                    alt="successImage"
                />

                <h3 className={classes.success_heading}>
                    Congratulations!
                </h3>

                <p className={classes.success_paragraph}>
                    You have successfully created your account! Please
                    {' '}
                    <Link
                        className={classes.successModal__link}
                        to="/login"
                    >
                        Login
                    </Link>
                    {' '}
                    to your your account to use our website.
                </p>

                <div className="centered">
                    <button
                        type="button"
                        className={classes.close_button}
                        onClick={handleClose}
                    >
                        Okay!
                    </button>
                </div>
            </div>
        </Modal>
    );

    return (
        <>
            <PageTitle title="SignUp" />
            {successModal}

            <div className={classes.signup}>
                <div className={classes.form_container}>
                    <h2 className={classes.signup_header}>
                        SignUp
                    </h2>

                    <form className={classes.signup_form} onSubmit={submitHandler}>
                        <div className={classes.input_group}>
                            <input
                                className={classes.input_field}
                                type="text"
                                value={userDetails.firstName}
                                placeholder="First Name"
                                onChange={firstNameChangeHandler}
                            />
                            <input
                                className={classes.input_field}
                                type="text"
                                value={userDetails.lastName}
                                placeholder="Last Name"
                                onChange={lastNameChangeHandler}
                            />
                        </div>

                        <input
                            className={classes.input_field}
                            type="email"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={emailChangeHandler}
                        />
                        <input
                            className={classes.input_field}
                            type="password"
                            placeholder="Password"
                            value={userDetails.password}
                            onChange={passwordChangeHandler}
                        />
                        <input
                            className={classes.input_field}
                            type="password"
                            placeholder="Confirm Password"
                            value={userDetails.confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                        />
                        <button className={classes.submit_button} type="submit">SignUp</button>
                    </form>

                    <div className={classes.singup_form_footer}>
                        Already user?
                        {' '}
                        <Link to="/login">Login</Link>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Signup;
