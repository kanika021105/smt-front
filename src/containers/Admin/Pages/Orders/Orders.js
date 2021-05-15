/*jshint esversion: 9 */

import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import {
    Form,
    Modal,
    InputGroup,
    FormControl,
    DropdownButton,
} from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import '../../../../sass/pages/admin/orders.scss';
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
        await Axios.delete(url);

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
            <Modal.Header closeButton>
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>
            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {editingOrder && (
                        <>
                            <div>
                                <InputGroup>
                                    <div className="pr-3">
                                        <label>OrderId</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {editingOrder.id}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>

                                    <div className="pl-3">
                                        <label>Api OrderId</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {editingOrder.apiOrderId ||
                                                    'Manual'}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <InputGroup className="mb-3">
                                    <div className="pr-3">
                                        <label>Order Type</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {editingOrder.type || 'Manual'}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <InputGroup className="mb-3">
                                    <div className="pr-3">
                                        <label>Service</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {getServiceTitle(
                                                    editingOrder.serviceId
                                                ) &&
                                                    getServiceTitle(
                                                        editingOrder.serviceId
                                                    )}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <InputGroup className="mb-3">
                                    <div className="pr-3">
                                        <label>User</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {getUserEmail(
                                                    editingOrder.userId
                                                ) &&
                                                    getUserEmail(
                                                        editingOrder.userId
                                                    )}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <InputGroup className="mb-2">
                                    <div className="pr-2">
                                        <label>Amount</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {editingOrder.charge || 0}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>

                                    <div className="pl-2">
                                        <label>Quantity</label>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                {editingOrder.quantity || 0}
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <InputGroup className="mb-2">
                                    <div className="pr-2">
                                        <label>Start Counter</label>
                                        <InputGroup.Prepend>
                                            <FormControl
                                                value={
                                                    editedStartCounter
                                                        ? editedStartCounter
                                                        : editingOrder.startCounter ||
                                                          ''
                                                }
                                                onChange={
                                                    startCounterChangeHandler
                                                }
                                            />
                                        </InputGroup.Prepend>
                                    </div>

                                    <div className="pl-2">
                                        <label>Remains</label>
                                        <InputGroup.Prepend>
                                            <FormControl
                                                value={
                                                    editedRemains
                                                        ? editedRemains
                                                        : editingOrder.remains ||
                                                          ''
                                                }
                                                onChange={remainChangeHandler}
                                            />
                                        </InputGroup.Prepend>
                                    </div>

                                    <div className="pl-2">
                                        <label>Status</label>
                                        <Form.Group>
                                            <Form.Control
                                                as="select"
                                                value={
                                                    editedStatus
                                                        ? editedStatus
                                                        : editingOrder.status ||
                                                          ''
                                                }
                                                onChange={statusChangeHandler}
                                            >
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="processing">
                                                    Processing
                                                </option>
                                                <option value="inprogress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                                <option value="partial">
                                                    Partial
                                                </option>
                                                <option value="cancelled">
                                                    Cancelled
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </InputGroup>
                            </div>

                            <div>
                                <div className="pl-2">
                                    <label>Link</label>
                                    <InputGroup.Prepend>
                                        <FormControl
                                            value={
                                                editedLink
                                                    ? editedLink
                                                    : editingOrder.link || ''
                                            }
                                            onChange={linkChangeHandler}
                                        />
                                    </InputGroup.Prepend>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={editingSubmitHandler}>
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

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
                                            <td>
                                                <button
                                                    className={
                                                        'btn btn-success btn-disabled'
                                                    }
                                                    disabled
                                                >
                                                    {order.status}
                                                </button>
                                            </td>
                                            <td>
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <DropdownButton
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
                                                    </DropdownButton>
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
