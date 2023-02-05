import jwt_decode from "jwt-decode"; 
import { $authHost, $host } from "./index";

export const registration = async (email: string, password: string) => {
    const response = await $host.post('api/user/registration', {email: email, password: password, role: 'USER'})
    localStorage.setItem("token", response.data.token)
    return jwt_decode(response.data.token)
}

export const login = async (email: string, password: string) => {
    const response = await $host.post('api/user/login', {email: email, password: password})
    localStorage.setItem("token", response.data.token)
    return jwt_decode(response.data.token)
}

export const check = async () => {
    const response = await $authHost.get('api/user/auth')
    localStorage.setItem("token", response.data.token)
    return jwt_decode(response.data.token)
}