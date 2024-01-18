import { userAxiosInstance } from './axiosInstance';

export async function userSignup(signupData) {
    const data = await userAxiosInstance.post('/userSignup', signupData);
    return data;
}

export async function otpVerify(otp, otpId, userId) {
    const data = await userAxiosInstance.post('/otpVerify', { otp, otpId, userId });
    return data;
}

export async function otpResend(userId) {
    const data = await userAxiosInstance.post('/resendOtp', { userId });
    return data;
}

export async function userLogin(loginData) {
    const data = await userAxiosInstance.post('/userLogin', loginData);
    return data;
}

export async function userForgetPassword(email) {
    const data = await userAxiosInstance.get(`/forgotPass?email=${email}`)
    return data
}

export async function userResetPassword(id, token, password) {
    const data = await userAxiosInstance.patch(`/resetPassword?id=${id}&token=${token}&password=${password}`)
    return data
}

export async function getUserDetails(id) {
    const data = await userAxiosInstance.get(`/profileData/${id}`);
    return data;
}

export async function setDetails(values) {
    const data = await userAxiosInstance.post('/setDetails', values);
    return data;
}
export async function editPhoto(values) {
    const data = await userAxiosInstance.patch('/editPhoto', values);
    return data;
}

export async function doctorList(select, search, page, count, sort) {
    const data = await userAxiosInstance.get(`/doctorList?select=${select}&search=${search}&page=${page}&count=${count}&sort=${sort}`);
    return data;
}
export async function doctorDetails(id) {
    const data = await userAxiosInstance.get(`/doctorDetails/${id}`);
    return data;
}

export async function userSpecialityList() {
    const data = await userAxiosInstance.get('/specialityList');
    return data;
}

export async function slotList(drId, date) {
    const data = await userAxiosInstance.get(`/slotList?id=${drId}&date=${date}`);
    return data;
}

export async function makePayment(values) {
    const data = await userAxiosInstance.post('/makePayment', values);
    return data;
}

export async function makeAppointment(values) {
    const data = await userAxiosInstance.post('/makeAppointment', values);
    return data;
}

export async function appointmentList(id, page, limit) {
    const data = await userAxiosInstance.get(`/appointmentList?id=${id}`, {
        params: {
            page,
            limit,
        }
    });
    return data;
}

export async function cancelAppointment({ id, userId, paymentId }) {
    const data = await userAxiosInstance.patch(`/cancelAppointment?id=${id}&userId=${userId}&paymentId=${paymentId}`);
    return data;
}

export async function createChat(values) {
    const data = await userAxiosInstance.post('/createChat', values);
    return data;
}

export async function medicineDetails(appointmentId) {
    const data = await userAxiosInstance.get(`/medicineDetails?id=${appointmentId}`)
    return data
}

export async function reportDetails(appointmentId) {
    const data = await userAxiosInstance.get(`/reportDetails?id=${appointmentId}`)
    return data
}

export async function PaymentWallet(values) {
    const data = await userAxiosInstance.post('/walletPayment', values)
    return data
}

export async function addReview(values) {
    const data = await userAxiosInstance.post('/addReview', values)
    return data
}

export async function getReview(drId) {
    const data = await userAxiosInstance.get(`/getReview?id=${drId}`)
    return data
}

export async function getNotification(id, page) {
    const data = await userAxiosInstance.get(`/getNotification?id=${id}&page=${page}`)
    return data
}