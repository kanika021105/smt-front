// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Modal from 'react-bootstrap/Modal';

import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import 'bootstrap/js/dist/dropdown';
import '../../../../sass/pages/admin/services.scss';

export default function Services() {
    const [services, setServices] = useState();
    const [providers, setProviders] = useState();
    const [categories, setCategories] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [min, setMin] = useState(0);
    const [title, setTitle] = useState('');
    const [max, setMax] = useState(0);
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [cateId, setCateId] = useState('');
    const [provider, setProvider] = useState('');
    const [status, setStatus] = useState('active');
    const [dripFeed, setDripFeed] = useState('disable');
    const [apiServiceId, setApiServiceId] = useState('');

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [editedApi, setEditedApi] = useState('');
    const [editedMin, setEditedMin] = useState(0);
    const [editedMax, setEditedMax] = useState(0);
    const [editedStatus, setEditedStatus] = useState('');
    const [editedPrice, setEditedPrice] = useState(0);
    const [editedCateId, setEditedCateId] = useState('');
    const [editedDripFeed, setEditedDripFeed] = useState('');
    const [editedApiServiceId, setEditedApiServiceId] = useState('');

    const [editingService, setEditingService] = useState();

    const [errorMsg, setErrorMsg] = useState('');
    const [addError, setAddError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        Axios.get('/admin/services')
            .then((res) => {
                setIsLoading(false);

                let { data } = res;
                setServices(data.services);
                setCategories(data.categories);
                setProviders(data.apiProviders);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err);
            });
    }, []);

    const handleAddButtonClick = () => {
        setShowAddModal(true);
        return;
    };

    const addCategoryChangeHandler = (e) => {
        setCateId(e.target.value);
        return;
    };

    const addTitleChangeHandler = (e) => {
        setTitle(e.target.value);
        return;
    };

    const addApiProviderChange = (e) => {
        setProvider(e.target.value);
        return;
    };

    const addApiServiceIdChangeHandler = (e) => {
        setApiServiceId(e.target.value);
        return;
    };

    const addMinChangeHandler = (e) => {
        setMin(e.target.value);
        return;
    };

    const addMaxChangeHandler = (e) => {
        setMax(e.target.value);
        return;
    };

    const addPriceChangeHandler = (e) => {
        setPrice(e.target.value);
        return;
    };

    const addStatusChangeHandler = (e) => {
        setStatus(e.target.value);
        return;
    };

    const addDripFeedChangeHandler = (e) => {
        setDripFeed(e.target.value);
        return;
    };

    const addDescChangeHandler = (e) => {
        setDesc(e.target.value);
        return;
    };

    const addFormSubmitHandler = async (e) => {
        e.preventDefault();

        setErrorMsg('');
        setAddError(false);

        let url = '/admin/service/add';
        const serviceData = {
            title,
            min,
            max,
            desc,
            price,
            status,
            cateId,
            provider,
            dripFeed,
            apiServiceId,
        };

        try {
            const { data } = await Axios.post(url, { ...serviceData });
            if (data.status === 'success') {
                setServices((preState) => [{ ...data.result }, ...preState]);
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
        return;
    };

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
                            value={cateId}
                            onChange={addCategoryChangeHandler}
                        >
                            <option key={0} value={null}>
                                Choose a service
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
                            value={title}
                            onChange={addTitleChangeHandler}
                        />
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-6">
                            <label className="input__label">Api Provider</label>
                            <input
                                placeholder="Api Provider"
                                className="input"
                                value={provider}
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
                                value={apiServiceId}
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
                                value={min}
                                onChange={addMinChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Max</label>
                            <input
                                className="input"
                                placeholder="Max"
                                type="number"
                                value={max}
                                onChange={addMaxChangeHandler}
                            />
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-4">
                            <label className="input__label">Price</label>
                            <input
                                className="input"
                                value={price}
                                type="number"
                                onChange={addPriceChangeHandler}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Status</label>
                            <select
                                className="select"
                                value={status}
                                onChange={addStatusChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Drip Feed</label>
                            <select
                                className="select"
                                value={dripFeed}
                                onChange={addDripFeedChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="input__label">Desc</label>
                        <textarea
                            className="input"
                            placeholder="Description..."
                            value={desc}
                            rows={3}
                            onChange={addDescChangeHandler}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div style={{ margin: '0 auto 0 0' }}></div>

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

    const editButtonHandler = (e) => {
        const id = e.target.value;
        const service = services.filter((service) => service.id === +id);

        setEditedMin(service[0].min || '');
        setEditedTitle(service[0].title || '');
        setEditedMax(service[0].max || '');
        setEditedDesc(service[0].desc || '');
        setEditedPrice(service[0].price || '');
        setEditedStatus(service[0].status || '');
        setEditedApi(service[0].provider || '');
        setEditedCateId(service[0].cateId || '');
        setEditedDripFeed(service[0].dripFeed || '');
        setEditedApiServiceId(service[0].api_service_id || '');

        setShowEditModal(true);
        setEditingService(service[0]);
        return;
    };

    const categoryChangeHandler = (e) => {
        setEditedCateId(e.target.value);
        return;
    };

    const titleChangeHandler = (e) => {
        setEditedTitle(e.target.value);
        return;
    };

    const providerChangeHandler = (e) => {
        setEditedApi(e.target.value);
        return;
    };

    const apiServiceChangeHandler = (e) => {
        setEditedApiServiceId(e.target.value);
        return;
    };

    const minChangeHandler = (e) => {
        setEditedMin(e.target.value);
    };

    const maxChangeHandler = (e) => {
        setEditedMax(e.target.value);
    };

    const priceChangeHandler = (e) => {
        setEditedPrice(e.target.value);
        return;
    };

    const statusChangeHandler = (e) => {
        setEditedStatus(e.target.value);
        return;
    };

    const dripFeedChangeHandler = (e) => {
        setEditedDripFeed(e.target.value);
        return;
    };

    const descChangeHandler = (e) => {
        setEditedDesc(e.target.value);
        return;
    };

    const handleClose = () => {
        setEditedApi('');
        setEditedMin('');
        setEditedTitle('');
        setEditedMax('');
        setEditedDesc('');
        setEditedPrice('');
        setEditedStatus('');
        setEditedCateId('');
        setEditedDripFeed('');
        setEditedApiServiceId('');

        setShowEditModal(false);
        setEditingService(null);
        return;
    };

    const editingSubmitHandler = async () => {
        setShowEditModal(false);

        let url = `admin/service/update/${editingService.id}`;
        let data = {
            min: editedMin,
            title: editedTitle,
            max: editedMax,
            desc: editedDesc,
            price: editedPrice,
            status: editedStatus,
            provider: editedApi,
            cateId: editedCateId,
            dripFeed: editedDripFeed,
            api_service_id: editedApiServiceId,
        };

        let newList = services.filter(
            (service) => service.id !== editingService.id
        );
        let response = await Axios.patch(url, data);

        setServices((preState) => [
            { id: editingService.id, ...data },
            ...newList,
        ]);
        handleClose();
        return;
    };

    // Edit
    const editModal = editingService && (
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
                            value={editedCateId}
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
                            value={editedTitle}
                            onChange={titleChangeHandler}
                        />
                    </div>

                    <div className="row pt-2">
                        <div className="col-md-6">
                            <label className="input__label">Api Provider</label>
                            <input
                                className="input"
                                placeholder="Api Provider"
                                value={editedApi}
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
                                value={editedApiServiceId}
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
                                value={editedMin}
                                onChange={minChangeHandler}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="input__label">Max</label>
                            <input
                                className="input"
                                placeholder="max"
                                type="number"
                                value={editedMax}
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
                                value={editedPrice || 0}
                                onChange={priceChangeHandler}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Status</label>
                            <select
                                className="select"
                                value={editedStatus}
                                onChange={statusChangeHandler}
                            >
                                <option value="disable">Disable</option>
                                <option value="active">Active</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="input__label">Drip Feed</label>
                            <select
                                className="select"
                                value={editedDripFeed}
                                onChange={dripFeedChangeHandler}
                            >
                                <option value="deactive">Disable</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="input__label">Desc</label>
                        <textarea
                            className="input"
                            placeholder="Description..."
                            value={editedDesc}
                            rows="3"
                            onChange={descChangeHandler}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button
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
        const id = await e.target.value;
        let url = `/admin/service/delete/${id}`;
        const newList = await services.filter((service) => service.id !== +id);

        try {
            await Axios.delete(url);
        } catch (err) {
            console.log(err.response.data);
        }
        setServices([...newList]);
        return;
    };

    const getProviderName = (provider, apiServiceId) => {
        const providerDetail =
            providers &&
            providers.filter((apiProvider) => apiProvider.id === +provider);

        return (
            <td>
                {providerDetail && providerDetail[0]
                    ? `${providerDetail[0].name} - `
                    : 'Manual'}
                {apiServiceId && apiServiceId}
            </td>
        );
    };

    const getServiceByCategory = (id) => {
        let servicesList =
            services && services.filter((service) => service.categoryId === id);

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
                <td>{service.rate.toFixed(2)}</td>
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

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Services - SMT Panel</title>
            </Helmet>

            {editModal}
            {addModal}
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
                    {categories &&
                        categories.map((category) => (
                            <div key={category.id} className="serviceListCard">
                                <Card>
                                    <h3 className="categoryTitle">
                                        {category.title}
                                    </h3>
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
                        ))}
                </div>
            </div>
        </>
    );
}
