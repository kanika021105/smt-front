import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-bootstrap/Modal';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Context from '../../../../store/context';
import Card from '../../../../components/UI/Card/Card';
import Toast from '../../../../components/UI/Toast/Toast';
import Loading from '../../../../components/UI/Loading/Loading';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Select from '../../../../components/UI/Select/Select';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import Button from '../../../../components/UI/Button/Button';
import Table, { TBody, THead } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import Theme from '../../../../store/theme';

import 'bootstrap/js/dist/dropdown';
import classes from './services.module.scss';

const Services = () => {
    const [services, setServices] = useState();
    const [providers, setProviders] = useState();
    const [categories, setCategories] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addServiceDetails, setAddServiceDetails] = useState({
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
    });
    const [editingServiceDetails, setEditingServiceDetails] = useState({
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
    });

    const { websiteName } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const { darkTheme } = useContext(Theme);

    async function getData() {
        try {
            const url = '/admin/services';
            const { data } = await Axios.get(url);

            setServices(data.services);
            setCategories(data.categories);
            setProviders(data.apiProviders);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getData();
        setIsLoading(false);
    }, []);

    function categoriesCount() {
        return categories && categories.length <= 0;
    }

    // Adding Services
    function handleAddButtonClick() {
        setShowAddModal(true);
    }

    function addCategoryChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            categoryId: e.target.value,
        }));
    }

    function addTitleChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    }

    function addApiProviderChange(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            apiProviderId: e.target.value,
        }));
    }

    function addApiServiceIdChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            apiServiceId: +e.target.value,
        }));
    }

    function addMinChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            min: +e.target.value,
        }));
    }

    function addMaxChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            max: +e.target.value,
        }));
    }

    function addPriceChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            rate: +e.target.value,
        }));
    }

    function addStatusChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    }

    function addDripFeedChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            dripFeed: e.target.value,
        }));
    }

    function addDescChangeHandler(e) {
        setAddServiceDetails((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    }

    function handleBackdropClick() {
        setShowAddModal(false);

        setAddServiceDetails({
            categoryId: '',
            title: '',
            apiProviderId: '',
            apiServiceId: '',
            min: '',
            max: '',
            rate: '',
            status: 'active',
            dripFeed: 'disable',
            description: '',
        });
    }

    async function createService(e) {
        e.preventDefault();

        try {
            const url = '/admin/service/add';
            const { data } = await Axios.post(url, { ...addServiceDetails });
            setServices((preState) => [{ ...data.createdService }, ...preState]);

            Toast.success('Service created!');
            return handleBackdropClick();
        } catch (err) {
            return Toast.failed(err.response.data.message || 'Failed to create service!');
        }
    }

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={createService}>
                <Modal.Body>
                    <Select
                        label="Category"
                        value={addServiceDetails.categoryId}
                        onChange={addCategoryChangeHandler}
                        disabled={categoriesCount()}
                    >
                        <option key={0} value="">
                            {categoriesCount() ? 'No category to choose!' : 'Choose a Category'}
                        </option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Title"
                        placeholder="Title"
                        type="text"
                        value={addServiceDetails.title}
                        onChange={addTitleChangeHandler}
                    />

                    <InputGroup>
                        <Select
                            label="Api Provider"
                            value={addServiceDetails.apiProviderId}
                            onChange={addApiProviderChange}
                        >
                            <option key={0} value="">
                                Manual
                            </option>
                            {providers && providers.map((providr) => (
                                <option key={providr.id} value={providr.id}>
                                    {providr.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Api Service Id"
                            placeholder="Api Service Id"
                            type="number"
                            value={addServiceDetails.apiServiceId}
                            onChange={addApiServiceIdChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Min"
                            placeholder="Min"
                            type="number"
                            value={addServiceDetails.min}
                            onChange={addMinChangeHandler}
                        />

                        <Input
                            label="Max"
                            placeholder="Max"
                            type="number"
                            value={addServiceDetails.max}
                            onChange={addMaxChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Price"
                            placeholder="Price"
                            type="number"
                            value={addServiceDetails.rate}
                            onChange={addPriceChangeHandler}
                        />

                        <Select
                            label="Status"
                            value={addServiceDetails.status}
                            onChange={addStatusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>

                        <Select
                            label="Drip Feed"
                            value={addServiceDetails.dripFeed}
                            onChange={addDripFeedChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        placeholder="Description..."
                        value={addServiceDetails.description}
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
        const serviceDetails = services.filter((service) => service.uid === uid);

        setEditingServiceDetails({ ...serviceDetails[0] });
        setShowEditModal(true);
    }

    function categoryChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            categoryId: e.target.value,
        }));
    }

    function titleChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    }

    function providerChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            apiProviderId: e.target.value,
        }));
    }

    function apiServiceChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            apiServiceId: e.target.value,
        }));
    }

    function minChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            min: e.target.value,
        }));
    }

    function maxChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            max: e.target.value,
        }));
    }

    function priceChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            rate: e.target.value,
        }));
    }

    function statusChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    }

    function dripFeedChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            dripFeed: e.target.value,
        }));
    }

    function descChangeHandler(e) {
        setEditingServiceDetails((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    }

    const handleClose = () => {
        setEditingServiceDetails({
            id: '',
            categoryId: '',
            title: '',
            provider: '',
            apiServiceId: '',
            min: '',
            max: '',
            rate: '',
            status: '',
            dripFeed: '',
            description: '',
        });

        setShowEditModal(false);
    };

    const editingSubmitHandler = async (e) => {
        e.preventDefault();

        const { uid, id } = editingServiceDetails;
        const url = `admin/service/update/${uid}`;
        const newList = services.filter((service) => service.uid !== uid);

        try {
            const { data } = await Axios.patch(url, { ...editingServiceDetails });
            setServices(() => [...newList, { ...data.updatedService }]);

            handleClose();
            Toast.success(`Service "${id}" updated!`);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Failed to update Services!');
        }
    };

    // Edit
    const editModal = (
        <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={editingSubmitHandler}>
                <Modal.Body>
                    {categories && (
                        <Select
                            label="Category"
                            value={editingServiceDetails.categoryId}
                            onChange={categoryChangeHandler}
                        >
                            {categories && categories.map((category) => (
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
                        value={editingServiceDetails.title}
                        onChange={titleChangeHandler}
                    />

                    <InputGroup>

                        <Select
                            label="Api Provider"
                            value={editingServiceDetails.apiProviderId}
                            onChange={providerChangeHandler}
                        >
                            <option key={0} value="">
                                Manual
                            </option>
                            {providers && providers.map((providr) => (
                                <option key={providr.id} value={providr.id}>
                                    {providr.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Api Service Id"
                            placeholder="Api Service Id"
                            type="number"
                            value={editingServiceDetails.apiServiceId}
                            onChange={apiServiceChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Min"
                            placeholder="Min"
                            value={editingServiceDetails.min}
                            onChange={minChangeHandler}
                        />

                        <Input
                            label="Max"
                            placeholder="Max"
                            type="number"
                            value={editingServiceDetails.max}
                            onChange={maxChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Price"
                            placeholder="Price"
                            type="number"
                            value={editingServiceDetails.rate}
                            onChange={priceChangeHandler}
                        />

                        <Select
                            label="Status"
                            value={editingServiceDetails.status}
                            onChange={statusChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="disable">Disable</option>
                        </Select>

                        <Select
                            label="Drip Feed"
                            value={editingServiceDetails.dripFeed}
                            onChange={dripFeedChangeHandler}
                        >
                            <option value="active">Active</option>
                            <option value="deactive">Disable</option>
                        </Select>
                    </InputGroup>

                    <Textarea
                        label="Description"
                        placeholder="Description..."
                        value={editingServiceDetails.description}
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
        const newList = await services.filter((service) => service.uid !== uid);

        try {
            const url = `/admin/service/delete/${uid}`;
            await Axios.delete(url);
            setServices([...newList]);

            Toast.warning(`Service "${uid}" deleted`);
        } catch (err) {
            Toast.failed(err.response.data || 'Failed to delete service!');
        }
    };

    function getProviderName(apiProviderId, apiServiceId) {
        const providerDetail = providers && providers
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
        const servicesList = services && services
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
        if (services && services.length <= 0) {
            return (
                <DataNotFound
                    message="Please add some services in any
                    category to show here."
                />
            );
        }

        if (categories && categories.length <= 0) {
            return (
                <DataNotFound
                    message="Please add some services in any
                    category to show here."
                />
            );
        }

        return (
            categories && categories
                .map((category) => {
                    const serviceLength = getServiceByCategory(category.id);

                    if (serviceLength.length <= 0) return '';
                    if (serviceLength.length <= 0 && categories.length <= 1) {
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
            <Loading show={isLoading} />

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
