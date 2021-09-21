import React, { useContext, useEffect, useState } from 'react';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';

import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import Select from '../../../../components/UI/Select/Select';
import PageTitle from '../../../../components/Extra/PageTitle';
import CustomModal from '../../../../components/UI/Modal/Modal';
import Loading from '../../../../components/UI/Loading/Loading';
import DropDown from '../../../../components/UI/Dropdown/Dropdown';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import classes from './orders.module.scss';

const Orders = () => {
    const [clients, setClients] = useState();
    const [orders, setOrders] = useState();
    const [services, setServices] = useState();

    const [editingOrder, setEditingOrder] = useState({
        id: '',
        uid: '',
        apiOrderId: '',
        serviceId: '',
        orderType: '',
        userId: '',
        amount: '',
        quantity: '',
        startCounter: '',
        remains: '',
        link: '',
        status: '',
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { darkTheme } = useContext(Theme);

    async function getData(url) {
        const { data } = await Axios.get(url);
        return data;
    }

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/orders';
        Promise.resolve(getData(url))
            .then((data) => {
                setIsLoading(false);

                setClients(data.clients);
                setServices(data.services);
                setOrders(data.orders);
            }).catch((err) => {
                setIsLoading(false);
                return Toast.failed(err.response.message
                    || 'Something went wrong!');
            });
    }, []);

    function getServiceTitle(id) {
        if (services) {
            const details = services.filter((service) => service.id === id);
            if (details[0]) return details[0].title;
            return '';
        }
        return '';
    }

    function getUserEmail(id) {
        if (clients) {
            clients.map((client) => {
                if (client.id === id) return client.email;
                return null;
            });
        }
        return null;
    }

    async function deleteButtonHandler(e) {
        const uid = e.target.value;
        const url = `/admin/order/delete/${uid}`;
        const newList = await orders.filter((order) => order.uid !== uid);

        try {
            await Axios.delete(url);
            setOrders([...newList]);
            return Toast.success(`Order id "${uid}" deleted!`);
        } catch (err) {
            return Toast.failed(err.response.message);
        }
    }

    function editButtonHandler(e) {
        setShowEditModal(true);

        if (orders) {
            const uid = e.target.value;
            const orderDetails = orders.filter((order) => order.uid === uid);
            return setEditingOrder((preState) => ({ ...preState, ...orderDetails[0] }));
        }
        return Toast.failed('Something went wrong!');
    }

    function startCounterChangeHandler(e) {
        setEditingOrder((preState) => ({
            ...preState,
            startCounter: e.target.value,
        }));
    }

    function remainChangeHandler(e) {
        setEditingOrder((preState) => ({
            ...preState,
            remains: e.target.value,
        }));
    }

    function statusChangeHandler(e) {
        setEditingOrder((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    }

    function linkChangeHandler(e) {
        setEditingOrder((preState) => ({
            ...preState,
            link: e.target.value,
        }));
    }

    function handleClose() {
        setShowEditModal(false);
    }

    async function editingSubmitHandler(e) {
        e.preventDefault();

        const { uid } = editingOrder;
        const newList = orders.filter((order) => order.uid !== uid);
        const url = `/admin/order/edit/${uid}`;

        try {
            const { data } = await Axios.patch(url, {
                link: editingOrder.link,
                startCounter: editingOrder.startCounter,
                remains: editingOrder.remains,
                status: editingOrder.status,
            });

            handleClose();
            setOrders(() => [{ ...data.updatedOrder }, ...newList]);
            return Toast.success(`Order id "${uid}"`);
        } catch (err) {
            return Toast.failed(err.response.data.message);
        }
    }

    const editModal = (
        <CustomModal
            show={showEditModal}
            onClose={handleClose}
            title="Edit order"
        >
            <form onSubmit={editingSubmitHandler}>
                {editingOrder && (
                    <>
                        <InputGroup>
                            <Input
                                label="Order Id"
                                value={editingOrder.id}
                                disabled
                            />

                            <Input
                                label="API Order Id"
                                value={editingOrder.apiOrderId || 'Manual'}
                                disabled
                            />
                        </InputGroup>

                        <Input
                            label="Service"
                            value={getServiceTitle(editingOrder.serviceId) || ''}
                            disabled
                        />

                        <InputGroup>
                            <Input
                                label="Order Type"
                                value={editingOrder.type || 'Manual'}
                                disabled
                            />

                            <Input
                                label="User"
                                value={getUserEmail(editingOrder.clientId) || ''}
                                disabled
                            />
                        </InputGroup>

                        <InputGroup>
                            <Input
                                label="Amount"
                                value={editingOrder.charge || 0}
                                disabled
                            />

                            <Input
                                label="Quantity"
                                value={editingOrder.quantity || 0}
                                disabled
                            />
                        </InputGroup>

                        <InputGroup>
                            <Input
                                label="Start Counter"
                                type="number"
                                value={editingOrder.startCounter || 0}
                                onChange={startCounterChangeHandler}
                            />

                            <Input
                                label="Remains"
                                type="number"
                                value={editingOrder.remains || 0}
                                onChange={remainChangeHandler}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Input
                                label="Link"
                                type="url"
                                value={editingOrder.link || ''}
                                onChange={linkChangeHandler}
                            />

                            <Select
                                label="Status"
                                value={editingOrder.status}
                                onChange={statusChangeHandler}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="partial">Partial</option>
                                <option value="canceled">Canceled</option>
                            </Select>
                        </InputGroup>
                    </>
                )}
            </form>
        </CustomModal>
    );

    function getStatus(status) {
        switch (status) {
            case 'pending':
                return <Button.OrderPending />;

            case 'processing':
                return <Button.OrderProcessing />;

            case 'inprogress':
                return <Button.OrderInprogress />;

            case 'completed':
                return <Button.OrderCompleted />;

            case 'canceled':
                return <Button.OrderCancelled />;

            case 'partial':
                return <Button.OrderPartial />;

            case 'refunded':
                return <Button.OrderRefunded />;

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    const ordersTable = orders && orders.length <= 0 ? (
        <DataNotFound message="Please wait for clients to create some order." />
    ) : (
        <Card>
            <Table>
                <THead>
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
                </THead>

                <TBody>
                    {orders && orders.map((order) => (
                        <tr key={order.uid}>
                            <td>{order.id}</td>
                            <td>
                                {getServiceTitle(order.serviceId)
                                    && getServiceTitle(order.serviceId).length > 30
                                    ? `${order.serviceId} - ${getServiceTitle(order.serviceId).slice(0, 30)}...`
                                    : `${order.serviceId} - ${getServiceTitle(order.serviceId)}`}
                            </td>
                            <td>
                                {order.link.length > 20 ? `${order.link.slice(0, 20)}...` : order.link}
                            </td>
                            <td>{order.charge}</td>
                            <td>{order.quantity}</td>
                            <td>{order.startCounter}</td>
                            <td>{getStatus(order.status)}</td>
                            <td>
                                <DropDown>
                                    <ul>
                                        <li>
                                            <Button.Edit
                                                value={order.uid}
                                                onClick={editButtonHandler}
                                            />
                                        </li>

                                        <li>
                                            <Button.Delete
                                                value={order.uid}
                                                onClick={deleteButtonHandler}
                                            />
                                        </li>
                                    </ul>
                                </DropDown>
                                {/* <IconContext.Provider value={{ style: {
                                     fontSize: '30px', padding: 'auto' } }}>
                                    <div className="dropdown">
                                        <span
                                            id="option"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <BsThreeDotsVertical />
                                        </span>

                                        <ul className="dropdown-menu" aria-labelledby="option">
                                            <li>
                                                <Button.Edit
                                                    value={order.uid}
                                                    onClick={editButtonHandler}
                                                />
                                            </li>

                                            <li>
                                                <Button.Delete
                                                    value={order.uid}
                                                    onClick={deleteButtonHandler}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </IconContext.Provider> */}
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    return (
        <>
            <PageTitle title="Orders" />
            <Loading show={isLoading} />
            {editModal}

            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className={classes.Orders}>
                    <PageHeader header="Orders" />

                    {ordersTable}
                </div>
            </div>
        </>
    );
};

export default Orders;
