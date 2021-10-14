import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiEdit } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { IoMdSync } from 'react-icons/io';
import { MdAttachMoney } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineUnorderedList } from 'react-icons/ai';
// TODO remove bootstrap usage from this file
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Axios from '../../../../axiosIns';

import Card from '../../../../components/UI/Card/Card';
import Modal from '../../../../components/UI/Modal/Modal';
import Toast from '../../../../components/UI/Toast/Toast';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Select from '../../../../components/UI/Select/Select';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import './apiProvider.scss';

function ApiProvider() {
    const history = useHistory();

    const [apiProviders, setApiProviders] = useState();
    const [addApiDetails, setAddApiDetails] = useState({
        name: '',
        url: '',
        key: '',
        status: 'active',
    });
    const [editingApiDetails, setEditingApiDetails] = useState({
        id: '',
        name: '',
        url: '',
        key: '',
        status: 'active',
    });
    const [syncData, setSyncData] = useState({
        profitMargin: '',
        api: {
            id: '',
            name: '',
            url: '',
            key: '',
        },
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/admin/api-provider';
            const { data } = await Axios.get(url);
            setApiProviders(data.apiProviders);
            return setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    function handleAddButtonClick() {
        setShowAddModal(true);
    }

    function nameChangeHandler(e) {
        setAddApiDetails((preState) => ({ ...preState, name: e.target.value }));
    }

    function urlChangeHandler(e) {
        setAddApiDetails((preState) => ({ ...preState, url: e.target.value }));
    }

    function apiKeyChangeHandler(e) {
        setAddApiDetails((preState) => ({ ...preState, key: e.target.value }));
    }

    function statusChangeHandler(e) {
        setAddApiDetails((preState) => ({ ...preState, status: e.target.value }));
    }

    async function addFormSubmitHandler(e) {
        e.preventDefault();

        try {
            const url = '/admin/api-provider/add';
            const { data } = await Axios.post(url, { ...addApiDetails });

            setApiProviders((preState) => [...preState, { ...data.createdApi }]);
            setShowAddModal(false);
            return Toast.success('Api added successfully!');
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    function handleBackdropClick() {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowSyncModal(false);
    }

    const addModal = (
        <Modal show={showAddModal} onClose={handleBackdropClick} title="Add API Provider">
            <form onSubmit={addFormSubmitHandler}>
                <Input label="Name" placeholder="Name" type="text" value={addApiDetails.name} onChange={nameChangeHandler} />
                <Input label="URL" placeholder="API URL" type="url" value={addApiDetails.url} onChange={urlChangeHandler} />
                <Input label="API Key" placeholder="API KEY" type="text" value={addApiDetails.key} onChange={apiKeyChangeHandler} />
                <Select label="Status" value={addApiDetails.status} onChange={statusChangeHandler}>
                    <option key="active" value="active"> Active</option>
                    <option key="disabled" value="disabled">Disable</option>
                </Select>
            </form>
        </Modal>
    );

    async function editButtonClickHandler(id) {
        setShowEditModal(true);

        const apiProvider = await apiProviders.find((_provider) => _provider.id === id);
        setEditingApiDetails(() => ({
            id: apiProvider.id,
            name: apiProvider.name,
            url: apiProvider.url,
            key: apiProvider.key,
            status: apiProvider.status,
        }));
    }

    function editingNameChangeHandler(e) {
        setEditingApiDetails((_preState) => ({ ..._preState, name: e.target.value }));
    }

    function editingUrlChangeHandler(e) {
        setEditingApiDetails((_preState) => ({ ..._preState, url: e.target.value }));
    }

    function editingKeyChangeHandler(e) {
        setEditingApiDetails((_preState) => ({ ..._preState, key: e.target.value }));
    }

    function editingStatusChangeHandler(e) {
        setEditingApiDetails((_preState) => ({ ..._preState, status: e.target.value }));
    }

    async function editFormSubmitHandler(e) {
        e.preventDefault();

        try {
            const url = '/admin/api-provider/update';
            const { data } = await Axios.post(url, { ...addApiDetails });
            setApiProviders((_preState) => [..._preState, { ...data.createdApi }]);
            setShowAddModal(false);

            return Toast.success('Api details updated!');
        } catch (err) {
            return Toast.failed(err.response.data.message);
        }
    }

    const editModal = (
        <Modal show={showEditModal} onClose={handleBackdropClick} title="Edit API Details">
            <form onSubmit={editFormSubmitHandler}>
                <Input label="Name" placeholder="Name" type="text" value={editingApiDetails.name} onChange={editingNameChangeHandler} />
                <Input label="URL" placeholder="API URL" type="url" value={editingApiDetails.url} onChange={editingUrlChangeHandler} />
                <Input label="API Key" placeholder="API KEY" type="text" value={editingApiDetails.key} onChange={editingKeyChangeHandler} />
                <Select label="Status" value={editingApiDetails.status} onChange={editingStatusChangeHandler}>
                    <option key="active" value="active">Active</option>
                    <option key="disabled" value="disabled">Disable</option>
                </Select>
            </form>
        </Modal>
    );

    async function syncClickHandler(id) {
        setShowSyncModal(true);

        const apiProvider = await apiProviders.find((_provider) => _provider.id === id);
        setSyncData((preState) => ({
            ...preState,
            api: {
                id,
                name: apiProvider.name,
                url: apiProvider.url,
                key: apiProvider.key,
            },
        }));
    }

    function profitMarginChangeHandler(e) {
        setSyncData((preState) => ({ ...preState, profitMargin: e.target.value }));
    }

    function percentageCount() {
        const countList = [];
        let count = 0;

        while (count <= 500) {
            countList.push(count);
            count += 1;
        }

        return countList;
    }

    async function syncFormSubmitHandler(e) {
        e.preventDefault();
        const { id } = syncData.api;

        try {
            const url = `/admin/api-provider/sync_services/${id}`;
            await Axios.post(url, syncData.profitMargin);
            Toast.success('Services Updated!');
        } catch (err) {
            Toast.failed(err.response.message || 'Something went wrong!');
        }
    }

    const counter = percentageCount();
    const syncModal = (
        <Modal show={showSyncModal} onClose={handleBackdropClick} title="Sync Services" onSubmit={syncFormSubmitHandler}>
            <form onSubmit={syncFormSubmitHandler}>
                <Input label="Name" value={syncData.api.name} placeholder="Name" disabled />
                <Input label="URL" value={syncData.api.url} placeholder="URL" disabled />
                <Input label="API Key" value={syncData.api.key} placeholder="API KEY" disabled />
                <Select label="Percentage Increase (Profit Margin)" value={syncData.profitMargin} onChange={profitMarginChangeHandler}>
                    {counter && counter.map((count) => (<option key={count} value={count}>{`${count}%`}</option>))}
                </Select>
            </form>
        </Modal>
    );

    async function updateBalanceHandler(id) {
        try {
            const url = `/admin/api-provider/balance/${id}`;
            const { data } = await Axios.get(url);
            const newList = await apiProviders.filter((provider) => provider.id !== id);
            const updatedList = [{ ...data.updated }, ...newList]
                .sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    } if (b.id > a.id) {
                        return -1;
                    }
                    return 0;
                });
            setApiProviders(() => [...updatedList]);
            return Toast.success('Balance updated!');
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    async function serviceListHandler(id) {
        const path = `api-provider/${id}/services`;
        history.push(path);
    }

    async function deleteHandler(id) {
        const newList = await apiProviders.filter((provider) => provider.id !== id);

        try {
            const url = `/admin/api-provider/delete/${id}`;
            await Axios.delete(url);
            setApiProviders(() => [...newList]);

            Toast.warning(`API Provider "${id} deleted!"`);
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    function checkStatus(status) {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Invalid status received!');
        }
    }

    const apiProviderTable = (
        <Card>
            <Table>
                <THead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </THead>

                <TBody>
                    {apiProviders && apiProviders.map((apiProvider) => (
                        <tr key={apiProvider.id}>
                            <td>{apiProvider.id}</td>
                            <td>{apiProvider.name}</td>
                            <td>{apiProvider.balance}</td>
                            <td>{checkStatus(apiProvider.status)}</td>
                            <td>
                                <>
                                    <OverlayTrigger
                                        key="balance"
                                        placement="top"
                                        overlay={(<Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>Update Balance</Tooltip>)}
                                    >
                                        <button type="button" value={apiProvider.id} variant="none" className="apiActionButton apiActionButtonFirst" onClick={() => updateBalanceHandler(apiProvider.id)}>
                                            <MdAttachMoney style={{ fontSize: '30px', padding: 'auto' }} />
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="sync"
                                        placement="top"
                                        overlay={(<Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>Sync Services</Tooltip>)}
                                    >
                                        <button type="button" variant="none" className="apiActionButton" onClick={() => syncClickHandler(apiProvider.id)}>
                                            <IoMdSync style={{ fontSize: '30px', padding: 'auto' }} />
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="service"
                                        placement="top"
                                        overlay={(<Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>Service List via API</Tooltip>)}
                                    >
                                        <button type="button" variant="none" className="apiActionButton" onClick={() => serviceListHandler(apiProvider.id)}>
                                            <AiOutlineUnorderedList style={{ fontSize: '30px', padding: 'auto' }} />
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="edit"
                                        placement="top"
                                        overlay={(<Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>Edit API</Tooltip>)}
                                    >
                                        <button
                                            type="button"
                                            variant="none"
                                            className="apiActionButton"
                                            onClick={() => editButtonClickHandler(apiProvider.id)}
                                        >
                                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                                <FiEdit />
                                            </IconContext.Provider>
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="delete"
                                        placement="top"
                                        overlay={(<Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>Delete API</Tooltip>)}
                                    >
                                        <button
                                            type="button"
                                            variant="none"
                                            className="apiActionButton apiActionButtonLast"
                                            onClick={() => deleteHandler(apiProvider.id)}
                                        >
                                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                                <RiDeleteBin6Line />
                                            </IconContext.Provider>
                                        </button>
                                    </OverlayTrigger>
                                </>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    const isEmptyApiProvider = apiProviders && apiProviders.length <= 0;
    const toShow = isEmptyApiProvider ? (<DataNotFound message="No Api providers found, add one now." />) : apiProviderTable;

    return (
        <>
            <PageTitle title="Api Provider" />
            <Loading show={isLoading} />

            {addModal}
            {editModal}
            {syncModal}

            <PageContainer>

                <PageHeader header="Api Providers">
                    <button type="button" className="add-button" onClick={handleAddButtonClick}> + </button>
                </PageHeader>

                {toShow}
            </PageContainer>
        </>
    );
}

export default ApiProvider;
