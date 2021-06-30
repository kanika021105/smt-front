import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';
import { BiMessageSquareDetail } from 'react-icons/bi';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox';
import Select from '../../../../components/UI/Select/Select';

import classes from './NewOrder.module.scss';

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
        charge: '',
        quantity: '',
        selectedService: '',
        selectedCategory: '',
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

                // TODO remove it
                // eslint-disable-next-line no-console
                console.log(err.response.msg);
            });
    }, []);

    const servicesByCategory = services
        && services.filter(
            (service) => +service.categoryId === +orderDetails.selectedCategory,
        );

    // eslint-disable-next-line no-unused-vars
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
            id: details[0].id || '',
            title: details[0].title || '',
            min: details[0].min || '',
            max: details[0].max || '',
            rate: details[0].rate || '',
            speed: details[0].speed || '',
            avgtime: details[0].avgtime || '',
            desc: details[0].desc || '',
        }));
    };

    const linkInputHandler = (e) => {
        setOrderDetails((preState) => ({
            ...preState,
            link: e.target.value,
        }));
    };

    const quantityInputHandler = async (e) => {
        const orderQuantity = +e.target.value;
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
            // TODO remove it
            // eslint-disable-next-line no-console
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

            <div className={`container ${classes.newOrder}`}>
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

                <div className={classes.newOrder__container}>
                    <div className={classes.newOrder__item}>
                        <Card>
                            <form onSubmit={orderSubmitHandler}>
                                <Select
                                    label="Category"
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
                                </Select>

                                <Select
                                    label="Choose a Service"
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
                                </Select>

                                <Input label="Link" type="url" value={orderDetails.link} placeholder="https://" onChange={linkInputHandler} />
                                <Input label="Quantity" type="number" value={orderDetails.quantity} placeholder="1000" onChange={quantityInputHandler} />

                                <div className={classes['min-max__count']}>
                                    Min:
                                    {' '}
                                    {serviceDetails.min || 0}
                                    {' '}
                                    / Max:
                                    {serviceDetails.max || 0}
                                </div>

                                <div className={classes.newOrder__totalAmount}>
                                    Total =
                                    {' '}
                                    {orderDetails.charge || 0}
                                </div>

                                <Checkbox text="Yeah, I have confirmed my order!" />

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Place Order
                                </button>
                            </form>
                        </Card>
                    </div>

                    <div className={classes.newOrder__item}>
                        <Card>
                            <div className={classes.service__details}>
                                <h3 className={classes['service__details--title']}>
                                    <BiMessageSquareDetail />
                                    {' '}
                                    Service Details
                                </h3>

                                <InputGroup>
                                    <Input label="Title" value={serviceDetails.title} disabled />
                                    <Input label="Price" value={serviceDetails.rate} disabled />
                                </InputGroup>

                                <InputGroup>
                                    <Input label="Min" value={serviceDetails.min} disabled />
                                    <Input label="Max" value={serviceDetails.max} disabled />
                                </InputGroup>

                                <InputGroup>
                                    <Input label="Speed" value={serviceDetails.speed} disabled />
                                    <Input label="Average Time" value={serviceDetails.avgtime} disabled />
                                </InputGroup>

                                <label className="input__label">
                                    Description
                                </label>
                                <textarea
                                    className="input "
                                    value={serviceDetails.description}
                                    rows="7"
                                    style={{ width: '100%' }}
                                    disabled
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewOrder;
