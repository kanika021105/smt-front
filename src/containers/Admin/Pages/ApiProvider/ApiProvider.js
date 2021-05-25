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

import { Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import '../../../../sass/pages/admin/apiProvider.scss';

const ApiProvider = () => {
    const history = useHistory();

    const [apiProviders, setApiProviders] = useState();

    const [name, setName] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [status, setStatus] = useState('active');

    const [profitMargin, setProfitMargin] = useState(0);

    // const [editingApi, setEditingApi] = useState('');
    const [syncApi, setSyncApi] = useState('');

    // const [showEditModal, setShowEditModal] = useState(false);
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
        return;
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        return;
    };

    const urlChangeHandler = (e) => {
        setApiUrl(e.target.value);
        return;
    };

    const apiKeyChangeHandler = (e) => {
        setApiKey(e.target.value);
        return;
    };

    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
        return;
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        const url = '/admin/api-provider/add';
        const apiData = {
            name,
            apiKey,
            status,
            url: apiUrl,
        };

        try {
            const { data } = await Axios.post(url, { ...apiData });
            if (data.status === 'success') {
                setApiProviders((preState) => [
                    ...preState,
                    { ...data.createdApi },
                ]);
                setShowAddModal(false);
                return;
            }
        } catch (err) {
            setErrorMsg(err.response.data.message);
            setAddError(true);
            console.log(err.response.data);
            return;
        }
    };

    const handleBackdropClick = () => {
        setErrorMsg('');
        setAddError(false);
        setShowAddModal(false);
        setShowSyncModal(false);
        // setShowEditModal(false);
        return;
    };

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Api Providers</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Name</label>
                        <input
                            className="input"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={nameChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">URL</label>
                        <input
                            className="input"
                            placeholder="API URL"
                            type="url"
                            value={apiUrl}
                            onChange={urlChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">API Key</label>
                        <input
                            className="input"
                            placeholder="API KEY"
                            type="text"
                            value={apiKey}
                            onChange={apiKeyChangeHandler}
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">Status</label>
                        <select
                            className="select"
                            value={status}
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

    const editModal = (
        <Modal show={false} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>
            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            placeholder="Name"
                            onChange={nameChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                            value={apiUrl}
                            placeholder="API URL"
                            onChange={urlChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>API Key</Form.Label>
                        <Form.Control
                            value={apiKey}
                            placeholder="API KEY"
                            onChange={apiKeyChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={statusChangeHandler}
                            >
                                <option key="active" value="active">
                                    Active
                                </option>
                                <option key="disabled" value="disabled">
                                    Disable
                                </option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" onClick={handleBackdropClick}>
                        Close
                    </button>
                    <button variant="primary" onClick={addFormSubmitHandler}>
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const syncHandler = async (id) => {
        setShowSyncModal(true);

        const apiProvider = apiProviders.filter(
            (provider) => +provider.id === +id
        );

        setSyncApi(apiProvider[0]);
        return;
    };

    const profitMarginChangeHandler = (e) => {
        setProfitMargin(e.target.value);
        return;
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
        const id = syncApi.id;
        const url = `/admin/api-provider/sync_services/${id}`;

        const data = await Axios.post(url, { profitMargin });
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
                            value={syncApi.title}
                            placeholder="Name"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">URL</label>
                        <input
                            className="input input--disabled"
                            value={syncApi.url}
                            placeholder="API URL"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">API Key</label>
                        <input
                            className="input input--disabled"
                            value={syncApi.apiKey}
                            placeholder="API KEY"
                            disabled
                        />
                    </div>

                    <div className="mt-2">
                        <label className="input__label">
                            Percentage Increase (Profit Margin)
                        </label>
                        <select
                            class="select"
                            value={profitMargin}
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

    // TODO
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
                                            <td>
                                                {checkStatus(
                                                    apiProvider.status
                                                )}
                                            </td>
                                            <td>
                                                <OverlayTrigger
                                                    key="balance"
                                                    placement="top"
                                                    overlay={
                                                        <Tooltip
                                                            id={`tooltip-top`}
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
                                                                    fontSize:
                                                                        '30px',
                                                                    padding:
                                                                        'auto',
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
                                                        >
                                                            Sync Services
                                                        </Tooltip>
                                                    }
                                                >
                                                    <button
                                                        variant="none"
                                                        className="apiActionButton"
                                                        onClick={() =>
                                                            syncHandler(
                                                                apiProvider.id
                                                            )
                                                        }
                                                    >
                                                        <IconContext.Provider
                                                            value={{
                                                                style: {
                                                                    fontSize:
                                                                        '30px',
                                                                    padding:
                                                                        'auto',
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
                                                                    fontSize:
                                                                        '30px',
                                                                    padding:
                                                                        'auto',
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
                                                        >
                                                            Edit API
                                                        </Tooltip>
                                                    }
                                                >
                                                    <button
                                                        variant="none"
                                                        className="apiActionButton"
                                                    >
                                                        <IconContext.Provider
                                                            value={{
                                                                style: {
                                                                    fontSize:
                                                                        '30px',
                                                                    padding:
                                                                        'auto',
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
                                                                    fontSize:
                                                                        '30px',
                                                                    padding:
                                                                        'auto',
                                                                },
                                                            }}
                                                        >
                                                            <RiDeleteBin6Line />
                                                        </IconContext.Provider>
                                                    </button>
                                                </OverlayTrigger>
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

export default ApiProvider;
