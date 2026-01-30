import http from "@configs/fetch"
import { ILoginRequest } from "@models/login";
import { IRegisterRequest } from "@models/register";

const authService = {
    login: async (data: ILoginRequest) => {
        return await http.post("/auth/login", data);
    },
    register: async (data: IRegisterRequest) => {
        return await http.post("/auth/register", data)
    },
    sendMailConfirm: async(email: string) => {
        return await http.get(`/mail/confirm-email?to=${email}`)
    }
}


export default authService