import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import Modal from 'react-bootstrap/Modal';
import { VscListSelection } from 'react-icons/vsc';
import { BsThreeDotsVertical } from 'react-icons/bs';

import Axios from '../../../../axiosIns';
import Context from '../../../../store/context';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Select from '../../../../components/UI/Select/Select';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Toast from '../../../../components/UI/Toast/Toast';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import './apiServices.scss';
import 'bootstrap/js/dist/dropdown';

const ApiServices = () => {
    const { id } = useParams();

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [profitMargin, setProfitMargin] = useState(10);

    const [selectedService, setSelectedService] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const { websiteName } = useContext(Context);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = `/admin/api-provider/service-list/${id}`;
        Axios.get(url)
            .then((res) => {
                const { data } = res;

                setServices(data.services);
                setCategories(data.categories);

                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);

                // TODO Remove this
                // eslint-disable-next-line no-console
                console.log(err.response.data.message);
            });
    }, [id]);

    const addButtonHandler = async (e) => {
        setShowAddModal(true);
        const serviceId = e.target.value;

        const service = await services.filter(
            (ser) => ser.service === serviceId,
        );

        setSelectedService({
            description: service[0].desc,
            dripFeed: +service[0].dripfeed,
            max: +service[0].max,
            min: +service[0].min,
            title: service[0].name,
            apiServiceId: +service[0].service,
            rate: +service[0].rate,
            refill: service[0].refill,
        });
    };

    const handleClose = () => {
        setShowAddModal(false);

        setSelectedService('');
    };

    const titleChangeHandler = (e) => {
        setSelectedService((preState) => ({
            ...preState,
            title: e.target.value,
        }));
    };

    const categoryChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            categoryId: value,
        }));
    };

    const minChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            min: value,
        }));
    };

    const maxChangeHandler = (e) => {
        const value = +e.target.value;
        setSelectedService((preState) => ({
            ...preState,
            max: value,
        }));
    };

    const profitMarginChangeHandler = (e) => {
        setProfitMargin(+e.target.value);
    };

    const descChangeHandler = (e) => {
        setSelectedService((preState) => ({
            ...preState,
            description: e.target.value,
        }));
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        const serviceData = {
            ...selectedService,
            profitMargin,
            provider: +id,
        };
        try {
            const url = '/admin/api-provider/service/add';
            await Axios.post(url, serviceData);
            Toast.success('Service added!');
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
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

    const counter = percentageCount();
    const addUpdateModal = (
        <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton closeLabel="">
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>

            <form onSubmit={formSubmitHandler}>
                <Modal.Body>
                    <Input
                        label="Title"
                        type="text"
                        placeholder="Title"
                        value={selectedService.title || ''}
                        onChange={titleChangeHandler}
                    />

                    <Select
                        label="Category"
                        value={selectedService.categoryId}
                        onChange={categoryChangeHandler}
                    >
                        <option>Choose a category</option>
                        {categories
                                && categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.title}
                                    </option>
                                ))}

                    </Select>

                    <InputGroup>
                        <Input
                            label="Minimum Quantity"
                            type="number"
                            placeholder="Minimum"
                            value={selectedService.min || 0}
                            onChange={minChangeHandler}
                        />

                        <Input
                            label="Maximum Quantity"
                            type="number"
                            placeholder="Maximum"
                            value={selectedService.max || 0}
                            onChange={maxChangeHandler}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            label="Price"
                            type="number"
                            placeholder="Price"
                            value={selectedService.rate || 0}
                            disabled
                        />

                        <Select
                            label="Maximum Quantity"
                            value={profitMargin}
                            onChange={profitMarginChangeHandler}
                        >
                            {counter
                                    && counter.map((count) => (
                                        <option key={count} value={count}>
                                            {`${count}%`}
                                        </option>
                                    ))}
                        </Select>
                    </InputGroup>

                    <div className="mt-2">
                        <label className="input__label">Description</label>
                        <textarea
                            className="input"
                            rows="4"
                            placeholder="Description..."
                            value={selectedService.description || ''}
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

                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );

    const apiServicesTable = (
        <Card>
            <Table>
                <THead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Min/Max</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </THead>

                <TBody>
                    {services
                        && services.map((service) => (
                            <tr key={service.service}>
                                <td>{service.service}</td>
                                <td>{service.category}</td>
                                <td>{service.name}</td>
                                <td>{`${service.min} / ${service.max}`}</td>
                                <td>{service.rate}</td>
                                <td>
                                    <IconContext.Provider
                                        value={{
                                            style: {
                                                fontSize: '30px',
                                            },
                                        }}
                                    >
                                        <div className="dropdown ">
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
                                                        className="btn btn-info"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        value={service.service}
                                                        onClick={
                                                            addButtonHandler
                                                        }
                                                    >
                                                        Add/Update
                                                    </button>
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

    const isServicesEmpty = services && services.length <= 0;
    const toShow = isServicesEmpty ? (
        <DataNotFound message="Make sure your api provider have some services." />
    ) : (
        apiServicesTable
    );

    // TODO
    return (
        <>
            <Helmet>
                <title>
                    Api Services -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            {addUpdateModal}
            <Loading show={isLoading} />

            <div className="container">
                <div className="apiServices">
                    <h2 className="pageTitle">
                        <IconContext.Provider
                            value={{
                                style: {
                                    fontSize: '30px',
                                },
                            }}
                        >
                            <VscListSelection />
                        </IconContext.Provider>
                        {' '}
                        Services From Api
                    </h2>

                    {toShow}
                </div>
            </div>
        </>
    );
};

export default ApiServices;
