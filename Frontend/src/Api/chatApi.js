import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
// const baseURL = 'http://localhost:3001/';
const chatInstance = axios.create({ baseURL: baseURL });

export async function userData(id) {
    const data = await chatInstance.get(`/chat/userData/${id}`);
    return data;
}

export async function fetchDoctorDetails(id) {
    const data = await chatInstance.get(`/chat/doctorData/${id}`);
    return data;
}

export async function chatData(id) {
    const data = await chatInstance.get(`/chat/chat/${id}`);
    return data;
}
