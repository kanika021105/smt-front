import React, { useEffect, useState } from 'react';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import Axios from '../../../../axiosIns';
import './services.scss';

function Services() {
    const [services, setServices] = useState();
    const [categories, setCategories] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/services';
            const { data } = await Axios.get(url);

            setIsLoading(false);
            setServices(data.services);
            setCategories(data.categories);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    function getServiceByCateId(cateId) {
        const servicesList = services && services.filter(
            (_service) => _service.categoryId === cateId,
        );
        console.log(servicesList);

        return servicesList.map((service) => (
            <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title.length > 35 ? `${service.title.slice(0, 35)}...` : service.title}</td>
                <td>{`${service.min} / ${service.max}`}</td>
                <td>{service.rate.toFixed(2)}</td>
                <td>{service.dripFeed}</td>
                <td><Button.Active /></td>
            </tr>
        ));
    }

    return (
        <>
            <PageTitle title="Services" />
            <Loading show={isLoading} />

            <PageContainer>
                <PageHeader header="Services" />

                {
                    categories && categories.map((_category) => (
                        <div className="serviceListCard" key={_category.id}>
                            <h3 className="categoryTitle ">{_category.title}</h3>

                            <Table>
                                <THead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Min / Max</th>
                                        <th>Price</th>
                                        <th>Drip Feed</th>
                                        <th>Status</th>
                                    </tr>
                                </THead>

                                <TBody>{getServiceByCateId(_category.id)}</TBody>
                            </Table>
                        </div>
                    ))
                }
            </PageContainer>
        </>
    );
}

export default Services;
