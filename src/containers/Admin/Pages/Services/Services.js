import React, {
    useContext, useEffect, lazy, useReducer,
} from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';
import Context from '../../../../store/context';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import Loading from '../../../../components/UI/Loading/Loading';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { TBody, THead } from '../../../../components/UI/Table/Table';

import 'bootstrap/js/dist/dropdown';
import classes from './services.module.scss';

const Card = lazy(() => import('../../../../components/UI/Card/Card'));
const Select = lazy(() => import('../../../../components/UI/Select/Select'));
const Textarea = lazy(() => import('../../../../components/UI/Textarea/Textarea'));
const DataNotFound = lazy(() => import('../../../../components/UI/DataNotFound/DataNotFound'));

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: !state.isLoading,
            };

        case 'setServices':
            return {
                ...state,
                services: [...action.payload],
            };

        case 'setCategories':
            return {
                ...state,
                categories: [...action.payload],
            };

            // case 'setProviders':
            //     console.log(action.payload);
            //     return {
            //         ...state,
            //         provider: [...action.payload],
            //     };

        case 'showAddModal':
            return {
                ...state,
                showAddModal: !state.showAddModal,
            };

        case 'showEditModal':
            return {
                ...state,
                showEditModal: !state.showEditModal,
            };

        case 'newServiceDetail':
            return {
                ...state,
                newService: {
                    ...state.newService,
                    ...action.payload,
                },
            };

        case 'clearNewServiceDetail':
            return {
                ...state,
                newService: {
                    categoryId: 0,
                    title: '',
                    apiProviderId: '',
                    apiServiceId: 0,
                    min: 0,
                    max: 0,
                    rate: 0,
                    status: 'active',
                    dripFeed: 'disable',
                    description: '',
                },
            };

        case 'addNewService':
            return {
                ...state,
                services: [
                    ...state.services,
                    { ...action.payload },
                ],
            };

        case 'editingService':
            return {
                ...state,
                editingService: {
                    ...state.editingService,
                    ...action.payload,
                },
            };

        case 'editingServiceDetail':
            return {
                ...state,
                editingService: {
                    ...state.editingService,
                    ...action.payload,
                },
            };

        case 'clearEditingService':
            return {
                ...state,
                editingService: {
                    id: '',
                    uid: '',
                    categoryId: 0,
                    title: '',
                    apiProviderId: 0,
                    apiServiceId: '',
                    min: '',
                    max: '',
                    rate: '',
                    status: '',
                    dripFeed: '',
                    description: '',
                },
            };

        case 'updateServices':
            return {
                ...state,
                services: [
                    ...action.newList,
                    ...action.payload,
                ],
            };

        case 'updateServiceList':
            return {
                ...state,
                services: [...action.payload],
            };

        default:
            return { ...state };
    }
}

