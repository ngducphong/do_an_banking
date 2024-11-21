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
export const getLoan = async (id) => {
    try {
        return await jsonAxios.get(`/loan-info/get-loan-by-id/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const receiveLoan = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/received/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// yêu cầu kiểm tra
export const waitingForCheckLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-check/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đang kiểm tra
export const checkingLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/checking/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Chờ check CIC
export const waitingForCicCheckLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-cic-check/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đang check CIC
export const checkingCicLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/checking-cic/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đang check CIC
export const waitingForEvaluationLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-evaluation/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const rejectedCheckHs = async (id, reason) => {
    try {
        return await jsonAxios.put(`/loan-info/rejected-check-hs/${id}`, {reason});
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
