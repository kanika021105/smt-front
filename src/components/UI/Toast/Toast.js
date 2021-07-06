import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const success = (message) => toast(message, {
    type: 'success',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const warning = (message) => toast(message, {
    type: 'warning',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const failed = (message) => toast(message, {
    type: 'error',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const Toast = {
    success,
    failed,
    warning,
};

export default Toast;