const Services = () => {
    const [state, dispatch] = useReducer(reducer, {
        services: '',
        providers: '',
        categories: '',
        isLoading: false,
        showAddModal: false,
        showEditModal: false,
        newService: {
            categoryId: 0,
            title: '',
            apiProviderId: '',
            apiServiceId: 0,
            min: 0,
            max: 0,
            rate: 0,
            status: 'active',
            dripFeed: 'disable',
            description: '',
        },
        editingService: {
            id: '',
            uid: '',
            categoryId: 0,
            title: '',
            apiProviderId: 0,
            apiServiceId: '',
            min: '',
            max: '',
            rate: '',
            status: '',
            dripFeed: '',
            description: '',
        },
    });

    const { websiteName } = useContext(Context);
    const { darkTheme } = useContext(Theme);

    async function getData() {
        try {
            const url = '/admin/services';
            const { data } = await Axios.get(url);

            dispatch({ type: 'setServices', payload: data.services });
            dispatch({ type: 'setCategories', payload: data.categories });
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        dispatch({ type: 'loading' });
        getData();
        dispatch({ type: 'loading' });
    }, []);

    function categoriesCount() {
        return state.categories && state.categories.length <= 0;
    }

    // Adding Services
    function handleAddButtonClick() {
        dispatch({ type: 'showAddModal' });
    }

    function addServiceCategory(e) {
        dispatch({ type: 'newServiceDetail', payload: { categoryId: e.target.value } });
    }

    function addTitleChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { title: e.target.value } });
    }

    function addApiProviderChange(e) {
        dispatch({ type: 'newServiceDetail', payload: { apiProviderId: e.target.value } });
    }

    function addApiServiceIdChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { apiServiceId: e.target.value } });
    }

    function addMinChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { min: e.target.value } });
    }

    function addMaxChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { max: e.target.value } });
    }

    function addPriceChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { rate: e.target.value } });
    }

    function addStatusChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { status: e.target.value } });
    }

    function addDripFeedChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { dripFeed: e.target.value } });
    }

    function addDescChangeHandler(e) {
        dispatch({ type: 'newServiceDetail', payload: { description: e.target.value } });
    }

    function handleBackdropClick() {
        dispatch({ type: 'showAddModal' });
        dispatch({ type: 'clearNewServiceDetail' });
    }

    async function createService(e) {
        e.preventDefault();

        try {
            const url = '/admin/service/add';
            const { data } = await Axios.post(url, { ...state.newService });
            dispatch({ type: 'addNewService', payload: { ...data.createdService } });

            Toast.success('Service created!');
            return handleBackdropClick();
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Failed to create service!');
        }
    }

    const addModal = (
        <Modal show={state.showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={createService}>
                <Modal.Body>
                    <Select
                        label="Category"
                        value={state.newService.categoryId}
                        onChange={addServiceCategory}
                        disabled={categoriesCount()}
                    >
                        <option key={0} value="">
                            {categoriesCount() ? 'No category to choose!' : 'Choose a Category'}
                        </option>
                        {state.categories.length >= 1 && state.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Title"
                        placeholder="Title"
                        type="text"
                        value={state.newService.title}
                        onChange={addTitleChangeHandler}
                    />

                    <InputGroup>
                        <Select
                            label="Api Provider"
                            value={state.newService.apiProviderId}
                            onChange={addApiProviderChange}
                        >
                            <option key={0} value="">
                                Manual
                            </option>
                            {state.providers && state.providers.map((_provider) => (
                                <option key={_provider.id} value={_provider.id}>
                                    {_provider.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Api Service Id"
                            placeholder="Api Service Id"
                            type="number"
                            value={state.newService.apiServiceId}
                            onChange={addApiServiceIdChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Min"
                            placeholder="Min"
                            type="number"
                            value={state.newService.min}
                            onChange={addMinChangeHandler}
                        />

                        <Input
                            label="Max"
                            placeholder="Max"
                            type="number"
                            value={state.newService.max}
                            onChange={addMaxChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Price"
                            placeholder="Price"
                            type="number"
                            value={state.newService.rate}
                            onChange={addPriceChangeHandler}
                        />

                        <Select
                            label="Status"
                            value={state.newService.status}
                            onChange={addStatusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>

                        <Select
                            label="Drip Feed"
                            value={state.newService.dripFeed}
                            onChange={addDripFeedChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        placeholder="Description..."
                        value={state.newService.description}
                        rows={4}
                        onChange={addDescChangeHandler}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary type="button" onClick={handleBackdropClick}>
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary type="submit">
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    // Editing Services
    function editButtonHandler(e) {
        const uid = e.target.value;
        const serviceDetails = state.services.filter((service) => service.uid === uid);

        dispatch({ type: 'editingService', payload: { ...serviceDetails[0] } });
        dispatch({ type: 'showEditModal' });
    }

    function categoryChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { categoryId: e.target.value } });
    }

    function titleChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { title: e.target.value } });
    }

    function providerChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { apiProviderId: e.target.value } });
    }

    function apiServiceChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { apiServiceId: e.target.value } });
    }

    function minChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { min: e.target.value } });
    }

    function maxChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { max: e.target.value } });
    }

    function priceChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { rate: e.target.value } });
    }

    function statusChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { status: e.target.value } });
    }

    function dripFeedChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { dripFeed: e.target.value } });
    }

    function descChangeHandler(e) {
        dispatch({ type: 'editingServiceDetail', payload: { description: e.target.value } });
    }

    const handleClose = () => {
        dispatch({ type: 'clearEditingService' });
        dispatch({ type: 'showEditModal ' });
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();

        const { uid, id } = state.editingService;
        const url = `admin/service/update/${uid}`;
        const newList = state.services.filter((service) => service.uid !== uid);

        try {
            const { data } = await Axios.patch(url, { ...state.editingService });
            dispatch({
                type: 'updateServices',
                payload: { ...data.updatedService },
                newList: { ...newList },
            });
            handleClose();
            Toast.success(`Service "${id}" updated!`);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update Services!');
        }
    };

    // Edit
    const editModal = (
        <Modal show={state.showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {state.categories >= 1 && (
                        <Select
                            label="Category"
                            value={state.editingService.categoryId}
                            onChange={categoryChangeHandler}
                        >
                            {state.categories && state.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.title}
                                </option>
                            ))}
                        </Select>
                    )}

                    <Input
                        label="Title"
                        placeholder="Title"
                        type="text"
                        value={state.editingService.title}
                        onChange={titleChangeHandler}
                    />

                    <InputGroup>

                        <Select
                            label="Api Provider"
                            value={state.editingService.apiProviderId}
                            onChange={providerChangeHandler}
                        >
                            <option key={0} value="">
                                Manual
                            </option>
                            {state.providers && state.providers.map((_provider) => (
                                <option key={_provider.id} value={_provider.id}>
                                    {_provider.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Api Service Id"
                            placeholder="Api Service Id"
                            type="number"
                            value={state.editingService.apiServiceId}
                            onChange={apiServiceChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Min"
                            placeholder="Min"
                            value={state.editingService.min}
                            onChange={minChangeHandler}
                        />

                        <Input
                            label="Max"
                            placeholder="Max"
                            type="number"
                            value={state.editingService.max}
                            onChange={maxChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Price"
                            placeholder="Price"
                            type="number"
                            value={state.editingService.rate}
                            onChange={priceChangeHandler}
                        />

                        <Select
                            label="Status"
                            value={state.editingService.status}
                            onChange={statusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>

                        <Select
                            label="Drip Feed"
                            value={state.editingService.dripFeed}
                            onChange={dripFeedChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="deactive">Disable</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        placeholder="Description..."
                        value={state.editingService.description}
                        rows={4}
                        onChange={descChangeHandler}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button.ModalSecondary
                        type="button"
                        onClick={handleClose}
                    >
                        Close
                    </Button.ModalSecondary>

                    <Button.ModalPrimary
                        type="submit"
                        onClick={editingSubmitHandler}
                    >
                        Submit
                    </Button.ModalPrimary>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const uid = e.target.value;
        const newList = await state.services.filter((service) => service.uid !== uid);

        try {
            const url = `/admin/service/delete/${uid}`;
            await Axios.delete(url);
            dispatch({ type: 'updateServiceList', payload: newList });
            Toast.warning(`Service "${uid}" deleted`);
        } catch (err) {
            Toast.failed(err.response.data || 'Failed to delete service!');
        }
    };

    function getProviderName(apiProviderId, apiServiceId) {
        const providerDetail = state.providers && state.providers
            .filter((apiProvider) => apiProvider.id === apiProviderId);

        return (
            <td>
                {providerDetail && providerDetail[0]
                    ? `${providerDetail[0].name} - ${apiServiceId} `
                    : 'Manual'}
            </td>
        );
    }

    function checkStatus(status) {
        switch (status) {
            case 'active':
                return <Button.Active />;

            case 'disable':
                return <Button.Disable />;

            default:
                return Toast.failed('Something went wrong!');
        }
    }

    function getServiceByCategory(id) {
        console.log(state.services);
        const servicesList = state.services && state.services
            .filter((service) => service.categoryId === id);

        return servicesList.map((service) => (
            <tr key={service.uid}>
                <td>{service.id}</td>
                <td>
                    {service.title}
                    {/* To slice service name by 35 letters */}
                    {/* {service.title.length > 35
                        ? `${service.title.slice(0, 35)}...`
                        : service.title} */}
                </td>
                {getProviderName(service.apiProviderId, service.apiServiceId)}
                <td>
                    {service.min}
                    /
                    {service.max}
                </td>
                <td>{parseFloat(service.rate).toFixed(2)}</td>
                <td>{service.dripFeed}</td>
                <td>{checkStatus(service.status)}</td>
                <td>
                    <IconContext.Provider
                        value={{
                            style: {
                                fontSize: '30px',
                                padding: 'auto',
                            },
                        }}
                    >
                        <div className={classes.dropdown}>
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
                                        type="button"
                                        className="btn btn-edit"
                                        style={{
                                            width: '100%',
                                        }}
                                        value={service.uid}
                                        onClick={editButtonHandler}
                                    >
                                        Edit
                                    </button>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        className="btn btn-delete"
                                        style={{
                                            width: '100%',
                                        }}
                                        value={service.uid}
                                        onClick={deleteButtonHandler}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </IconContext.Provider>
                </td>
            </tr>
        ));
    }

    const servicesData = () => {
        if (state.services && state.services.length <= 0) {
            return (
                <DataNotFound
                    message="Please add some services in any
                    category to show here."
                />
            );
        }

        if (state.categories && state.categories.length <= 0) {
            return (
                <DataNotFound
                    message="Please add some services in any
                    category to show here."
                />
            );
        }

        return (
            state.categories.length >= 1 && state.categories
                .map((category) => {
                    const serviceLength = getServiceByCategory(category.id);

                    if (serviceLength.length <= 0) return '';
                    if (serviceLength.length <= 0 && state.categories.length <= 1) {
                        return (
                            <DataNotFound
                                message="Please add some services
                                in any category to show here."
                            />
                        );
                    }

                    return (
                        <div key={category.id} className={classes.services__card}>
                            <Card>
                                <h3 className={classes.category__title}>{category.title}</h3>
                                <Table>
                                    <THead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Provider - Service Id</th>
                                            <th>Min / Max</th>
                                            <th>Price</th>
                                            <th>Drip Feed</th>
                                            <th>Status</th>
                                            <th>Option</th>
                                        </tr>
                                    </THead>

                                    <TBody>
                                        {getServiceByCategory(category.id)}
                                    </TBody>
                                </Table>
                            </Card>
                        </div>
                    );
                })
        );
    };

    return (
        <>
            <Helmet>
                <title>
                    Services -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {addModal}
            {editModal}
            <Loading show={state.isLoading} />

            <div className={darkTheme ? 'dark container' : 'container'}>
                <div className={classes.Services}>
                    <div>
                        <h2 className="pageTitle">
                            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                <VscListSelection />
                            </IconContext.Provider>
                            {' '}
                            Services
                        </h2>

                        <button
                            type="button"
                            className="add-button"
                            onClick={handleAddButtonClick}
                        >
                            +
                        </button>
                    </div>

                    {servicesData()}
                </div>
            </div>
        </>
    );
};

export default Services;
