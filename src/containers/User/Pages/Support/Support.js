// jshint esversion:9

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import Axios from '../../../../axiosIns';
import classes from './Support.module.css';
import Card from '../../../../components/UI/Card/Card';
import { Table, Modal, Form, Button } from 'react-bootstrap';

const Support = () => {
   const history = useHistory();

   const [errorMsg, setErrorMsg] = useState('');
   const [addError, setAddError] = useState(false);
   const [showError, setShowError] = useState(false);
   const [showAddModal, setShowAddModal] = useState(false);

   const [orderId, setOrderId] = useState('');
   const [message, setMessage] = useState('');
   const [serviceId, setServiceId] = useState('');
   const [transactionId, setTransactionId] = useState('');
   const [selectedSubject, setSelectedSubject] = useState('');
   const [selectedRequest, setSelectedRequest] = useState('');
   const [paymentMethod, setPaymentMethod] = useState('');

   const [tickets, setTickets] = useState();
   const [user, setUser] = useState();

   useEffect(() => {
      setShowError(false);
      setErrorMsg('');

      let url = '/support';
      Axios.get(url).then((res) => {
         let { data } = res;

         if (data.status === 'success') {
            setUser(data.user);
            setTickets(data.tickets.reverse());
            return;
         }

         setShowError(true);
         setErrorMsg(
            'Failed to load tickets, Please try again or contact support team'
         );
         return;
      });
   }, []);

   const ticketClickHandler = (id) => {
      setShowError(false);
      setErrorMsg('');

      let path = `/support/ticket/${id}`;
      return history.push(path);
   };

   let ticketList =
      tickets &&
      user &&
      tickets.map((ticket) => {
         return (
            <tr key={ticket.id} onClick={() => ticketClickHandler(ticket.id)}>
               <td>{ticket.id}</td>
               <td>{user.email}</td>
               <td>{ticket.subject}</td>
               <td>{ticket.status}</td>
            </tr>
         );
      });

   const handleAddButtonClick = () => {
      setShowAddModal(true);
      return;
   };

   const subjectChangeHandler = (e) => {
      setOrderId('');
      setMessage('');
      setServiceId('');
      setTransactionId('');
      setSelectedSubject('');
      setSelectedRequest('');
      setPaymentMethod('');

      setSelectedSubject(e.target.value);
      return;
   };

   const orderIdChangeHandler = (e) => {
      setOrderId(e.target.value);
      return;
   };

   const requestChangeHandler = (e) => {
      setSelectedRequest(e.target.value);
      return;
   };

   const messageChangeHandler = (e) => {
      setMessage(e.target.value);
      return;
   };

   const serviceIdChangeHandler = (e) => {
      setServiceId(e.target.value);
      return;
   };

   const paymentMethodChangeHandler = (e) => {
      setPaymentMethod(e.target.value);
      return;
   };

   const transactionIdChangeHandler = (e) => {
      setTransactionId(e.target.value);
      return;
   };

   const addFormSubmitHandler = async (e) => {
      e.preventDefault();

      setErrorMsg('');
      setAddError(false);

      const url = '/support/create-ticket';

      let ticketData = {};
      switch (selectedSubject) {
         case 'order':
            ticketData = {
               orderId,
               message,
               subject: selectedSubject,
               request: selectedRequest,
            };
            break;

         case 'payment':
            ticketData = {
               message,
               transactionId,
               subject: selectedSubject,
               method: paymentMethod,
            };
            break;

         case 'service':
            ticketData = {
               message,
               serviceId,
               subject: selectedSubject,
            };
            break;

         case 'other':
            ticketData = {
               message,
               subject: selectedSubject,
            };
            break;

         default:
            break;
      }

      try {
         const { data } = await Axios.post(url, { ...ticketData });

         setTickets((preState) => [{ ...data.ticket }, ...preState]);
         setShowAddModal(false);

         setOrderId('');
         setMessage('');
         setServiceId('');
         setTransactionId('');
         setSelectedSubject('');
         setSelectedRequest('');
         setPaymentMethod('');
         return;
      } catch (err) {
         console.log(err.response.data);

         setErrorMsg(err.response.data.message);
         setAddError(true);
         return;
      }
   };

   const handleBackdropClick = () => {
      setOrderId('');
      setMessage('');
      setServiceId('');
      setTransactionId('');
      setSelectedSubject('');
      setSelectedRequest('');
      setPaymentMethod('');

      setErrorMsg('');
      setAddError(false);
      setShowAddModal(false);
      return;
   };

   const selectedSubjectSection = () => {
      switch (selectedSubject) {
         case 'order':
            return (
               <div>
                  <Form.Group>
                     <Form.Label>OrderId</Form.Label>
                     <Form.Control
                        type="number"
                        value={orderId}
                        placeholder="Order Id"
                        onChange={orderIdChangeHandler}
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Request</Form.Label>
                     <Form.Control
                        as="select"
                        value={selectedRequest}
                        onChange={requestChangeHandler}
                     >
                        <option key={0} value={null}>
                           Choose request!
                        </option>
                        <option key="cancel" value="cancel">
                           Cancel
                        </option>
                        <option key="refill" value="refill">
                           Refill
                        </option>
                        <option key="speedUp" value="speedUp">
                           Speed Up
                        </option>
                        <option key="other" value="other">
                           Other
                        </option>
                     </Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Message</Form.Label>
                     <Form.Control
                        as="textarea"
                        value={message}
                        onChange={messageChangeHandler}
                        rows={7}
                     />
                  </Form.Group>
               </div>
            );

         case 'payment':
            return (
               <div>
                  <Form.Group>
                     <Form.Label>Select Payment Method</Form.Label>
                     <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={paymentMethodChangeHandler}
                     >
                        <option key={0} value={null}>
                           Choose payment method!
                        </option>
                        <option key="razorpay" value="razorpay">
                           Razorpay
                        </option>
                        <option key="other" value="other">
                           Other
                        </option>
                     </Form.Control>
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Transaction Id</Form.Label>
                     <Form.Control
                        type="text"
                        value={transactionId}
                        placeholder="Transaction Id"
                        onChange={transactionIdChangeHandler}
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Message</Form.Label>
                     <Form.Control
                        as="textarea"
                        value={message}
                        onChange={messageChangeHandler}
                        rows={7}
                     />
                  </Form.Group>
               </div>
            );

         case 'service':
            return (
               <div>
                  <Form.Group>
                     <Form.Label>Service Id</Form.Label>
                     <Form.Control
                        type="number"
                        value={serviceId}
                        placeholder="Service Id"
                        onChange={serviceIdChangeHandler}
                     />
                  </Form.Group>

                  <Form.Group>
                     <Form.Label>Message</Form.Label>
                     <Form.Control
                        as="textarea"
                        value={message}
                        onChange={messageChangeHandler}
                        rows={7}
                     />
                  </Form.Group>
               </div>
            );

         case 'other':
            return (
               <div>
                  <Form.Group>
                     <Form.Label>Message</Form.Label>
                     <Form.Control
                        as="textarea"
                        value={message}
                        onChange={messageChangeHandler}
                        rows={7}
                     />
                  </Form.Group>
               </div>
            );
         default:
            break;
      }
   };

   const addModal = (
      <Modal show={showAddModal} onHide={handleBackdropClick}>
         <Modal.Header closeButton>
            <Modal.Title>
               {addError ? (
                  <span className={classes.addError}>{errorMsg}</span>
               ) : (
                  'Add Service'
               )}
            </Modal.Title>
         </Modal.Header>
         <form onSubmit={addFormSubmitHandler}>
            <Modal.Body>
               <div className="pr-2">
                  <label>Subject</label>
                  <Form.Group>
                     <Form.Control
                        as="select"
                        value={selectedSubject}
                        onChange={subjectChangeHandler}
                     >
                        <option key={0} value={null}>
                           Choose a subject!
                        </option>
                        <option key="order" value="order">
                           Order
                        </option>
                        <option key="payment" value="payment">
                           Payment
                        </option>
                        <option key="service" value="service">
                           Service
                        </option>
                        <option key="other" value="other">
                           Other
                        </option>
                     </Form.Control>
                  </Form.Group>
               </div>
               {selectedSubjectSection()}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleBackdropClick}>
                  Close
               </Button>
               <Button variant="primary" onClick={addFormSubmitHandler}>
                  Submit
               </Button>
            </Modal.Footer>
         </form>
      </Modal>
   );

   return (
      <>
         <Helmet>
            <title>
               Support - {process.env.REACT_APP_WEBSITE_NAME || 'SMT Panel'}
            </title>
         </Helmet>

         {addModal}

         <div className="container">
            <div className={classes.Support}>
               <div>
                  <h3 className={classes.pageTitle}>Support</h3>
                  <span className={classes.addButton}>
                     <button onClick={handleAddButtonClick}>+</button>
                  </span>
               </div>
               <Card>
                  {showError && (
                     <div>
                        <small className={classes.errorMsg}>{errorMsg}</small>
                     </div>
                  )}
                  <Table striped bordered hover responsive size="sm">
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>Email</th>
                           <th>Subject</th>
                           <th>Status</th>
                        </tr>
                     </thead>
                     <tbody>{ticketList}</tbody>
                  </Table>
               </Card>
            </div>
         </div>
      </>
   );
};

export default React.memo(Support);
