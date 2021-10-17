import React, { useContext, useEffect, useState } from 'react';

import Axios from '../../../../axiosIns';
import Theme from '../../../../store/theme';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

import classes from './Transactions.module.scss';

function Transaction() {
    const [transactions, setTransactions] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { darkTheme } = useContext(Theme);

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/transactions';
            const { data } = await Axios.get(url);
            setIsLoading(false);
            return setTransactions(data.transactions);
        } catch (err) {
            setIsLoading(false);
            return Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    }, []);

    return (
        <>
            <PageTitle title="Transactions" />
            <Loading show={isLoading} />

            <PageContainer>
                <div className={darkTheme ? classes.dark : ''}>
                    <PageHeader header="Transactions" />

                    <Table>
                        <THead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </THead>

                        <TBody>
                            {transactions && transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.email}</td>
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.paymentMethod}</td>
                                    <td>{transaction.status === 'success' ? <Button.Success /> : <Button.Failed />}</td>
                                </tr>
                            ))}
                        </TBody>
                    </Table>
                </div>
            </PageContainer>
        </>
    );
}

export default Transaction;
