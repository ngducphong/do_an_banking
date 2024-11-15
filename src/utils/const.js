export const ROLE = [
    {
        id: "RECORDSTAFF",
        name: "NV Hồ sơ",
    },
    {
        id: "CREDIT_OFFICER",
        name: "Chuyên viên tín dụng",
    },
    {
        id: "APPRAISAL_OFFICER",
        name: "NV thẩm định",
    },
    {
        id: "AUTHORIZATION_MANAGER",
        name: "CV phê duyệt",
    },
    {
        id: "FILE_OFFICER",
        name: "NV giải ngân",
    }
];
export const GENDER = [{
    id: true,
    name: "Nam"
}, {
    id: false,
    name: "Nữ"
}]
export const CONVERT_ROLE = (roles) => {
    return roles.map(roleId => {
        const role = ROLE.find(r => r.id === roleId);
        return role ? role.name : null;
    }).filter(name => name !== null).join(", ")
}
export const STATUSES = [
    {code: 'WAITING_FOR_RECEIPT', label: "Chờ tiếp nhận", color: "bg-blue-500"},
    {code: 'RECEIVED', label: "Đã tiếp nhận", color: "bg-teal-500"},
    {code: 'WAITING_FOR_CHECK', label: "Chờ KT", color: "bg-indigo-400"},
    {code: 'CHECKING', label: "Đang KT", color: "bg-purple-500"},
    {code: 'WAITING_FOR_CIC_CHECK', label: "Chờ check CIC", color: "bg-sky-400"},
    {code: 'CHECKING_CIC', label: "Đang check CIC", color: "bg-cyan-500"},
    {code: 'WAITING_FOR_EVALUATION', label: "Chờ thẩm định ĐT", color: "bg-orange-400"},
    {code: 'EVALUATING', label: "Đang thẩm định ĐT", color: "bg-amber-500"},
    {code: 'WAITING_FOR_FINAL_EVALUATION', label: "Chờ thẩm định ĐB", color: "bg-yellow-300"},
    {code: 'FINAL_EVALUATING', label: "Đang thẩm định ĐB", color: "bg-lime-500"},
    {code: 'WAITING_FOR_APPROVAL', label: "Chờ phê duyệt", color: "bg-green-400"},
    {code: 'APPROVING', label: "Đang phê duyệt", color: "bg-emerald-500"},
    {code: 'WAITING_FOR_DISBURSEMENT', label: "Chờ giải ngân", color: "bg-yellow-500"},
    {code: 'DISBURSED', label: "Đã từ chối", color: "bg-rose-400"},
];
