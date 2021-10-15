import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Axios from '../../../../axiosIns';

import Card from '../../../../components/UI/Card/Card';
import Modal from '../../../../components/UI/Modal/Modal';
import Toast from '../../../../components/UI/Toast/Toast';
import Select from '../../../../components/UI/Select/Select';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import Dropdown from '../../../../components/UI/Dropdown/Dropdown';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Input, { InputGroup } from '../../../../components/UI/Input/Input';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import './apiServices.scss';

const ApiServices = () => {
    const { id } = useParams();

    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [profitMargin, setProfitMargin] = useState(10);
    const [selectedService, setSelectedService] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = `/admin/api-provider/service-list/${id}`;
            const { data } = await Axios.get(url);

            setServices(data.services);
            setCategories(data.categories);
            return setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            return Toast.failed(err.response.data.message);
        }
    }, [id]);

    async function addButtonHandler(e) {
        setShowAddModal(true);
        const serviceId = e.target.value;
        const service = await services.filter((ser) => ser.service === serviceId);

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
    }

    function handleClose() {
        setShowAddModal(false);
        setSelectedService('');
    }

    function titleChangeHandler(e) {
        setSelectedService((preState) => ({ ...preState, title: e.target.value }));
    }

    function categoryChangeHandler(e) {
        const { value } = e.target;
        setSelectedService((preState) => ({ ...preState, categoryId: value }));
    }

    function minChangeHandler(e) {
        const value = +e.target.value;
        setSelectedService((preState) => ({ ...preState, min: value }));
    }

    function maxChangeHandler(e) {
        const value = +e.target.value;
        setSelectedService((preState) => ({ ...preState, max: value }));
    }

    function profitMarginChangeHandler(e) {
        setProfitMargin(+e.target.value);
    }

    function descChangeHandler(e) {
        setSelectedService((preState) => ({ ...preState, description: e.target.value }));
    }

    async function formSubmitHandler(e) {
        e.preventDefault();

        const serviceData = { ...selectedService, profitMargin, provider: id };
        try {
            const url = '/admin/api-provider/service/add';
            await Axios.post(url, serviceData);
            Toast.success('Service added!');
        } catch (err) {
            Toast.failed(err.response.data.message);
        }
    }

    function percentageCount() {
        const countList = [];
        let count = 0;
        while (count <= 500) {
            countList.push(count);
            count += 1;
        }
        return countList;
    }

    const counter = percentageCount();
    const addUpdateModal = (
        <Modal show={showAddModal} onClose={handleClose} title="Add Service" onSubmit={formSubmitHandler}>
            <form onSubmit={formSubmitHandler}>
                <Input label="Title" type="text" placeholder="Title" value={selectedService.title || ''} onChange={titleChangeHandler} />
                <Select label="Category" value={selectedService.categoryId} onChange={categoryChangeHandler}>
                    <option>Choose a category</option>
                    {
                        categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))
                    }
                </Select>

                <InputGroup>
                    <Input label="Minimum Quantity" type="number" placeholder="Minimum" value={selectedService.min || 0} onChange={minChangeHandler} />
                    <Input label="Maximum Quantity" type="number" placeholder="Maximum" value={selectedService.max || 0} onChange={maxChangeHandler} />
                </InputGroup>

                <InputGroup>
                    <Input label="Price" type="number" placeholder="Price" value={selectedService.rate || 0} disabled />
                    <Select label="Maximum Quantity" value={profitMargin} onChange={profitMarginChangeHandler}>
                        {
                            counter && counter.map((count) => (<option key={count} value={count}>{`${count}%`}</option>))
                        }
                    </Select>
                </InputGroup>

                <Textarea label="Description" rows="4" placeholder="Description..." value={selectedService.description || ''} onChange={descChangeHandler} />
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
                    {
                        services && services.map((service) => (
                            <tr key={service.service}>
                                <td>{service.service}</td>
                                <td>{service.category}</td>
                                <td>{service.name}</td>
                                <td>{`${service.min} / ${service.max}`}</td>
                                <td>{service.rate}</td>
                                <td>
                                    <Dropdown id={service.service}>
                                        <ul>
                                            <li>
                                                <button type="button" className="btn btn-info" style={{ width: '100%' }} value={service.service} onClick={addButtonHandler}>
                                                    Add/Update
                                                </button>
                                            </li>
                                        </ul>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))
                    }
                </TBody>
            </Table>
        </Card>
    );

    const isServicesEmpty = services && services.length <= 0;
    const toShow = isServicesEmpty ? (<DataNotFound message="Make sure your api provider have some services." />) : (apiServicesTable);

    return (
        <>
            <PageTitle title="Api Services" />

            {addUpdateModal}
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="API Services" />

                {toShow}
            </PageContainer>
        </>
    );
};

export default ApiServices;
