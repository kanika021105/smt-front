/*jshint esversion: 9 */

import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { Modal } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/orders.scss';
import 'bootstrap/js/dist/dropdown';
import Card from '../../../../components/UI/Card/Card';

const Orders = () => {
    const [users, setUsers] = useState();
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const [editingOrder, setEditingOrder] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    const [editedLink, setEditedLink] = useState();
    const [editedStatus, setEditedStatus] = useState();
    const [editedRemains, setEditedRemains] = useState();
    const [editedStartCounter, setEditedStartCounter] = useState();

    //
    useEffect(() => {
        let url = '/admin/orders';

        Axios.get(url)
            .then((res) => {
                let { data } = res;

                if (data) {
                    setUsers(data.users);
                    setServices(data.services);
                    setOrders(data.orders.reverse());
                }
            })
            .catch((err) => {
                console.log(err.error);
            });
    }, []);

    //
    const editButtonHandler = (e) => {
        setShowEditModal(true);
        let orderId = e.target.value;

        if (orders) {
            let order = orders.filter((order) => +order.id === +orderId);
            if (order) setEditingOrder(order[0]);

            setEditedLink(order[0].link);
            setEditedStatus(order[0].status);
            setEditedRemains(order[0].remains);
            setEditedStartCounter(order[0].startCounter);
        }
    };

    //
    const deleteButtonHandler = async (e) => {
        const id = e.target.value;

        const url = `/admin/order/delete/${id}`;
        try {
            let res = await Axios.delete(url);
            console.log(res);
        } catch (err) {
            console.log(err.response);
        }

        const newList = orders.filter((order) => order.id !== +id);
        setOrders([...newList]);
        return;
    };

    //
    let getServiceTitle = (id) => {
        if (services) {
            let service = services.filter((service) => service.id === id);

            if (service[0]) return service[0].title;
            return null;
        }
        return null;
    };

    //
    let getUserEmail = (id) => {
        if (users) {
            let user = users.filter((user) => user.id === id);

            if (user[0]) return user[0].email;
            return null;
        }
        return null;
    };

    //
    // const backdropClickHandler = () => {
    //     setEditedLink('');
    //     setEditedStatus('');
    //     setEditedRemains('');
    //     setEditedStartCounter('');

    //     return setShowEditModal(false);
    // };

    const startCounterChangeHandler = (e) => {
        setEditedStartCounter(e.target.value);
        return;
    };

    const remainChangeHandler = (e) => {
        setEditedRemains(e.target.value);
        return;
    };

    const statusChangeHandler = (e) => {
        setEditedStatus(e.target.value);
        return;
    };

    const linkChangeHandler = (e) => {
        setEditedLink(e.target.value);
        return;
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();

        let orderId = editingOrder.id;
        let url = `/admin/order/edit/${orderId}`;
        let editingData = {
            status: editedStatus,
            link: editedLink,
            remains: editedRemains,
            startCounter: editedStartCounter,
        };

        let newList = orders.filter((order) => order.id !== editingOrder.id);
        let { data } = await Axios.patch(url, editingData);

        if (data.status === 'success') {
            setOrders((preState) => [
                { ...editingOrder, ...editingData },
                ...newList,
            ]);

            handleClose();
            return;
        }
        return;
    };

    const handleClose = () => {
        setEditedLink('');
        setEditedStatus('');
        setEditedRemains('');
        setEditedStartCounter('');

        setShowEditModal(false);
        return;
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel>
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {editingOrder && (
                        <>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label">
                                        OrderId
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.id}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">
                                        Api OrderId
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={
                                            editingOrder.apiOrderId || 'Manual'
                                        }
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input__label">Service</label>
                                <input
                                    className="input input--disabled"
                                    value={
                                        getServiceTitle(
                                            editingOrder.serviceId
                                        ) || ''
                                    }
                                    disabled
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label ">
                                        Order Type
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.type || 'Manual'}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">User</label>
                                    <input
                                        className="input input--disabled"
                                        value={
                                            getUserEmail(editingOrder.userId) ||
                                            ''
                                        }
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="input__label">
                                        Amount
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.charge || 0}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="input__label">
                                        Quantity
                                    </label>
                                    <input
                                        className="input input--disabled"
                                        value={editingOrder.quantity || 0}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <label className="input__label">
                                        Start Counter
                                    </label>
                                    <input
                                        className="input"
                                        value={editedStartCounter || ''}
                                        onChange={startCounterChangeHandler}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="input__label">
                                        Remains
                                    </label>
                                    <input
                                        className="input"
                                        value={editedRemains || ''}
                                        onChange={remainChangeHandler}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="input__label">
                                        Status
                                    </label>
                                    <select
                                        className="select"
                                        value={editedStatus || ''}
                                        onChange={statusChangeHandler}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">
                                            Processing
                                        </option>
                                        <option value="inprogress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                        <option value="partial">Partial</option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="input__label">Link</label>
                                <input
                                    className="input"
                                    value={editedLink || ''}
                                    onChange={linkChangeHandler}
                                />
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={editingSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const getStatus = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <button className={'btn btn-pending btn-disabled'} disabled>
                        {status}
                    </button>
                );
            case 'processing':
                return (
                    <button
                        className={'btn btn-processing btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'inprogress':
                return (
                    <button
                        className={'btn btn-inprogress btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'completed':
                return (
                    <button
                        className={'btn btn-completed btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'cancelled':
                return (
                    <button
                        className={'btn btn-cancelled btn-disabled'}
                        disabled
                    >
                        {status}
                    </button>
                );

            case 'partial':
                return (
                    <button className={'btn btn-partial btn-disabled'} disabled>
                        {status}
                    </button>
                );

            default:
                break;
        }
    };

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Orders - SMT Panel</title>
            </Helmet>

            {editModal}

            <div className="container">
                <div className="Orders">
                    <h2 className="pageTitle">
                        <IconContext.Provider
                            value={{
                                style: {
                                    fontSize: '30px',
                                },
                            }}
                        >
                            <VscListSelection />
                        </IconContext.Provider>{' '}
                        Orders
                    </h2>
                    <Card>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service</th>
                                    <th>Link</th>
                                    <th>Charge</th>
                                    <th>QTY</th>
                                    <th>Start Counter</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>
                                                {getServiceTitle(
                                                    order.serviceId
                                                ) &&
                                                getServiceTitle(order.serviceId)
                                                    .length > 30
                                                    ? order.serviceId +
                                                      '- ' +
                                                      getServiceTitle(
                                                          order.serviceId
                                                      ).slice(0, 30) +
                                                      '...'
                                                    : order.serviceId +
                                                      '- ' +
                                                      getServiceTitle(
                                                          order.serviceId
                                                      )}
                                            </td>
                                            <td>
                                                {order.link.length > 20
                                                    ? order.link.slice(0, 20) +
                                                      '...'
                                                    : order.link}
                                            </td>
                                            <td>{order.charge}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.startCounter}</td>
                                            <td>{getStatus(order.status)}</td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <div className="dropdown ">
                                                        <span
                                                            id="option"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <BsThreeDotsVertical />
                                                        </span>
                                                        <ul
                                                            className="dropdown-menu"
                                                            aria-labelledby="option"
                                                        >
                                                            <li>
                                                                <button
                                                                    className="btn btn-edit"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    value={
                                                                        order.id
                                                                    }
                                                                    onClick={
                                                                        editButtonHandler
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="btn btn-delete"
                                                                    style={{
                                                                        width: '100%',
                                                                    }}
                                                                    value={
                                                                        order.id
                                                                    }
                                                                    onClick={
                                                                        deleteButtonHandler
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    {/* <DropdownButton
                                                        className="dropdownButton"
                                                        id="dropdown-item-button"
                                                        title={
                                                            <BsThreeDotsVertical />
                                                        }
                                                    >
                                                        <div>
                                                            <button
                                                                className="btn btn-info"
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                value={order.id}
                                                                onClick={
                                                                    editButtonHandler
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-danger"
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                                value={order.id}
                                                                onClick={
                                                                    deleteButtonHandler
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </DropdownButton> */}
                                                </IconContext.Provider>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Orders;
