import { adminAxiosInstance } from './axiosInstance';

export async function adminLogin(signupData) {
    const data = await adminAxiosInstance.post('/adminLogin', signupData);
    return data;
}

//user

export async function userList(currentPage, itemsPerPage) {
    const data = await adminAxiosInstance.get(`/userList?page=${currentPage}&limit=${itemsPerPage}`);
    return data;
}

export async function userDetails(id) {
    const data = await adminAxiosInstance.post('/userDetails', { id });
    return data;
}

export async function userBlockUnblock(id) {
    const data = await adminAxiosInstance.post('/blockUnblock', { id });
    return data;
}

//doctor 

export async function doctorList(currentPage, itemsPerPage) {
    const data = await adminAxiosInstance.get(`/doctorList?page=${currentPage}&limit=${itemsPerPage}`);
    return data;
}

export async function doctorDetails(id) {
    const data = await adminAxiosInstance.post('/doctorDetails', { id });
    return data;
}

export async function doctorBlockUnblock(id) {
    const data = await adminAxiosInstance.patch('/doctorblockUnblock', { id });
    return data;
}

export async function unVerifiedList(currentPage, itemsPerPage) {
    const data = await adminAxiosInstance.get(`/unVerifiedList?page=${currentPage}&limit=${itemsPerPage}`);
    return data;
}

export async function unVerifiedDetails(id) {
    const data = await adminAxiosInstance.get(`/unVerifiedDetails?id=${id}`);
    return data;
}

export async function adminVerify(id) {
    const data = await adminAxiosInstance.patch(`/adminVerify?id=${id}`);
    return data;
}

//speciality

export async function addSpeciality(value) {
    const data = await adminAxiosInstance.post('/addSpeciality', { value });
    return data;
}

export async function specialityList(currentPage, limit, search) {
    const data = await adminAxiosInstance.get(`/specialityList?currentPage=${currentPage}&limit=${limit}&search=${search}`);
    return data;
}

export async function listUnlist(id) {
    const data = await adminAxiosInstance.patch(`/listUnlist?id=${id}`);
    return data;
}

export async function editSpeciality(values) {
    const data = await adminAxiosInstance.patch('/editSpeciality', { values });
    return data;
}

//admins

export async function counts() {
    const data = await adminAxiosInstance.get('/counts');
    return data;
}

export async function appointmentList(currentPage, itemsPerPage) {
    const data = await adminAxiosInstance.get(`/appointmentList?page=${currentPage}&limit=${itemsPerPage}`);
    return data;
}

export async function adminReport() {
    const data = await adminAxiosInstance.get('/adminReport')
    return data
}
