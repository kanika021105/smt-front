// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { FiSliders } from 'react-icons/fi';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../sass/pages/user/NewOrder.scss';

const NewOrder = () => {
    const websiteName = process.env.REACT_APP_WEBSITE_NAME;

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();

    const [serviceDetails, setServiceDetails] = useState({
        id: '',
        title: '',
        min: '',
        max: '',
        rate: '',
        speed: '',
        avgtime: '',
        description: '',
    });

    const [orderDetails, setOrderDetails] = useState({
        link: '',
        charge: 0,
        quantity: 0,
        selectedService: 0,
        selectedCategory: 0,
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/new-order';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                const { data } = res;

                if (data.status !== 'success') return;

                setCategories(data.categories);
                setServices(data.services);
            })
            .catch((err) => {
                setIsLoading(false);

                console.log(err.response.msg);
            });
    }, []);

    const servicesByCategory = services
        && services.filter(
            (service) => +service.categoryId === +orderDetails.selectedCategory,
        );

    const selectedCategoryHandler = (e) => {
        setServiceDetails(() => ({
            id: '',
            title: '',
            min: '',
            max: '',
            rate: '',
            speed: '',
            avgtime: '',
            desc: '',
        }));

        setOrderDetails((preState) => ({
            ...preState,
            selectedCategory: +e.target.value,
            selectedService: '',
        }));
    };

    const selectedServiceHandler = async (e) => {
        setOrderDetails((preState) => ({
            ...preState,
            link: '',
            charge: '',
            quantity: 0,
            selectedService: +e.target.value,
        }));

        const details = await services.filter(
            (service) => +service.id === +e.target.value,
        );

        if (!details[0]) return;

        setServiceDetails(() => ({
            id: details[0].id,
            title: details[0].title,
            min: details[0].min,
            max: details[0].max,
            rate: details[0].rate,
            speed: details[0].speed,
            avgtime: details[0].avgtime,
            desc: details[0].desc,
        }));
    };

    const linkInputHandler = (e) => {
        setOrderDetails((preState) => ({
            ...preState,
            link: e.target.value,
        }));
    };

    const quantityInputHandler = async (e) => {
        const orderQuantity = e.target.value;
        setOrderDetails((preState) => ({
            ...preState,
            quantity: orderQuantity,
        }));

        const totalAmount = (serviceDetails.rate / 1000) * orderQuantity;
        setOrderDetails((preState) => ({
            ...preState,
            charge: totalAmount,
        }));
    };

    const orderSubmitHandler = async (e) => {
        e.preventDefault();

        const url = '/new-order';
        const orderData = {
            link: orderDetails.link,
            charge: orderDetails.charge,
            quantity: orderDetails.quantity,
            service: orderDetails.selectedService,
            category: orderDetails.selectedCategory,
        };

        try {
            const { data } = await Axios.post(url, orderData);

            if (data.status === 'failed') return;
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const categoriesLength = () => categories && categories.length <= 0;
    const servicesLength = () => services && services.length <= 0;

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>
                    New Order -
                    {' '}
                    {websiteName || 'SMT Panel'}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            {/* Modal to show order placed status */}
            {/* <Modal show={true} centered>
                Test
            </Modal> */}

            <div className="container newOrder">
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
                    New Order
                </h2>

                <div className="row">
                    <div className="col-md-6 u-sm-mb-1">
                        <Card>
                            <form onSubmit={orderSubmitHandler}>
                                <div>
                                    <label className="input__label">
                                        Category
                                    </label>
                                    <select
                                        className="select"
                                        value={orderDetails.selectedCategory}
                                        onChange={selectedCategoryHandler}
                                        disabled={categoriesLength()}
                                    >
                                        <option value="0" defaultValue>
                                            Choose a Category
                                        </option>
                                        {categories
                                            && categories.map((category) => (
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
                                    <label className="input__label">
                                        Services
                                    </label>
                                    <select
                                        className="select"
                                        value={orderDetails.selectedService}
                                        onChange={selectedServiceHandler}
                                        disabled={servicesLength()}
                                    >
                                        <option value="0" defaultValue>
                                            Choose a Service
                                        </option>
                                        {servicesByCategory
                                            && servicesByCategory.map(
                                                (service) => (
                                                    <option
                                                        key={service.id}
                                                        value={service.id}
                                                    >
                                                        {service.title}
                                                        {' '}
                                                        -
                                                        {' '}
                                                        {service.rate}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">Link</label>
                                    <input
                                        type="url"
                                        value={orderDetails.link}
                                        className="input"
                                        placeholder="https://..."
                                        onChange={linkInputHandler}
                                    />
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={orderDetails.quantity}
                                        className="input"
                                        placeholder="1000"
                                        onChange={quantityInputHandler}
                                    />

                                    <div className="mt-2 ">
                                        Min:
                                        {' '}
                                        {serviceDetails.min || 0}
                                        {' '}
                                        / Max:
                                        {serviceDetails.max || 0}
                                    </div>
                                </div>

                                <div className="mt-4 pl-2 newOrder__totalAmount">
                                    Total =
                                    {' '}
                                    {orderDetails.charge}
                                </div>

                                <div className="mt-3 newOrder__checkbox">
                                    <input type="checkbox" />
                                    <p>Yeah, I have confirmed my order!</p>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>

                    <div className="col-md-6">
                        <Card>
                            <div className="service__details">
                                <h3 className="service__details__title">
                                    <FiSliders />
                                    {' '}
                                    Service Details
                                </h3>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Service Title
                                    </label>
                                    <input
                                        className="input "
                                        value={serviceDetails.title}
                                        disabled
                                    />
                                </div>

                                <div className="row pt-2">
                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Min
                                        </label>
                                        <input
                                            className="input "
                                            value={serviceDetails.min}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Max
                                        </label>
                                        <input
                                            className="input "
                                            value={serviceDetails.max}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="input__label">
                                            Speed
                                        </label>
                                        <input
                                            className="input "
                                            value={serviceDetails.speed}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="row pt-2">
                                    <div className="col-md-6 ">
                                        <label className="input__label">
                                            Price
                                        </label>
                                        <input
                                            className="input "
                                            value={serviceDetails.rate}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="input__label">
                                            Average Time
                                        </label>
                                        <input
                                            className="input "
                                            value={serviceDetails.avgtime}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="input__label">
                                        Description
                                    </label>
                                    <textarea
                                        className="input "
                                        value={serviceDetails.description}
                                        rows="7"
                                        disabled
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewOrder;
