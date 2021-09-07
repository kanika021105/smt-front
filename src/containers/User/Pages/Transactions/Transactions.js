import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IconContext } from 'react-icons';
import { VscListSelection } from 'react-icons/vsc';

import Axios from '../../../../axiosIns';
import Card from '../../../../components/UI/Card/Card';
import Loading from '../../../../components/UI/Loading/Loading';
import Button from '../../../../components/UI/Button/Button';
import Table, { THead, TBody } from '../../../../components/UI/Table/Table';
import Toast from '../../../../components/UI/Toast/Toast';
import Theme from '../../../../store/theme';

import AuthContext from '../../../../store/AuthContext';
import '../../../../sass/pages/user/transactions.scss';

function Transaction() {
    const [transactions, setTransactions] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { websiteName } = useContext(AuthContext);
    const { darkTheme } = useContext(Theme);

    useEffect(() => {
        setIsLoading(true);

        const url = '/transactions';
        Axios.get(url)
            .then((res) => {
                const { data } = res;
                setIsLoading(false);
                setTransactions(data.transactions);
            })
            .catch((err) => {
                Toast.failed(err.response.data.message || 'Something went wrong!');
            });
    }, []);

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

            <div className={darkTheme ? 'dark container Transactions' : 'container Transactions'}>
                <h2 className="pageTitle">
                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <VscListSelection />
                    </IconContext.Provider>
                    {' '}
                    Transactions
                </h2>

                <Card>
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
                </Card>
            </div>
        </>
    );
}

export default Transaction;
