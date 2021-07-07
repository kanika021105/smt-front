import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

function Active({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button--active']} ${className}`}
            disabled
        >
            Active
        </button>
    );
}

function Disable({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button--disable']} ${className}`}
            disabled
        >
            Disable
        </button>
    );
}

function Success({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button--success']} ${className}`}
            disabled
        >
            Success
        </button>
    );
}

function Failed({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button--failed']} ${className}`}
            disabled
        >
            Failed
        </button>
    );
}

function Edit({ className, onClick, value }) {
    return (
        <button
            type="button"
            className={`${classes['button--edit']} ${className}`}
            onClick={onClick}
            value={value}
        >
            Edit
        </button>
    );
}

function Delete({ className, onClick, value }) {
    return (
        <button
            type="button"
            className={`${classes['button--delete']} ${className}`}
            onClick={onClick}
            value={value}
        >
            Delete
        </button>
    );
}

function OrderPending({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--pending']} ${className}`}
        >
            Pending
        </button>
    );
}

function OrderProcessing({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--processing']} ${className}`}
        >
            Processing
        </button>
    );
}

function OrderInprogress({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--inprogress']} ${className}`}
        >
            InProgress
        </button>
    );
}

function OrderCompleted({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--completed']} ${className}`}
        >
            Completed
        </button>
    );
}

function OrderCancelled({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--cancelled']} ${className}`}
        >
            Cancelled
        </button>
    );
}

function OrderPartial({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--partial']} ${className}`}
        >
            Partial
        </button>
    );
}

function OrderRefunded({ className }) {
    return (
        <button
            type="button"
            className={`${classes['button__order--refunded']} ${className}`}
        >
            Refunded
        </button>
    );
}

function ModalPrimary({
    children, className, type, onClick,
}) {
    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={`${classes['button__modal--primary']} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function ModalSecondary({
    children, className, type, onClick,
}) {
    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={`${classes['button__modal--secondary']} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

Active.propTypes = {
    className: PropTypes.string,
};

Disable.propTypes = {
    className: PropTypes.string,
};

Success.propTypes = {
    className: PropTypes.string,
};

Failed.propTypes = {
    className: PropTypes.string,
};

Edit.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Delete.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

OrderPending.propTypes = {
    className: PropTypes.string,
};

OrderProcessing.propTypes = {
    className: PropTypes.string,
};

OrderInprogress.propTypes = {
    className: PropTypes.string,
};

OrderCompleted.propTypes = {
    className: PropTypes.string,
};

OrderCancelled.propTypes = {
    className: PropTypes.string,
};

OrderPartial.propTypes = {
    className: PropTypes.string,
};

OrderRefunded.propTypes = {
    className: PropTypes.string,
};

ModalPrimary.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

ModalSecondary.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

const Button = {
    Active,
    Disable,
    Success,
    Failed,
    Edit,
    Delete,
    OrderPending,
    OrderProcessing,
    OrderInprogress,
    OrderCompleted,
    OrderCancelled,
    OrderPartial,
    OrderRefunded,
    ModalPrimary,
    ModalSecondary,
};

export default Button;
