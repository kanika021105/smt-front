import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { FiEdit } from 'react-icons/fi';
import { IoMdSync } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscListSelection } from 'react-icons/vsc';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
// import Context from '../../../../store/context';
import AuthContext from '../../../../store/AuthContext';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Select from '../../../../components/UI/Select/Select';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import Toast from '../../../../components/UI/Toast/Toast';
import Theme from '../../../../store/theme';
import './apiProvider.scss';

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
    const { darkTheme } = useContext(Theme);
    const { websiteName } = useContext(AuthContext);

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
                return Toast.failed(err.response.message || 'Something went wrong!');
            });
    }, []);

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const nameChangeHandler = (e) => {
        setAddApiDetails((preState) => ({ ...preState, name: e.target.value }));
    };

    const urlChangeHandler = (e) => {
        setAddApiDetails((preState) => ({ ...preState, url: e.target.value }));
    };

    const apiKeyChangeHandler = (e) => {
        setAddApiDetails((preState) => ({ ...preState, key: e.target.value }));
    };

    const statusChangeHandler = (e) => {
        setAddApiDetails((preState) => ({ ...preState, status: e.target.value }));
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const url = '/admin/api-provider/add';
            const { data } = await Axios.post(url, { ...addApiDetails });

            if (data.status === 'success') {
                setApiProviders((preState) => [...preState, { ...data.createdApi }]);
                setShowAddModal(false);
                return Toast.success('Api added successfully!');
            }

            return Toast.failed('Failed to add API Provider!');
        } catch (err) {
            return Toast.failed(err.response.message || 'Something went wrong!');
        }
    };

    const handleBackdropClick = () => {
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
                    <Input
                        label="Name"
                        placeholder="Name"
                        type="text"
                        value={addApiDetails.name}
                        onChange={nameChangeHandler}
                    />

                    <Input
                        label="URL"
                        placeholder="API URL"
                        type="url"
                        value={addApiDetails.url}
                        onChange={urlChangeHandler}
                    />

                    <Input
                        label="API Key"
                        placeholder="API KEY"
                        type="text"
                        value={addApiDetails.key}
                        onChange={apiKeyChangeHandler}
                    />

                    <Select
                        label="Status"
                        value={addApiDetails.status}
                        onChange={statusChangeHandler}
                    >
                        <option key="active" value="active"> Active</option>
                        <option key="disabled" value="disabled">Disable</option>
                    </Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary
                        type="button"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const editButtonClickHandler = async (id) => {
        setShowEditModal(true);

        const apiProvider = await apiProviders.filter((provider) => provider.id === id);
        setEditingApiDetails(() => ({
            id: apiProvider[0].id,
            name: apiProvider[0].name,
            url: apiProvider[0].url,
            key: apiProvider[0].key,
            status: apiProvider[0].status,
        }));
    };

    const editingNameChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({ ...preState, name: e.target.value }));
    };

    const editingUrlChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({ ...preState, url: e.target.value }));
    };

    const editingKeyChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({ ...preState, key: e.target.value }));
    };

    const editingStatusChangeHandler = (e) => {
        setEditingApiDetails((preState) => ({ ...preState, status: e.target.value }));
    };

    const editFormSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const url = '/admin/api-provider/update';
            const { data } = await Axios.post(url, { ...addApiDetails });
            if (data.status === 'success') {
                setApiProviders((preState) => [...preState, { ...data.createdApi }]);
                setShowAddModal(false);

                return Toast.success('Api details updated!');
            }
            return Toast.failed('Failed to update api details!');
        } catch (err) {
            return Toast.failed(err.response.message);
        }
    };

    const editModal = (
        <Modal show={showEditModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Api Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={editFormSubmitHandler}>
                <Modal.Body>
                    <Input
                        label="Name"
                        placeholder="Name"
                        type="text"
                        value={editingApiDetails.name}
                        onChange={editingNameChangeHandler}
                    />

                    <Input
                        label="URL"
                        placeholder="API URL"
                        type="url"
                        value={editingApiDetails.url}
                        onChange={editingUrlChangeHandler}
                    />

                    <Input
                        label="API Key"
                        placeholder="API KEY"
                        type="text"
                        value={editingApiDetails.key}
                        onChange={editingKeyChangeHandler}
                    />

                    <Select
                        label="Status"
                        value={editingApiDetails.status}
                        onChange={editingStatusChangeHandler}
                    >
                        <option key="active" value="active">Active</option>
                        <option key="disabled" value="disabled">Disable</option>
                    </Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </Button.ModalSecondary>
                    <Button.ModalPrimary
                        type="button"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const syncClickHandler = async (id) => {
        setShowSyncModal(true);

        const apiProvider = await apiProviders.filter((provider) => provider.id === id);
        setSyncData((preState) => ({
            ...preState,
            api: {
                id,
                name: apiProvider[0].name,
                url: apiProvider[0].url,
                key: apiProvider[0].key,
            },
        }));
    };

    const profitMarginChangeHandler = (e) => {
        setSyncData((preState) => ({ ...preState, profitMargin: e.target.value }));
    };

    const percentageCount = () => {
        const countList = [];
        let count = 0;

        while (count <= 500) {
            countList.push(count);
            count += 1;
        }

        return countList;
    };

    const syncFormSubmitHandler = async (e) => {
        e.preventDefault();
        const { id } = syncData.api;

        try {
            const url = `/admin/api-provider/sync_services/${id}`;
            await Axios.post(url, syncData.profitMargin);
            Toast.success('Services Updated!');
        } catch (err) {
            Toast.failed(err.response.message || 'Something went wrong!');
        }
    };

    const counter = percentageCount();
    const syncModal = (
        <Modal show={showSyncModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Sync Services </Modal.Title>
            </Modal.Header>

            <form onSubmit={syncFormSubmitHandler}>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={syncData.api.name}
                        placeholder="Name"
                        disabled
                    />

                    <Input
                        label="URL"
                        value={syncData.api.url}
                        placeholder="URL"
                        disabled
                    />

                    <Input
                        label="API Key"
                        value={syncData.api.key}
                        placeholder="API KEY"
                        disabled
                    />

                    <Select
                        label="Percentage Increase (Profit Margin)"
                        value={syncData.profitMargin}
                        onChange={profitMarginChangeHandler}
                    >
                        {counter && counter.map((count) => (
                            <option key={count} value={count}>{`${count}%`}</option>
                        ))}
                    </Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary
                        type="button"
                        onClick={syncFormSubmitHandler}
                    >
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const updateBalanceHandler = async (id) => {
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
    };

    const serviceListHandler = async (id) => {
        const path = `api-provider/${id}/services`;
        history.push(path);
    };

    const deleteHandler = async (id) => {
        const newList = await apiProviders.filter((provider) => provider.id !== id);

        try {
            const url = `/admin/api-provider/delete/${id}`;
            await Axios.delete(url);
            setApiProviders(() => [...newList]);

            Toast.warning(`API Provider "${id} deleted!"`);
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    };

    const checkStatus = (status) => {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Invalid status received!');
        }
    };

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
                                <div>
                                    <OverlayTrigger
                                        key="balance"
                                        placement="top"
                                        overlay={(
                                            <Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>
                                                Update Balance
                                            </Tooltip>
                                        )}
                                    >
                                        <button
                                            type="button"
                                            value={apiProvider.id}
                                            variant="none"
                                            className="apiActionButton apiActionButtonFirst"
                                            onClick={() => updateBalanceHandler(apiProvider.id)}
                                        >
                                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                                <MdAttachMoney />
                                            </IconContext.Provider>
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="sync"
                                        placement="top"
                                        overlay={(
                                            <Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>
                                                Sync Services
                                            </Tooltip>
                                        )}
                                    >
                                        <button
                                            type="button"
                                            variant="none"
                                            className="apiActionButton"
                                            onClick={() => syncClickHandler(apiProvider.id)}
                                        >
                                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                                <IoMdSync />
                                            </IconContext.Provider>
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="service"
                                        placement="top"
                                        overlay={(
                                            <Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>
                                                Service List via API
                                            </Tooltip>
                                        )}
                                    >
                                        <button
                                            type="button"
                                            variant="none"
                                            className="apiActionButton"
                                            onClick={() => serviceListHandler(apiProvider.id)}
                                        >
                                            <IconContext.Provider value={{ style: { fontSize: '30px', padding: 'auto' } }}>
                                                <AiOutlineUnorderedList />
                                            </IconContext.Provider>
                                        </button>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        key="edit"
                                        placement="top"
                                        overlay={(
                                            <Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>
                                                Edit API
                                            </Tooltip>
                                        )}
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
                                        overlay={(
                                            <Tooltip id="tooltip-top" style={{ fontSize: '1.6rem' }}>
                                                Delete API
                                            </Tooltip>
                                        )}
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    );

    const isEmptyApiProvider = apiProviders && apiProviders.length <= 0;
    const toShow = isEmptyApiProvider ? (
        <DataNotFound message="No Api providers found, add one now." />
    )
        : apiProviderTable;

    return (
        <>
            <Helmet>
                <title>
                    Api Provider -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {addModal}
            {editModal}
            {syncModal}

            <Loading show={isLoading} />

            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className="apiProvider">
                    <div>
                        <h2 className="pageTitle">
                            <IconContext.Provider value={{ style: { fontSize: '2.5rem' } }}>
                                <VscListSelection />
                            </IconContext.Provider>
                            {' '}
                            Api Providers
                        </h2>
                        <button
                            type="button"
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
