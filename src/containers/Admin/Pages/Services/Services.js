// jshint esversion:9

import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';

import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import { WebsiteDetail } from '../../../../containers/Context/WebsiteDetailContext';

import 'bootstrap/js/dist/dropdown';
import './services.scss';

const Services = () => {
    const [services, setServices] = useState();
    const [providers, setProviders] = useState();
    const [categories, setCategories] = useState();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [addServiceDetails, setAddServiceDetails] = useState({
        categoryId: 0,
        title: '',
        provider: 0,
        apiServiceId: '',
        min: '',
        max: '',
        rate: '',
        status: 'active',
        dripFeed: 'disable',
        description: '',
    });

    const [editingServiceDetails, setEditingServiceDetails] = useState({
        id: '',
        categoryId: 0,
        title: '',
        provider: 0,
        apiServiceId: '',
        min: '',
        max: '',
        rate: '',
        status: '',
        dripFeed: '',
        description: '',
    });

    const [editingService, setEditingService] = useState();

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);

    const { websiteName } = useContext(WebsiteDetail);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/services';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);

                const { data } = res;
                setServices(data.services);
                setCategories(data.categories);
                setProviders(data.apiProviders);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err);
            });
    }, []);

    // Adding Services
    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const addCategoryChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            categoryId: +e.target.value,
        }));
    };

    const addTitleChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    };

    const addApiProviderChange = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            provider: +e.target.value,
        }));
    };

    const addApiServiceIdChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            apiServiceId: +e.target.value,
        }));
    };

    const addMinChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            min: +e.target.value,
        }));
    };

    const addMaxChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            max: +e.target.value,
        }));
    };

    const addPriceChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            rate: +e.target.value,
        }));
    };

    const addStatusChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const addDripFeedChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            dripFeed: e.target.value,
        }));
    };

    const addDescChangeHandler = (e) => {
        setAddServiceDetails((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    };

    const handleBackdropClick = () => {
        setErrorMsg('');
        setAddError(false);
        setShowAddModal(false);

        setAddServiceDetails({
            categoryId: 0,
            title: '',
            provider: 0,
            apiServiceId: '',
            min: '',
            max: '',
            rate: '',
            status: 'active',
            dripFeed: 'disable',
            description: '',
        });
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        try {
            const url = '/admin/service/add';
            const { data } = await Axios.post(url, {
                ...addServiceDetails,
            });

            if (data.status !== 'success') {
                return console.log('Something went wrong!');
            }

            setServices((preState) => [
                { ...data.createdService },
                ...preState,
            ]);

            handleBackdropClick();
        } catch (err) {
            setErrorMsg(err.response);
            setAddError(true);
            console.log(err);
        }
    };

    const categoriesCount = categories && categories.length <= 0;

    const addModal = (
        <Modal show={showAddModal} onHide={handleBackdropClick}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={addFormSubmitHandler}>
                <Modal.Body>
                    <div>
                        <label className="input__label">Category</label>
                        <select
                            className="select"
                            value={addServiceDetails.categoryId}
                            onChange={addCategoryChangeHandler}
                            disabled={categoriesCount}
                        >
                            <option key={0} value={null}>
                                {categoriesCount
                                    ? 'No category to choose!'
                                    : 'Choose a Category'}
                            </option>
                            {categories &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="pt-3">
                        <label className="input__label">Title</label>
                        <input
                            className="input"
                            placeholder="Title"
                            type="text"
                            value={addServiceDetails.title}
                            onChange={addTitleChangeHandler}
                        />
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-6">
                            <label className="input__label">Api Provider</label>
                            <input
                                placeholder="Api Provider"
                                className="input"
                                value={addServiceDetails.provider}
                                onChange={addApiProviderChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">
                                Api Service Id
                            </label>
                            <input
                                className="input"
                                placeholder="Api Service Id"
                                type="number"
                                value={addServiceDetails.apiServiceId}
                                onChange={addApiServiceIdChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-6">
                            <label className="input__label">Min</label>
                            <input
                                className="input"
                                placeholder="Min"
                                type="number"
                                value={addServiceDetails.min}
                                onChange={addMinChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Max</label>
                            <input
                                className="input"
                                placeholder="Max"
                                type="number"
                                value={addServiceDetails.max}
                                onChange={addMaxChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-4">
                            <label className="input__label">Price</label>
                            <input
                                className="input"
                                value={addServiceDetails.rate}
                                type="number"
                                onChange={addPriceChangeHandler}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Status</label>
                            <select
                                className="select"
                                value={addServiceDetails.status}
                                onChange={addStatusChangeHandler}
                            >
                                <option value="active">Active</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Drip Feed</label>
                            <select
                                className="select"
                                value={addServiceDetails.dripFeed}
                                onChange={addDripFeedChangeHandler}
                            >
                                <option value="active">Active</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="input__label">Desc</label>
                        <textarea
                            className="input"
                            placeholder="Description..."
                            value={addServiceDetails.description}
                            rows={3}
                            onChange={addDescChangeHandler}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div style={{ margin: '0 auto 0 0' }}></div>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleBackdropClick}
                    >
                        Close
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={addFormSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    // Editing Services
    const editButtonHandler = (e) => {
        const id = +e.target.value;
        const service = services.filter((service) => service.id === +id);

        setEditingServiceDetails({
            id: service[0].id,
            categoryId: service[0].categoryId,
            title: service[0].title,
            provider: service[0].provider,
            apiServiceId: service[0].api_service_id,
            min: service[0].min,
            max: service[0].max,
            rate: service[0].rate,
            status: service[0].status,
            dripFeed: service[0].dripFeed,
            description: service[0].description,
        });

        setShowEditModal(true);
    };

    const categoryChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            categoryId: e.target.value,
        }));
    };

    const titleChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    };

    const providerChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            provider: e.target.value,
        }));
    };

    const apiServiceChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            apiServiceId: e.target.value,
        }));
    };

    const minChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            min: e.target.value,
        }));
    };

    const maxChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            max: e.target.value,
        }));
    };

    const priceChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            rate: e.target.value,
        }));
    };

    const statusChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            status: e.target.value,
        }));
    };

    const dripFeedChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            dripFeed: e.target.value,
        }));
    };

    const descChangeHandler = (e) => {
        setEditingServiceDetails((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    };

    const handleClose = () => {
        setEditingServiceDetails({
            id: '',
            categoryId: 0,
            title: '',
            provider: 0,
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

        const url = `admin/service/update/${editingServiceDetails.id}`;
        const newList = services.filter(
            (service) => service.id !== editingServiceDetails.id
        );

        try {
            const { data } = await Axios.patch(url, {
                ...editingServiceDetails,
            });

            setServices((preState) => [{ ...data.updatedService }, ...newList]);
            handleClose();
        } catch (err) {
            console.log(err.response.data);
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
                    <div>
                        <label className="input__label">Category</label>
                        <select
                            className="select"
                            value={editingServiceDetails.categoryId}
                            onChange={categoryChangeHandler}
                        >
                            {categories &&
                                categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="pt-2">
                        <label className="input__label">Title</label>
                        <input
                            placeholder="Title"
                            className="input"
                            type="text"
                            value={editingServiceDetails.title}
                            onChange={titleChangeHandler}
                        />
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Api Provider</label>
                            <input
                                className="input"
                                placeholder="Api Provider"
                                value={editingServiceDetails.provider}
                                onChange={providerChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">
                                Api Service Id
                            </label>
                            <input
                                className="input"
                                placeholder="Api Service Id"
                                type="number"
                                value={editingServiceDetails.apiServiceId}
                                onChange={apiServiceChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Min</label>
                            <input
                                className="input"
                                placeholder="Min"
                                type="number"
                                value={editingServiceDetails.min}
                                onChange={minChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Max</label>
                            <input
                                className="input"
                                placeholder="max"
                                type="number"
                                value={editingServiceDetails.max}
                                onChange={maxChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-4">
                            <label className="input__label">Price</label>
                            <input
                                className="input"
                                placeholder="Price"
                                type="number"
                                value={editingServiceDetails.rate}
                                onChange={priceChangeHandler}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Status</label>
                            <select
                                className="select"
                                value={editingServiceDetails.status}
                                onChange={statusChangeHandler}
                            >
                                <option value="active">Active</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Drip Feed</label>
                            <select
                                className="select"
                                value={editingServiceDetails.dripFeed}
                                onChange={dripFeedChangeHandler}
                            >
                                <option value="active">Active</option>
                                <option value="deactive">Disable</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="input__label">Desc</label>
                        <textarea
                            className="input"
                            placeholder="Description..."
                            value={editingServiceDetails.description}
                            rows="3"
                            onChange={descChangeHandler}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClose}
                    >
                        Close
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={editingSubmitHandler}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const deleteButtonHandler = async (e) => {
        const id = +e.target.value;
        const url = `/admin/service/delete/${id}`;
        const newList = await services.filter((service) => service.id !== +id);

        try {
            await Axios.delete(url);
            setServices([...newList]);
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const getProviderName = (provider, apiServiceId) => {
        const providerDetail =
            providers &&
            providers.filter((apiProvider) => apiProvider.id === +provider);

        return (
            <td>
                {providerDetail && providerDetail[0]
                    ? `${providerDetail[0].name} - `
                    : 'Manual - '}
                {apiServiceId && apiServiceId}
            </td>
        );
    };

    const getServiceByCategory = (id) => {
        const servicesList =
            services &&
            services.filter((service) => +service.categoryId === +id);
        console.log(servicesList);

        return servicesList.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
                <td>
                    {service.title.length > 35
                        ? service.title.slice(0, 35) + '...'
                        : service.title}
                </td>
                {getProviderName(service.provider, service.apiServiceId)}
                <td>
                    {service.min} / {service.max}
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
                        <div className="dropdown">
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
                                        className="btn btn-edit"
                                        style={{
                                            width: '100%',
                                        }}
                                        value={service.id}
                                        onClick={editButtonHandler}
                                    >
                                        Edit
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="btn btn-delete"
                                        style={{
                                            width: '100%',
                                        }}
                                        value={service.id}
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

    const servicesData = () => {
        if (services && services.length <= 0) {
            return (
                <DataNotFound message="Please add some services in any category to show here." />
            );
        }

        if (categories && categories.length <= 0) {
            return (
                <DataNotFound message="Please add some services in any category to show here." />
            );
        }

        return (
            categories &&
            categories.map((category) => {
                const serviceLength = getServiceByCategory(category.id);

                if (serviceLength.length <= 0) return '';
                if (serviceLength.length <= 0 && categories.length <= 1) {
                    return (
                        <DataNotFound message="Please add some services in any category to show here." />
                    );
                }

                return (
                    <div key={category.id} className="serviceListCard">
                        <Card>
                            <h3 className="categoryTitle">{category.title}</h3>
                            <table className="table">
                                <thead>
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
                                </thead>
                                <tbody>
                                    {getServiceByCategory(category.id)}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                );
            })
        );
    };

    // TODO
    return (
        <>
            <Helmet>
                <title>Services - {websiteName || 'SMT'}</title>
            </Helmet>

            {addModal}
            {editModal}
            {<Loading show={isLoading} />}

            <div className="container">
                <div className="Services">
                    <div>
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
                            Services
                        </h2>
                        <button
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
