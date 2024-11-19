import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const paging = async (searchRequest) => {
    try {
        return await jsonAxios.post("/loan-info/page", searchRequest);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const getLoan = async(id)=>{
    try {
        return await jsonAxios.get(`/loan-info/get-loan-by-id/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
