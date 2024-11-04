import React, { useState } from "react";
import { Button, Input, Table, Space, Pagination } from "antd";
import {
  PlusOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

const ListStaff = () => {
  const [data, setData] = useState([]); // Replace with your data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults] = useState(256); // Example total results

  // Columns definition
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
      dataIndex: "fullName",
      key: "fullName",
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

  // Dummy data (for testing)
  const dummyData = Array.from({ length: 10 }, (_, i) => ({
    key: i,
    id: i + 1,
    fullName: "Nguyễn Văn A",
    username: `user${i + 1}`,
    phone: "0123456789",
    dob: "1990-01-01",
    role: "Nhân viên",
    createdDate: "2024-01-01",
  }));

  // Pagination handler
  const onPageChange = (page) => {
    setCurrentPage(page);
    // You would typically fetch new data based on page here
  };
  return (
    <div className="p-[20px] w-full h-full ">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>
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
        dataSource={dummyData} // Replace with `data` when using actual data
        pagination={false}
        bordered
        header
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
