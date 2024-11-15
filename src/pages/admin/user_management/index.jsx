import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Card, Modal } from 'antd';
import { addPermissionsToRole, getPermissionsByRoleName } from "../../../api/permissionsAPIs.js";
import { CheckCircleOutlined } from '@ant-design/icons';
const roles = [
    { title: "Chuyên viên tín dụng", key: "RECORDSTAFF" },
    { title: "NV thẩm định", key: "CREDIT_OFFICER" },
    { title: "CV phê duyệt", key: "APPRAISAL_OFFICER" },
    { title: "NV giải ngân", key: "AUTHORIZATION_MANAGER" },
    { title: "NV hồ sơ", key: "FILE_OFFICER" }
];

// Updated permissionsBySection with objects containing label and value for each checkbox option
const permissionsBySection = {
    "Hồ sơ": [
        { value: "RECEIVED", label: "Nhận" },
        { value: "WAITING_FOR_CHECK", label: "Yêu cầu kiểm tra" },
        { value: "CHECKING", label: "Kiểm tra" },
        { value: "WAITING_FOR_CIC_CHECK", label: "Hoàn tất KT" },
        { value: "REJECTED_CHECK_HS", label: "Từ chối" }
    ],
    "CIC": [
        { value: "CHECKING_CIC", label: "Check CIC" },
        { value: "WAITING_FOR_EVALUATION", label: "Check thành công" },
        { value: "REJECTED_CHECK_CIC", label: "Từ chối" }
    ],

    "Thẩm định ĐT": [
        { value: "EVALUATING", label: "Yêu cầu thẩm định" },
        { value: "WAITING_FOR_FINAL_EVALUATION", label: "Thẩm định" },
        { value: "REJECTED_CHECK_DT", label: "Từ chối" }
    ],
    "Thẩm định ĐB": [
        { value: "FINAL_EVALUATION", label: "Yêu cầu thẩm định" },
        { value: "WAITING_FOR_APPROVAL", label: "Thẩm định" },
        { value: "REJECTED_CHECK_DB", label: "Từ chối" }
    ],
    "Phê duyệt": [
        { value: "APPROVING", label: "Yêu cầu phê duyệt" },
        { value: "WAITING_FOR_DISBURSEMENT", label: "Phê duyệt" },
        { value: "REJECTED_CHECK_PD", label: "Từ chối" }
    ],
    "Giải ngân": [
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
    const [isModalVisible, setIsModalVisible] = useState(false); // State để điều khiển modal

    const handleSubmit = async () => {
        try {
            await Promise.all(
                roles.map(async (role) => {
                    const apiCodes = Object.values(selectedPermissions[role.key]).flat();
                    if (apiCodes.length > 0) {
                        const response = await addPermissionsToRole(role.key, apiCodes);
                        if (response) {
                            console.log(`Quyền đã được thêm cho vai trò ${role.title}:`, response);
                        }
                    }
                })
            );
            setIsModalVisible(true); // Hiển thị modal khi cập nhật thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật quyền:", error);
        }
    };
    const handleModalClose = () => {
        setIsModalVisible(false); // Đóng modal khi nhấn nút "OK"
    };

    return (
        <div className="permission-container">
            <h2 style={{ textAlign: "left" }}>Phân quyền</h2>
            {roles.map((role) => (
                <Card key={role.key} title={role.title} className="role-card">
                    {Object.keys(permissionsBySection).map((sectionKey) => (
                        <div key={sectionKey} className="checkbox-group-container">
                            <label className="section-label">{sectionKey}</label>
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

            {/* Modal thông báo cập nhật thành công */}
            <Modal
                visible={isModalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                footer={[
                    <Button key="ok" style={{color:'#FFF', backgroundColor:'#7e57c2'}} onClick={handleModalClose}>
                        OK
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', alignItems: 'center'}}>

                    <div>
                        <h3 style={{margin:'20px'}}>Thông báo</h3>
                        <p><CheckCircleOutlined style={{ fontSize: '24px', color: 'green', marginRight: '10px' }} /> Phân quyền được cập nhật thành công</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
