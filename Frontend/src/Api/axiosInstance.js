import axios from 'axios';
import Swal from 'sweetalert2';

const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL = 'http://localhost:3001/';
// const baseURL = 'http://localhost:3001/';

const userBaseURL = baseURL;
const doctorBaseURL = `${baseURL}/doctor`;
const adminBaseURL = `${baseURL}/admin`;

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        timeout: 200000,
        timeoutErrorMessage: 'Request Timeout... Please try again...!',
    });
    return instance;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers.Authorization = authToken;
    }
    return req;
};

export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});

export const doctorAxiosInstance = createAxiosInstance(doctorBaseURL);
doctorAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'doctortoken');
    return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'admintoken');
    return modifiedReq;
});

userAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error,'user'),
);

adminAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error,'admin'),
);

doctorAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error,'doctor'),
);

const handleAxiosError = (error, role) => {
    console.log(error)

    if (error.response) {
        if (error.response.status === 404) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            Toast.fire({
                icon: 'error',
                title: error.response.data.message,
            });
            if (role === "user") {
                window.location.href = `/pageNotFound`;
            } else {
                window.location.href = `/${role}/pageNotFound`;
            }

        } else if (error.response.status === 401) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            Toast.fire({
                icon: 'error',
                title: error.response.data.message,

            });
        }
        else if (error.response.status === 400) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            Toast.fire({
                icon: 'error',
                title: error.response.data.message,
            });

        } else if (error.response.status === 500) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,

            });
            Toast.fire({
                icon: 'error',
                title: error.response.data.message,
            });
            if (role === "user") {
                window.location.href = `/internalError`;
            } else {
                window.location.href = `/${role}/internalError`;
            }

        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,

            });
            Toast.fire({
                icon: 'error',
                title: error.response.data.message,

            });
        }
    } else {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        Toast.fire({
            icon: 'error',
            title: error.response.data.message,

        });

    }
};
