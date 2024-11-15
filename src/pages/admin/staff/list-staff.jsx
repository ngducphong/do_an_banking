import React, {useState, useEffect, useCallback} from "react";
import {Button, Input, Table, Space, Pagination, Spin} from "antd";
import {
    PlusOutlined,
    FilterOutlined,
    EyeOutlined,
    EditOutlined,
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {paging} from "../../../api/userAPIs";
import moment from "moment";
import {CONVERT_ROLE} from "../../../utils/const.js";

const {Search} = Input;

const ListStaff = () => {
    const [data, setData] = useState([]); // Initial data from API
    const [currentPage, setCurrentPage] = useState(1); // First page by default
    const [keyword, setKeyword] = useState(null); // First page by default
    const [totalResults, setTotalResults] = useState(0); // Total number of records
    const navigate = useNavigate();
    const [loading, showLoading] = useState(false);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            className: "text-center",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
            key: "fullname",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dob",
            key: "dob",
            className: "text-center",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
            render: (dob) => (
                <span>{dob ? moment(dob).format("DD/MM/YYYY") : ""}</span>
            ),
        },
        {
            title: "Vai trò",
            dataIndex: "roles",
            key: "roles",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
            render: (roles) => (
                <span>{roles ? CONVERT_ROLE(roles) : ""}</span>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            className: "text-center",
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
            render: (createdAt) => (
                <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Xem chi tiết",
            key: "view",
            className: "text-center",
            render: (row) => (
                <Button
                    icon={<EyeOutlined className="text-[#d4b0f8] text-xl"/>}
                    type="link"
                    onClick={() => navigateTo(`/view/${row?.id}`)}
                />
            ),
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
        {
            title: "Sửa",
            key: "edit",
            className: "text-center",
            render: (row) => (
                <Button
                    icon={<EditOutlined className="text-[#d4b0f8] text-xl"/>}
                    type="link"
                    onClick={() => navigateTo(`/edit/${row?.id}`)}
                />
            ),
            onHeaderCell: () => ({
                style: {backgroundColor: "#CED0F8"},
            }),
        },
    ];
    const fetchData = useCallback(async () => {
        showLoading(true)
        try {
            const response = await paging({
                pageIndex: currentPage,
                pageSize: 10,
                keyword,
            });
            setData(response?.data?.result?.content || []);
            setTotalResults(response?.data?.result?.totalElements || 0);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            showLoading(false)
        }
    }, [currentPage, keyword]);
    useEffect(() => {
        fetchData();
    }, [fetchData]); // Dependency ensures re-fetching when page changes
    const onPageChange = (page) => {
        setCurrentPage(page); // Update state, triggers re-fetch
    };
    const navigateTo = (path) => {
        navigate(`/admin/staff${path}`);
    };
    const onSearch = (value) => {
        setKeyword(value);
        setCurrentPage(1); // Reset to first page for new search
    };
    return (
        <div className="mt-3 w-full h-full p-3">
            <Spin spinning={loading} fullscreen/>
            <Space className="ml-3 mb-4">
                <Button
                    className="bg-[#CED0F8] font-bold"
                    icon={<PlusOutlined/>}
                    onClick={() => navigateTo("/create")}
                >
                    Thêm tài khoản
                </Button>
                <Button className="h-max bg-[#CED0F8] font-bold" icon={<FilterOutlined/>}>Lọc tài khoản</Button>
                <Search
                    placeholder="Tìm kiếm tài khoản"
                    onSearch={onSearch}
                    style={{
                        width: 500,
                        padding: 0,
                        color: '#CED0F8'
                    }}
                /> </Space>
            <div className="mb-3 font-bold grid grid-cols-2 items-center">
                <div className="text-2xl ml-3">Tất cả tài khoản nhân viên</div>
                <div className="text-end">
                    Tổng kết quả: {totalResults}
                </div>
            </div>
            <Table
                className="shadow-2xl"
                columns={columns}
                dataSource={data} // Use fetched data here
                pagination={false}
                bordered
            />
            <Pagination
                className="custom-pagination text-center mt-[16px] justify-center text-2xl"
                current={currentPage}
                total={totalResults}
                pageSize={10}
                onChange={onPageChange}
                showSizeChanger={false}
            />
        </div>
    );
};

export default ListStaff;
