import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/admin`,
    withCredentials: true
});

export const fetchAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const fetchAllReports = async () => {
    const response = await api.get("/reports");
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
};
