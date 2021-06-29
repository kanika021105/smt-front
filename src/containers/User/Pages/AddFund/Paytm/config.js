// const CONFIG = {
//     style: {
//         bodyBackgroundColor: '#fafafb',
//         bodyColor: '',
//         themeBackgroundColor: '#2f90ea',
//         themeColor: '#ffffff',
//         headerBackgroundColor: '#3f80ea',
//         headerColor: '#ffffff',
//         errorColor: '',
//         successColor: '',
//         card: {
//             padding: '',
//             backgroundColor: '',
//         },
//     },
//     jsFile: '',
//     data: {
//         orderId: '',
//         amount: '100',
//         token: '',
//         tokenType: 'TXN_TOKEN',
//         userDetail: {
//             mobileNumber: '',
//             name: '',
//         },
//     },
//     merchant: {
//         mid: 'OhFfSe81879043311565',
//         name: 'Test Gateway',
//         logo: '',
//         redirect: false,
//     },
//     mapClientMessage: {},
//     labels: {},
//     payMode: {
//         labels: {},
//         filter: {
//             exclude: [],
//         },
//         order: [],
//     },
//     flow: 'DEFAULT',
//     handler: {
//         notifyMerchant: (eventName) => {
//             if (eventName === 'SESSION_EXPIRED') {
//                 alert('Your session has expired!!');
//                 window.location.reload();
//             }
//         },
//         transactionStatus: (paymentStatus) => {
//             console.log({ paymentStatus: paymentStatus.STATUS });
//             if (paymentStatus.STATUS === 'TXN_SUCCESS') {
//                 console.log('Payment completed');
//                 setShowCheckout(false);
//             }

//             console.log('Transaction Failed!');
//             setShowCheckout(false);
//         },
//     },
// };
