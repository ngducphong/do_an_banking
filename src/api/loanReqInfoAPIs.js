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
// Đang thẩm định ĐT
export const evaluatingLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/evaluating/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Chờ thẩm định ĐB
export const waitingForFinalEvaluationLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-final-evaluation/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đang thẩm định ĐB
export const finalEvaluationLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/final-evaluation/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Chờ phê duyệt
export const waitingForApprovalLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-approval/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đang phê duyệt
export const approvingLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/approving/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Chờ giải ngân
export const waitingForDisbursementLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/waiting-for-disbursement/${id}`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
// Đã giải ngân
export const disbursedLoanReqInfo = async (id) => {
    try {
        return await jsonAxios.put(`/loan-info/disbursed/${id}`);
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

export const countWaitingForReceipt = async () => {
    try {
        return await jsonAxios.get(`/loan-info/count-waiting-for-receipt`);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const calculatorLoanPerMonth = async (userId,loanProductId,loanTermId,interestRateTypeId,amount) => {
    try {
        return await jsonAxios.post(`/calculator/per-month`,{userId,loanProductId,interestRateTypeId,loanTermId,amount});
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}