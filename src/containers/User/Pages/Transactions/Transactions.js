import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import Axios from '../../../../axiosIns';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Transactions.module.css';
import Card from '../../../../components/UI/Card/Card';

export default function Services() {
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setShowError] = useState(false);

    const [transactions, setTransactions] = useState();

    useEffect(() => {
        let url = '/transactions';
        Axios.get(url)
            .then((res) => {
                let { data } = res;

                if (data.status === 'success') {
                    setErrorMsg('');
                    setShowError(false);
                    setTransactions(data.transactions.reverse());

                    return;
                }

                setErrorMsg(
                    'Failed to load transactions please try again or contact support team.'
                );
                setShowError(true);
            })
            .catch((err) => console.log(err));
    }, []);

    // TODO Change title to dynamic
    return (
        <>
            <Helmet>
                <title>Transactions - SMT Panel</title>
            </Helmet>

            <div className="container">
                <div className={classes.Transactions}>
                    <h3 className={classes.pageTitle}>Transactions</h3>
                    <Card>
                        {showError && (
                            <small className={classes.errorMsg}>
                                {errorMsg}
                            </small>
                        )}
                        <Table striped hover bordered responsive size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Transaction Id</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions &&
                                    transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.id}</td>
                                            <td>{transaction.email}</td>
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.paymentMethod}</td>
                                            <td>{transaction.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        </>
    );
}
