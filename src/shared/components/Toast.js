import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast(props) {
    const isNotify = props.isNotify;
    const text = props.text;
    const type = props.type;

    const notify = () => {
        if (type === 'success') {
            return toast.success(text);
        }
        return toast.error(text);
    };

    if (isNotify) {
        notify();
    } else {
        return;
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                limit={1}
                hideProgressBar={false}
                rtl={false}
                theme="light"
            />
        </div>
    );
}

export default Toast;
