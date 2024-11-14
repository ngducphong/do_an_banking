import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Card } from 'antd';
import {addPermissionsToRole, getPermissionsByRoleName} from "../../../api/permissionsAPIs.js";
const roles = [
    { title: "Chuyên viên tín dụng", key: "RECORDSTAFF" },
    { title: "NV thẩm định", key: "CREDIT_OFFICER" },
    { title: "CV phê duyệt", key: "APPRAISAL_OFFICER" },
    { title: "NV giải ngân", key: "AUTHORIZATION_MANAGER" },
    { title: "NV hồ sơ", key: "FILE_OFFICER" }
];

// Updated permissionsBySection with objects containing label and value for each checkbox option
const permissionsBySection = {
    HoSo: [
        { value: "RECEIVED", label: "Nhận" },
        { value: "REQUEST_CHECK", label: "Yêu cầu kiểm tra" },
        { value: "WAITING_FOR_CHECK", label: "Kiểm tra" },
        { value: "CHECKING", label: "Hoàn tất KT" },
        { value: "CHECK_COMPLETED", label: "Từ chối" }
    ],
    CIC: [
        { value: "REJECTED_CHECK", label: "Check CIC" },
        { value: "WAITING_FOR_CIC_CHECK", label: "Check thành công" },
        { value: "CHECKING_CIC", label: "Từ chối" }
    ],
    ThamDinhDT: [
        { value: "CIC_CHECK_SUCCESS", label: "Yêu cầu thẩm định" },
        { value: "WAITING_FOR_EVALUATION", label: "Thẩm định" },
        { value: "REQUEST_EVALUATION", label: "Từ chối" }
    ],
    ThamDinhDB: [
        { value: "EVALUATING", label: "Yêu cầu thẩm định" },
        { value: "WAITING_FOR_FINAL_EVALUATION", label: "Thẩm định" },
        { value: "FINAL_EVALUATION", label: "Từ chối" }
    ],
    PheDuyet: [
        { value: "WAITING_FOR_APPROVAL", label: "Yêu cầu phê duyệt" },
        { value: "REQUEST_APPROVAL", label: "Phê duyệt" },
        { value: "APPROVING", label: "Từ chối" }
    ],
    GiaiNgan: [
        { value: "WAITING_FOR_DISBURSEMENT", label: "Đợi giải ngân" },
        { value: "DISBURSED", label: "Đã giải ngân" }
    ]
};

export default function PermissionForm() {
    const [selectedPermissions, setSelectedPermissions] = useState(
        roles.reduce((acc, role) => {
            acc[role.key] = {
                HoSo: [],
                CIC: [],
                ThamDinhDT: [],
                ThamDinhDB: [],
                PheDuyet: [],
                GiaiNgan: []
            };
            return acc;
        }, {})
    );

    useEffect(() => {
        // Hàm cập nhật selectedPermissions dựa trên dữ liệu trả về từ API
        const fetchPermissions = async () => {
            const updatedPermissions = { ...selectedPermissions };

            // Sử dụng Promise.all để gọi API cho tất cả các roles cùng lúc
            await Promise.all(roles.map(async (role) => {
                const data = await getPermissionsByRoleName(role.key);

                // Nếu data tồn tại, phân loại quyền theo các section
                if (data) {
                    Object.keys(permissionsBySection).forEach(sectionKey => {
                        const sectionPermissions = permissionsBySection[sectionKey].map(p => p.value);
                        updatedPermissions[role.key][sectionKey] = data
                            .filter(permission => sectionPermissions.includes(permission.code))
                            .map(permission => permission.code);
                    });
                }
            }));
            setSelectedPermissions(updatedPermissions);
        };

        fetchPermissions();
    }, []);

    const handleCheckboxChange = (roleKey, sectionKey, checkedValues) => {
        setSelectedPermissions((prevPermissions) => ({
            ...prevPermissions,
            [roleKey]: {
                ...prevPermissions[roleKey],
                [sectionKey]: checkedValues
            }
        }));
    };

    // const handleSubmit = () => {
    //     console.log('Selected Permissions:', selectedPermissions);
    //     // Submit logic here
    // };

    const handleSubmit = async () => {
        try {
            await Promise.all(
                roles.map(async (role) => {
                    // Tạo danh sách `apiCodes` từ các quyền đã chọn trong `selectedPermissions`
                    const apiCodes = Object.values(selectedPermissions[role.key]).flat();
                    if (apiCodes.length > 0) {
                        // Gọi API để thêm quyền cho từng vai trò
                        const response = await addPermissionsToRole(role.key, apiCodes);
                        if (response) {
                            console.log(`Quyền đã được thêm cho vai trò ${role.title}:`, response);
                        }
                    }
                })
            );
            console.log("Quyền đã được cập nhật cho tất cả vai trò.");
        } catch (error) {
            console.error("Lỗi khi cập nhật quyền:", error);
        }
    };

    return (
        <div>
            <h2>Phân quyền</h2>
            {roles.map((role) => (
                <Card key={role.key} title={role.title} style={{ marginBottom: 16 }}>
                    {Object.keys(permissionsBySection).map((sectionKey) => (
                        <div key={sectionKey} style={{ marginBottom: 12 }}>
                            <label>{sectionKey}</label>
                            <Checkbox.Group
                                options={permissionsBySection[sectionKey]}
                                value={selectedPermissions[role.key][sectionKey]}
                                onChange={(checkedValues) => handleCheckboxChange(role.key, sectionKey, checkedValues)}
                            />
                        </div>
                    ))}
                </Card>
            ))}
            <Button type="primary" onClick={handleSubmit}>
                Cập nhật
            </Button>
        </div>
    );
}
