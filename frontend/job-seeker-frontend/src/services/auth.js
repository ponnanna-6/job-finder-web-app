import axios from "axios";
const URL = "http://localhost:5000/api/v1"

export const registerUser = (data) => {
    const res = axios.post(`${URL}/user/register`, data)
    return res
}