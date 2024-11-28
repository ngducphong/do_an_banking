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
export const ACTIVE = [{
    id: true,
    name: "Đang hoạt động (Active)"
}, {
    id: false,
    name: "Không hoạt động (Unactive)"
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
    {code: 'REJECTED_CHECK_HS', label: "Đã từ chối", color: "bg-rose-400"},
];
export const PERMISSIONS = [
    { code: 'RECEIVED', label: 'Nhận' },
    { code: 'WAITING_FOR_CHECK', label: 'Yêu cầu kiểm tra' },
    { code: 'CHECKING', label: 'Kiểm tra' },
    { code: 'WAITING_FOR_CIC_CHECK', label: 'Hoàn tất KT' },
    { code: 'REJECTED_CHECK_HS', label: 'Từ chối hồ sơ' },
    { code: 'CHECKING_CIC', label: 'Check CIC' },
    { code: 'WAITING_FOR_EVALUATION', label: 'Check thành công' },
    { code: 'REJECTED_CHECK_CIC', label: 'Từ chối CIC' },
    { code: 'EVALUATING', label: 'Yêu cầu thẩm định' },
    { code: 'WAITING_FOR_FINAL_EVALUATION', label: 'Thẩm định' },
    { code: 'REJECTED_CHECK_DT', label: 'Từ chối Thẩm định DT' },
    { code: 'FINAL_EVALUATION', label: 'Yêu cầu thẩm định' },
    { code: 'WAITING_FOR_APPROVAL', label: 'Thẩm định' },
    { code: 'REJECTED_CHECK_DB', label: 'Từ chối  Thẩm định DB' },
    { code: 'APPROVING', label: 'Yêu cầu phê duyệt' },
    { code: 'WAITING_FOR_DISBURSEMENT', label: 'Phê duyệt' },
    { code: 'REJECTED_CHECK_PD', label: 'Từ chối Phê duyệt' },
    { code: 'DISBURSED', label: 'Đã giải ngân' },
];
