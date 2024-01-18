import { doctorAxiosInstance } from './axiosInstance';

export async function doctorSignup(signupData) {
    const data = await doctorAxiosInstance.post('/doctorSignup', signupData);
    return data;
}

export async function otpVerify(otp, otpId, doctorId) {
    const data = await doctorAxiosInstance.post('/doctorOtpVerify', { otp, otpId, doctorId });
    return data;
}

export async function otpResend(doctorId) {
    const data = await doctorAxiosInstance.post('/doctorResendOtp', { doctorId });
    return data;
}

export async function doctorLogin(loginData) {
    const data = await doctorAxiosInstance.post('/doctorLogin', loginData);
    return data;
}

export async function doctorForgetPassword(email) {
    const data = await doctorAxiosInstance.get(`/forgotPass?email=${email}`)
    return data
}

export async function doctorResetPassword(id, token, password) {
    const data = await doctorAxiosInstance.patch(`/resetPassword?id=${id}&token=${token}&password=${password}`)
    return data
}

export async function specialityName() {
    const data = await doctorAxiosInstance.get('/specialityName');
    return data;
}

export async function slotDetails(slotData) {
    const data = await doctorAxiosInstance.post('/slotDetails', slotData);
    return data;
}

export async function slotList(id) {
    const data = await doctorAxiosInstance.get(`/slotList?id=${id}`);
    return data;
}

export async function doctorDetails(id) {
    const data = await doctorAxiosInstance.get(`/doctorDetails?id=${id}`);
    return data;
}


export async function editProfile(values,) {
    const data = await doctorAxiosInstance.post('/editProfile', values);
    return data;
}

export async function appointmentList(id, page, limit) {
    const data = await doctorAxiosInstance.get(`/appointmentList?id=${id}`, {
        params: {
            page,
            limit,
        }
    });
    return data;
}

export async function createChat(values) {
    const data = await doctorAxiosInstance.post('/createChat', values);
    return data;
}

export async function priscription(values) {
    const data = await doctorAxiosInstance.post('/priscription', values)
    return data
}

export async function markasDone(id, userId) {
    const data = await doctorAxiosInstance.patch(`/markAsDone?id=${id}&userId=${userId}`)
    return data
}

export async function addMedicalReport(values) {
    const data = await doctorAxiosInstance.post('/addMedicalReport', values)
    return data
}

export async function chartDetails(drId) {
    const data = await doctorAxiosInstance.get(`/chartDetails?drId=${drId}`)
    return data
}

export async function doctorReport() {
    const data = await doctorAxiosInstance.get('/doctorReport')
    return data
}

export async function counts(doctorId) {
    const data = await doctorAxiosInstance.get(`/counts?doctorId=${doctorId}`);
    return data;
}

export async function appoReschedule(values) {
    const data = await doctorAxiosInstance.patch(`/reschedule`, values)
    return data
}

export async function cancelAppointment(values) {
    const data = await doctorAxiosInstance.patch(`/cancelAppointment`, values)
    return data
}

export async function editPhoto(values) {
    const data = await doctorAxiosInstance.patch('/editPhoto', values);
    return data;
}

export async function getReviews(drId, currentPage, itemsPerPage) {
    const data = await doctorAxiosInstance.get(`/getReviews?id=${drId}&page=${currentPage}&limit=${itemsPerPage}`)
    return data
}
