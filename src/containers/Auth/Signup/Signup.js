import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Axios from '../../../axiosIns';
import classes from './Signup.module.scss';
import SignUpImage from '../../../assets/img/signup.svg';

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
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Body>
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
            </Modal.Body>
        </Modal>
    );

    return (
        <>
            <PageTitle title="SignUp" />

            {successModal}

            <div className={classes.container}>
                <div className={classes.singup}>
                    <div className={classes.singup__form}>
                        <div className={classes.homeLink}>
                            <Link to="/">Home</Link>
                        </div>
                        <div className={classes.singup__form__line} />
                        <h2
                            className={[
                                classes.singup__form__heading,
                                showError ? 'u-mb-2' : 'u-mb-2',
                            ].join(' ')}
                        >
                            Sing-Up
                        </h2>

                        <h4
                            className={
                                showError
                                    ? classes.errorMsg
                                    : classes.errorHidden
                            }
                        >
                            {errorMsg}
                        </h4>

                        <form onSubmit={submitHandler}>
                            <div className={classes.formControl}>
                                <div className={classes.inputGroup}>
                                    <div className={classes.inputSection}>
                                        <label className={classes.label} htmlFor="fName">
                                            First Name
                                            <input
                                                className={showError && classes.invalid}
                                                type="text"
                                                id="fName"
                                                placeholder="Jhon"
                                                pattern="[a-z,A-Z]{1,}"
                                                title="Only alphabet allowed"
                                                value={userDetails.firstName}
                                                onChange={firstNameChangeHandler}
                                                spellCheck={false}
                                                minLength={1}
                                            />
                                        </label>
                                    </div>

                                    <div className={classes.inputSection}>
                                        <label className={classes.label} htmlFor="lName">
                                            Last Name
                                            <input
                                                id="lName"
                                                className={showError && classes.invalid}
                                                type="text"
                                                placeholder="Doe"
                                                pattern="[a-z,A-Z]{1,}"
                                                title="Only alphabet allowed"
                                                value={userDetails.lastName}
                                                onChange={lastNameChangeHandler}
                                                spellCheck={false}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className={classes.inputSection}>
                                    <label className={classes.label} htmlFor="email">
                                        Email
                                        <input
                                            id="email"
                                            className={showError && classes.invalid}
                                            type="email"
                                            placeholder="example@gmail.com"
                                            value={userDetails.email}
                                            onChange={emailChangeHandler}
                                            spellCheck={false}
                                        />
                                    </label>
                                </div>

                                <div className={classes.inputSection}>
                                    <label className={classes.label} htmlFor="contact">
                                        Contact
                                        <input
                                            id="contact"
                                            className={showError && classes.invalid}
                                            type="tel"
                                            placeholder="Contact"
                                            pattern="[0-9]{10,14}"
                                            title="Enter valid phone number"
                                            value={userDetails.contact}
                                            onChange={contactChangeHandler}
                                            spellCheck={false}
                                        />
                                    </label>
                                </div>

                                <div className={classes.inputGroup}>
                                    <div className={classes.inputSection}>
                                        <label className={classes.label} htmlFor="password">
                                            Password
                                            <input
                                                id="password"
                                                className={showError && classes.invalid}
                                                type="password"
                                                placeholder="Password"
                                                minLength={6}
                                                value={userDetails.password}
                                                onChange={passwordChangeHandler}
                                                spellCheck={false}
                                            />
                                        </label>
                                    </div>

                                    <div className={classes.inputSection}>
                                        <label className={classes.label} htmlFor="confirmPassword">
                                            Confirm Password
                                            <input
                                                className={showError && classes.invalid}
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={userDetails.confirmPassword}
                                                onChange={confirmPasswordChangeHandler}
                                                minLength={6}
                                                spellCheck={false}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.terms}>
                                <input
                                    className={showError && classes.invalid}
                                    type="checkbox"
                                    placeholder="Confirm Password"
                                    value={userDetails.confirmPassword}
                                    onChange={confirmPasswordChangeHandler}
                                    minLength={6}
                                    spellCheck={false}
                                />
                                I agree to all
                                {' '}
                                <Link to="/#">Terms</Link>
                                {' '}
                                &
                                {' '}
                                <Link to="/#">Policy</Link>
                                .
                            </div>

                            <div className={classes.singup__form__submitButton}>
                                <button type="submit">Sign-Up</button>
                            </div>
                            <p className={classes.singup__form__signupLink}>
                                Already singed up?
                                {' '}
                                <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>

                    <div className={classes.singup__image}>
                        <img src={SignUpImage} alt="Login" />
                        <h3 className={classes.singup__image__heading}>
                            Wanna grow on social Media?
                        </h3>
                        <p className={classes.singup__image__paragraph}>
                            Create an account and manage all your social media
                            growth. We provide all services you need to grow
                            your social media!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
