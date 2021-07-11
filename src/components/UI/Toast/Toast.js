import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const success = (message, time = 6000) => toast(message, {
    type: 'success',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const info = (message, time = 600) => toast(message, {
    type: 'info',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const warning = (message, time = 6000) => toast(message, {
    type: 'warning',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const failed = (message, time = 6000) => toast(message, {
    type: 'error',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: null,
});

const Toast = {
    success,
    info,
    warning,
    failed,
};

export default Toast;
