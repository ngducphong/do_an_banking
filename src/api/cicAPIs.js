import {jsonAxios} from "./api.base.url.js";
import {notify} from "../utils/notification.js";

export const getCicInformationByIdNumber = async (idNumber) => {
    try {
        const params = new URLSearchParams();
        params.append("idNumber",idNumber)
        return await jsonAxios.get(`/cic-information/get-cicinformation-by-idnumber?${params.toString()}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}