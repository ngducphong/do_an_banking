import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const getAlL = async () => {
    try {
        return await jsonAxios.get("/loan-status/get-all");
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
