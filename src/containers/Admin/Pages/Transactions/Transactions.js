import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Context from '../../../../store/context';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Toast from '../../../../components/UI/Toast/Toast';
import Button from '../../../../components/UI/Button/Button';
import DataNotFound from '../../../../components/UI/DataNotFound/DataNotFound';

import './Transactions.scss';

const Transactions = () => {
    const [transactions, setTransactions] = useState();

    const { websiteName } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const url = '/admin/transactions';
        Axios.get(url)
            .then((res) => {
                setIsLoading(false);
                setTransactions(res.data.transactions);
            })
            .catch((err) => {
                setIsLoading(false);
                Toast.failed(err.response.message);
            });
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
        <Card>
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
                                <td>
                                    {transaction.status === 'success'
                                        ? <Button.Success />
                                        : <Button.Failed />}
                                </td>
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
        </Card>
    );

    const isEmptyTransactions = transactions && transactions.length <= 0;
    const showData = isEmptyTransactions
        ? <DataNotFound message="Please wait for users to make some transaction." />
        : transactionDataTable;

    return (
        <>
            <Helmet>
                <title>
                    Transactions -
                    {' '}
                    {websiteName || ''}
                </title>
            </Helmet>

            <Loading show={isLoading} />

            <div className="container">
                <div className="Transactions">
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
                        Transactions
                    </h2>

                    <div>{showData}</div>
                </div>
            </div>
        </>
    );
};

export default Transactions;
