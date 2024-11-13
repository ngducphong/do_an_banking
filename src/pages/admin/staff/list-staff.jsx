import React, { useState, useEffect } from "react";
import { Button, Input, Table, Space, Pagination } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { paging } from "../../../api/userAPIs";

const ListStaff = () => {
  const [data, setData] = useState([]); // Initial data from API
  const [currentPage, setCurrentPage] = useState(1); // First page by default
  const [totalResults, setTotalResults] = useState(0); // Total number of records
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Xem chi tiết",
      key: "view",
      render: () => <Button icon={<EyeOutlined />} type="link" />,
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Sửa",
      key: "edit",
      render: () => <Button icon={<EditOutlined />} type="link" />,
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const searchRequest = {
        pageIndex: currentPage, // Adjust for 0-indexed API
        pageSize: 10,
      };
      const response = await paging(searchRequest);
      if (response) {
        console.log(response);
        
        setData(response?.data?.result?.content || []); // Update table data
        setTotalResults(response.totalElements || 0); // Update total record count
      }
    };

    fetchData();
  }, [currentPage]); // Dependency ensures re-fetching when page changes

  const onPageChange = (page) => {
    setCurrentPage(page); // Update state, triggers re-fetch
  };

  const createStaff = (path) => {
    navigate(`/admin/staff${path}`);
  };

  return (
    <div className="p-[20px] w-full h-full">
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => createStaff("/create")}
        >
          Thêm tài khoản
        </Button>
        <Button icon={<FilterOutlined />}>Lọc tài khoản</Button>
        <Input.Search placeholder="Tìm kiếm tài khoản" style={{ width: 200 }} />
      </Space>

      <h3 style={{ color: "#4A90E2" }}>Tất cả tài khoản nhân viên</h3>
      <div style={{ textAlign: "right", color: "#4A90E2", marginBottom: 16 }}>
        Tổng kết quả: {totalResults}
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
