import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';

import Axios from '../../../../axiosIns';
import Context from '../../../../store/context';
import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import Select from '../../../../components/UI/Select/Select';
import Loading from '../../../../components/UI/Loading/Loading';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import 'bootstrap/js/dist/dropdown';
import './clients.scss';

const Clients = () => {
    const [clients, setClients] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    const [editingUserDetails, setEditingUserDetails] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        balance: '',
        contact: '',
        role: '',
        status: '',
    });

    const { websiteName } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/clients';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                setClients(res.data.clients);
            })
            .catch((err) => {
                setIsLoading(false);
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

    const editButtonHandler = async (e) => {
        const id = e.target.value;
        const user = await clients.filter((client) => client.id === id);

        setEditingUserDetails({ ...user[0] });
        setShowEditModal(true);
    };

    const eFNChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, firstName: e.target.value }));
    };

    const eLNChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, lastName: e.target.value }));
    };

    const eEmailChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, email: e.target.value }));
    };

    const eBalanceChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, balance: e.target.value }));
    };

    const eContactChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, contact: e.target.value }));
    };

    const eRoleChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, role: e.target.value }));
    };

    const eStatusChangeHandler = (e) => {
        setEditingUserDetails((preState) => ({ ...preState, status: e.target.value }));
    };

    const handleClose = () => {
        setEditingUserDetails({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            balance: 0,
            contact: '',
            role: '',
            status: '',
        });

        setShowEditModal(false);
    };

    const eSubmitHandler = async (e) => {
        e.preventDefault();

        const { id } = editingUserDetails;
        const newList = clients.filter((user) => user.id !== id);
        const userData = { ...editingUserDetails };
        try {
            const url = `/admin/client/update/${id}`;
            await Axios.patch(url, { ...userData });
            setClients([{ ...userData }, ...newList]);

            handleClose();
            Toast.success(`User "${id}" updated!`);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update user!');
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <form onSubmit={eSubmitHandler}>
                <Modal.Body>
                    <InputGroup>
                        <Input
                            label="First Name"
                            placeholder="Jhon"
                            type="text"
                            value={editingUserDetails.fName}
                            onChange={eFNChangeHandler}
                        />

                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            type="text"
                            value={editingUserDetails.lName}
                            onChange={eLNChangeHandler}
                        />
                    </InputGroup>

                    <Input
                        label="Email"
                        placeholder="example@example.com"
                        type="email"
                        value={editingUserDetails.email}
                        onChange={eEmailChangeHandler}
                    />

                    <InputGroup>
                        <Input
                            label="Balance"
                            placeholder="Balance"
                            type="number"
                            value={editingUserDetails.balance}
                            onChange={eBalanceChangeHandler}
                        />

                        <Input
                            label="Contact"
                            placeholder="Contact"
                            type="number"
                            value={editingUserDetails.contact}
                            onChange={eContactChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Select
                            label="Role"
                            value={editingUserDetails.role}
                            onChange={eRoleChangeHandler}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>

                        <Select
                            label="Status"
                            value={editingUserDetails.status}
                            onChange={eStatusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>
                    </InputGroup>

                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleClose}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary type="submit">
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const id = e.target.value;
        const newList = clients.filter((user) => user.id !== +id);

        try {
            const url = `/admin/client/delete/${id}`;
            await Axios.delete(url);
            setClients([...newList]);
            Toast.success(`User "${id} deleted!"`);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to delete user!');
        }
    };

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                break;
        }
    };

    const clientDataTable = (
        <Card>
            <Table className="table">
                <THead>
                    <tr>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                </THead>

                <TBody>
                    {clients && clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.email}</td>
                            <td>
                                {client.f_name}
                                {client.l_name}
                            </td>
                            <td>{client.role}</td>
                            <td>{client.balance}</td>
                            <td>{checkStatus(client.status)}</td>
                            <td>
                                <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                    <div className="dropdown ">
                                        <span
                                            id="option"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <BsThreeDotsVertical />
                                        </span>
                                        <ul className="dropdown-menu" aria-labelledby="options">
                                            <li>
                                                <Button.Edit
                                                    value={client.id}
                                                    onClick={editButtonHandler}
                                                />
                                            </li>

                                            <li>
                                                <Button.Delete
                                                    value={client.id}
                                                    onClick={deleteButtonHandler}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    const isClientsEmpty = clients && clients.length <= 0;
    const toShow = isClientsEmpty ? <DataNotFound /> : clientDataTable;

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    Clients -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {editModal}
            <Loading show={isLoading} />

            <div className="container">
                <div className="Clients">
                    <h2 className="pageTitle">
                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                            <VscListSelection />
                        </IconContext.Provider>
                        Clients
                    </h2>
                    {toShow}
                </div>
            </div>
        </>
    );
};

export default Clients;
