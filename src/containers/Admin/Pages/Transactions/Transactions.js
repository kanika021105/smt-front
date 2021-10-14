import React, { useEffect, useState } from 'react';

import Axios from '../../../../axiosIns';

import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import PageTitle from '../../../../components/Extra/PageTitle';
import Loading from '../../../../components/UI/Loading/Loading';
import PageHeader from '../../../../components/UI/PageHeader/PageHeader';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import './Transactions.scss';
import PageContainer from '../../../../components/UI/PageContainer/PageContainer';

const Transactions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState();

    useEffect(async () => {
        setIsLoading(true);

        try {
            const url = '/admin/transactions';
            const { data } = await Axios.get(url);

            setIsLoading(false);
            setTransactions(data.transactions);
        } catch (err) {
            setIsLoading(false);
            Toast.failed(err.response.message);
        }
    }, []);

    const deleteHandler = async (e) => {
        const id = e.target.value;
        const newList = await transactions.filter((transaction) => transaction.id !== id);

        try {
            const url = `/admin/transaction/delete/${id}`;
            await Axios.delete(url);
            setTransactions([...newList]);
            Toast.success(`Transaction "${id} deleted!"`);
        } catch (err) {
            Toast.failed(err.response.data.message || 'Something went wrong!');
        }
    };

    const transactionDataTable = (
        <Table className="table">
            <THead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Transaction Id</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Option</th>
                </tr>
            </THead>

            <TBody>
                {transactions
                        && transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.email}</td>
                                <td>{transaction.transactionId}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>{transaction.status === 'success' ? <Button.Success /> : <Button.Failed />}</td>
                                <td>
                                    <Button.Delete
                                        value={transaction.id}
                                        onClick={deleteHandler}
                                    />
                                </td>
                            </tr>
                        ))}
            </TBody>
        </Table>
    );

    const isEmptyTransactions = transactions && transactions.length <= 0;
    const showData = isEmptyTransactions ? <DataNotFound message="Please wait for users to make some transaction." /> : transactionDataTable;

    return (
        <>
            <PageTitle title="Transactions" />
            <Loading show={isLoading} />

            <PageContainer>
                <div className="Transactions">
                    <PageHeader header="Transactions" />
                    {showData}
                </div>
            </PageContainer>
        </>
    );
};

export default Transactions;
