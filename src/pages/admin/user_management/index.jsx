import { Button, Input, Select, DatePicker, Form } from "antd";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../../../redux/reducer/userSlice";
import FormUser from "../../../components/form/FormUser";
import { createUser, editUserApi } from "../../../api/userAPIs";
import { CircularProgress, Grid } from "@mui/material";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

// Additional Components for Permissions UI
const PermissionSection = ({ title, categories }) => (
    <div className="permission-section">
        <h3>{title}</h3>
        {categories.map((category, index) => (
            <Category key={index} name={category.name} options={category.options} />
        ))}
    </div>
);

const Category = ({ name, options }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="category">
            <label>{name}</label>
            <div className="radio-group">
                {options.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default function UserManagement() {
    const allUsers = useSelector((state) => state.userSlice.users);
    const isLoadingThunk = useSelector((state) => state.userSlice.loading);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editUser, setEditUser] = useState(null);
    const [flag, setFlag] = useState(false);
    const [removeFilter, setRemoveFilter] = useState(false);
    const [searchTerms, setSearchTerms] = useState({
        username: "",
        fullName: "",
        phone: "",
        email: "",
        createDate: null,
        role: "",
        voided: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = allUsers.slice(indexOfFirstItem, indexOfLastItem);

    const openForm = () => setShowForm(true);
    const closeForm = () => {
        setShowForm(false);
        setEditUser(null);
    };

    const handlePageChange = (event, value) => setCurrentPage(value);

    const roles = [
        { value: "0", label: "Quản trị viên" },
        { value: "1", label: "Hệ thống" },
        { value: "2", label: "Học viên" }
    ];

    const statuses = [
        { value: true, label: "Bị Khóa" },
        { value: false, label: "Đang hoạt động" }
    ];

    useEffect(() => {
        dispatch(getUsersThunk());
    }, [flag, dispatch]);

    const handleSave = async (userData) => {
        if (userData.type === "add") {
            await createUser(userData);
            setFlag(!flag);
            closeForm();
        } else {
            await editUserApi(userData);
            setFlag(!flag);
            closeForm();
        }
    };



    // Permission Data (Example Structure)
    const permissionCategories = [
        { name: "Hồ sơ", options: ["Nhận", "YC kiểm tra", "Kiểm tra", "Hoàn tất KT", "Từ chối"] },
        { name: "CIC", options: ["Check CIC", "Check thành công", "Từ chối"] },
        { name: "Thẩm định DT", options: ["YC thẩm định", "Thẩm định", "Từ chối"] },
        { name: "Phê duyệt", options: ["YC phê duyệt", "Phê duyệt", "Từ chối"] },
        { name: "Giải ngân", options: ["Đã giải ngân"] }
    ];

    return (
        <>
            <div className="px-6 py-3 flex flex-col w-full">
                <h1>Phân quyền</h1>
                <PermissionSection title="NV hồ sơ" categories={permissionCategories} />
                <PermissionSection title="CV tín dụng" categories={permissionCategories} />

                {/* User Management UI */}
                <div className="flex flex-col gap-4 w-full">
                    <Button type="primary" className="bg-blue-600" onClick={openForm}>
                        Thêm người dùng
                    </Button>

                </div>
            </div>
        </>
    );
}
