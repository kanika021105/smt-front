// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { FiEdit } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { IoMdSync } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';

import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import './apiProvider.scss';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

const ApiProvider = () => {
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
            name: '',
            url: '',
            key: '',
        },
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);
    // const [showError, setShowError] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        Axios.get('/admin/api-provider')
            .then((res) => {
                const { data } = res;
                setApiProviders(data.apiProviders);

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.data.message);
            });
    }, []);

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const nameChangeHandler = (e) => {
        setAddApiDetails((preState) => ({
            ...preState,
            name: e.target.value,
        }));
    };

    const urlChangeHandler = (e) => {
        setAddApiDetails((preState) => ({
            ...preState,
            url: e.target.value,
        }));
    };

    const apiKeyChangeHandler = (e) => {
        setAddApiDetails((preState) => ({
            ...preState,
            key: e.target.value,
        }));
    };

    const statusChangeHandler = (e) => {
        setAddApiDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        const url = '/admin/api-provider/add';
        try {
            const { data } = await Axios.post(url, { ...addApiDetails });
            if (data.status === 'success') {
                setApiProviders((preState) => [
                    ...preState,
                    { ...data.createdApi },
                ]);
                setShowAddModal(false);
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setAddError(true);
        }
    };

    const handleBackdropClick = () => {
        setErrorMsg('');
        setAddError(false);
        setShowAddModal(false);
        setShowEditModal(false);
        setShowSyncModal(false);
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Api Providers</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <>
                        <label className="input__label">Name</label>
                        <input
                            className="input"
                            placeholder="Name"
                            type="text"
                            value={addApiDetails.name}
                            onChange={nameChangeHandler}
                        />
                    </>

                    <div className="mt-2">
                        <label className="input__label">URL</label>
                        <input
                            className="input"
                            placeholder="API URL"
                            type="url"
                            value={addApiDetails.url}
                            onChange={urlChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">API Key</label>
                        <input
                            className="input"
                            placeholder="API KEY"
                            type="text"
                            value={addApiDetails.key}
                            onChange={apiKeyChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">Status</label>
                        <select
                            className="select"
                            value={addApiDetails.status}
                            onChange={statusChangeHandler}
                        >
                            <option key="active" value="active">
                                Active
                            </option>
                            <option key="disabled" value="disabled">
                                Disable
                            </option>
                        </select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const editButtonClickHandler = async (id) => {
        setShowEditModal(true);

        const apiProvider = await apiProviders.filter(
            (provider) => +provider.id === +id
        );

        console.log(apiProvider[0]);
        setEditingApiDetails((preState) => ({
            id: apiProvider[0].id,
            name: apiProvider[0].name,
            url: apiProvider[0].url,
            key: apiProvider[0].key,
            status: apiProvider[0].status,
        }));
    };

    const editingNameChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({
            ...preState,
            name: e.target.value,
        }));
    };

    const editingUrlChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({
            ...preState,
            url: e.target.value,
        }));
    };

    const editingKeyChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({
            ...preState,
            key: e.target.value,
        }));
    };

    const editingStatusChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const editFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        const url = '/admin/api-provider/update';
        try {
            const { data } = await Axios.post(url, { ...addApiDetails });
            if (data.status === 'success') {
                setApiProviders((preState) => [
                    ...preState,
                    { ...data.createdApi },
                ]);
                setShowAddModal(false);
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setAddError(true);
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Api Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={editFormSubmitHandler}>
                <Modal.Body>
                    <>
                        <label className="input__label">Name</label>
                        <input
                            className="input"
                            placeholder="Name"
                            type="text"
                            value={editingApiDetails.name}
                            onChange={editingNameChangeHandler}
                        />
                    </>

                    <div className="mt-2">
                        <label className="input__label">URL</label>
                        <input
                            className="input"
                            placeholder="API URL"
                            type="url"
                            value={editingApiDetails.url}
                            onChange={editingUrlChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">API Key</label>
                        <input
                            className="input"
                            placeholder="API KEY"
                            type="text"
                            value={editingApiDetails.key}
                            onChange={editingKeyChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">Status</label>
                        <select
                            className="select"
                            value={editingApiDetails.status}
                            onChange={editingStatusChangeHandler}
                        >
                            <option key="active" value="active">
                                Active
                            </option>
                            <option key="disabled" value="disabled">
                                Disable
                            </option>
                        </select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const syncClickHandler = async (id) => {
        setShowSyncModal(true);

        const apiProvider = await apiProviders.filter(
            (provider) => +provider.id === +id
        );

        setSyncData((preState) => ({
            ...preState,
            api: {
                name: apiProvider[0].name,
                url: apiProvider[0].url,
                key: apiProvider[0].key,
            },
        }));
    };

    const profitMarginChangeHandler = (e) => {
        setSyncData((preState) => ({
            ...preState,
            profitMargin: e.target.value,
        }));
    };

    const percentageCount = () => {
        const countList = [];
        let count = 0;
        while (count <= 500) {
            countList.push(count);
            count++;
        }
        return countList;
    };

    const syncFormSubmitHandler = async (e) => {
        e.preventDefault();
        const id = syncData.api.id;
        const url = `/admin/api-provider/sync_services/${id}`;

        const data = await Axios.post(url, syncData.profitMargin);
        console.log(data);
    };

    const counter = percentageCount();
    const syncModal = (
        <Modal show={showSyncModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Sync Services </Modal.Title>
            </Modal.Header>

            <form onSubmit={syncFormSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Name</label>
                        <input
                            className="input input--disabled"
                            value={syncData.api.name}
                            placeholder="Name"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">URL</label>
                        <input
                            className="input input--disabled"
                            value={syncData.api.url}
                            placeholder="API URL"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">API Key</label>
                        <input
                            className="input input--disabled"
                            value={syncData.api.key}
                            placeholder="API KEY"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">
                            Percentage Increase (Profit Margin)
                        </label>
                        <select
                            className="select"
                            value={syncData.profitMargin}
                            onChange={profitMarginChangeHandler}
                        >
                            {counter &&
                                counter.map((count) => (
                                    <option key={count} value={count}>
                                        {`${count}%`}
                                    </option>
                                ))}
                        </select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={syncFormSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const updateBalanceHandler = async (id) => {
        const url = `/admin/api-provider/balance/${id}`;

        const { data } = await Axios.get(url);
        const newList = await apiProviders.filter(
            (provider) => provider.id !== id
        );

        const updatedList = [{ ...data.updatedApi }, ...newList].sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );

        try {
            return setApiProviders(() => [...updatedList]);
        } catch (err) {
            return console.log(err);
        }
    };

    const serviceListHandler = async (id) => {
        const path = `api-provider/${id}/services`;
        history.push(path);
    };

    const deleteHandler = async (id) => {
        const url = `/admin/api-provider/delete/${id}`;

        const { data } = await Axios.delete(url);

        if (data.status !== 'deleted') {
            return console.log('Failed to delete message!');
        }

        const newList = await apiProviders.filter(
            (provider) => provider.id !== id
        );

        try {
            return setApiProviders(() => [...newList]);
        } catch (err) {
            return console.log(err.response.data.message);
        }
    };

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return (
                    <button className="btn btn-active btn-disabled" disabled>
                        {status}
                    </button>
                );

            case 'disable':
                return (
                    <button className="btn btn-inactive btn-disabled" disabled>
                        {status}
                    </button>
                );
            default:
                break;
        }
    };

    const apiProviderTable = (
        <Card>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {apiProviders &&
                        apiProviders.map((apiProvider) => (
                            <tr key={apiProvider.id}>
                                <td>{apiProvider.id}</td>
                                <td>{apiProvider.name}</td>
                                <td>{apiProvider.balance}</td>
                                <td>{checkStatus(apiProvider.status)}</td>
                                <td>
                                    <div>
                                        <OverlayTrigger
                                            key="balance"
                                            placement="top"
                                            overlay={
                                                <Tooltip
                                                    id={`tooltip-top`}
                                                    style={{
                                                        fontSize: '1.6rem',
                                                    }}
                                                >
                                                    Update Balance
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                value={apiProvider.id}
                                                variant="none"
                                                className="apiActionButton apiActionButtonFirst"
                                                onClick={() =>
                                                    updateBalanceHandler(
                                                        apiProvider.id
                                                    )
                                                }
                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <MdAttachMoney />
                                                </IconContext.Provider>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="sync"
                                            placement="top"
                                            overlay={
                                                <Tooltip
                                                    id={`tooltip-top`}
                                                    style={{
                                                        fontSize: '1.6rem',
                                                    }}
                                                >
                                                    Sync Services
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                variant="none"
                                                className="apiActionButton"
                                                onClick={() =>
                                                    syncClickHandler(
                                                        apiProvider.id
                                                    )
                                                }
                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <IoMdSync />
                                                </IconContext.Provider>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="service"
                                            placement="top"
                                            overlay={
                                                <Tooltip
                                                    id={`tooltip-top`}
                                                    style={{
                                                        fontSize: '1.6rem',
                                                    }}
                                                >
                                                    Service List via API
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                variant="none"
                                                className="apiActionButton"
                                                onClick={() =>
                                                    serviceListHandler(
                                                        apiProvider.id
                                                    )
                                                }
                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <AiOutlineUnorderedList />
                                                </IconContext.Provider>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="edit"
                                            placement="top"
                                            overlay={
                                                <Tooltip
                                                    id={`tooltip-top`}
                                                    style={{
                                                        fontSize: '1.6rem',
                                                    }}
                                                >
                                                    Edit API
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                variant="none"
                                                className="apiActionButton"
                                                onClick={() =>
                                                    editButtonClickHandler(
                                                        apiProvider.id
                                                    )
                                                }
                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <FiEdit />
                                                </IconContext.Provider>
                                            </button>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                            key="delete"
                                            placement="top"
                                            overlay={
                                                <Tooltip
                                                    id={`tooltip-top`}
                                                    style={{
                                                        fontSize: '1.6rem',
                                                    }}
                                                >
                                                    Delete API
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                variant="none"
                                                className="apiActionButton
                                                            apiActionButtonLast"
                                                onClick={() =>
                                                    deleteHandler(
                                                        apiProvider.id
                                                    )
                                                }
                                            >
                                                <IconContext.Provider
                                                    value={{
                                                        style: {
                                                            fontSize: '30px',
                                                            padding: 'auto',
                                                        },
                                                    }}
                                                >
                                                    <RiDeleteBin6Line />
                                                </IconContext.Provider>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Card>
    );

    const isEmptyApiProvider = apiProviders && apiProviders.length <= 0;
    const toShow = isEmptyApiProvider ? (
        <DataNotFound message="No Api providers found, add one now." />
    ) : (
        apiProviderTable
    );

    return (
        <>
            <Helmet>
                <title>Api Provider - {websiteName || 'SMT'}</title>
            </Helmet>

            {addModal}
            {editModal}
            {syncModal}

            {<Loading show={isLoading} />}

            <div className="container">
                <div className="apiProvider">
                    <div>
                        <h2 className="pageTitle">
                            <IconContext.Provider
                                value={{
                                    style: {
                                        fontSize: '2.5rem',
                                    },
                                }}
                            >
                                <VscListSelection />
                            </IconContext.Provider>{' '}
                            Api Providers
                        </h2>
                        <button
                            className="add-button"
                            onClick={handleAddButtonClick}
                        >
                            +
                        </button>
                    </div>

                    {toShow}
                </div>
            </div>
        </>
    );
};

export default ApiProvider;
