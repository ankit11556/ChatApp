import axios from "axios"
const API_URL = import.meta.env.VITE_SERVER_API_URL

export const signUpApi = async (data) => {
  return await axios.post(`${API_URL}/user/register`,data)
}

export const loginApi = async (data) => {
  return await axios.post(`${API_URL}/user/login`,data,{
    withCredentials: true
  })
}