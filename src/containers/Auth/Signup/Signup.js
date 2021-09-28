/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../../../axiosIns';
import classes from './Signup.module.scss';
import Modal from '../../../components/UI/Modal/Modal';
import PageTitle from '../../../components/Extra/PageTitle';
// import SignUpImage from '../../../assets/img/signup.svg';

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

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const url = '/signup';
            await Axios.post(url, {
                ...userDetails,
            });

            setShowModal(true);
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setShowError(true);
        }
    };

    const successModal = (
        <Modal show={showModal} onClose={handleClose} hideButton centered>
            <div className={classes.successModal}>
                <div className="centered">
                    <img
                        className={classes.successModal__img}
                        src="/images/success.svg"
                        alt="successImage"
                    />
                </div>
                <h3 className={classes.successModal__heading}>
                    Congratulations!
                </h3>

                <p className={classes.successModal__paragraph}>
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
                        className={[
                            'btn btn-primary',
                            classes.successModal__btn,
                        ].join(' ')}
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
                            <input className={classes.input_field} type="text" placeholder="First Name" />
                            <input className={classes.input_field} type="text" placeholder="Last Name" />
                        </div>

                        <input className={classes.input_field} type="email" placeholder="Email" />
                        <input className={classes.input_field} type="password" placeholder="Password" />
                        <input className={classes.input_field} type="password" placeholder="Confirm Password" />
                        <button className={classes.submit_button} type="submit">Login</button>
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
