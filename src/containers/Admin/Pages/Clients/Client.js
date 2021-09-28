import React, { useContext, useEffect, useState } from 'react';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';

import Card from '../../../../components/UI/Card/Card';
import Modal from '../../../../components/UI/Modal/Modal';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import Select from '../../../../components/UI/Select/Select';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import './clients.scss';

const Clients = () => {
    const [clients, setClients] = useState();
    const [isLoading, setIsLoading] = useState(false);
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

    const { darkTheme } = useContext(Theme);

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
        <Modal
            show={showEditModal}
            onClose={handleClose}
            title="Edit User"
            onSubmit={eSubmitHandler}
        >
            <form onSubmit={eSubmitHandler}>
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
                return Toast.failed('Something went wrong!');
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
                                <Dropdown id={client.id}>
                                    <ul>
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
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    const isClientsEmpty = clients && clients.length <= 0;
    const toShow = isClientsEmpty ? <DataNotFound /> : clientDataTable;

    return (
        <>
            <PageTitle title="Clients" />
            <Loading show={isLoading} />

            {editModal}
            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className="Clients">
                    <PageHeader header="Clients" />

                    {toShow}
                </div>
            </div>
        </>
    );
};

export default Clients;
