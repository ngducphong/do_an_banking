import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const getPermission = async (roleName) => {
    try {
        const params = new URLSearchParams()
        params.append('roleName',roleName)
        return await jsonAxios.get(`/role-permission/permissions?${params.toString()}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
