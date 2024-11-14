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
import moment from "moment";

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
      render: (dob) => (
        <span>{dob ? moment(dob).format("DD/MM/YYYY") : ""}</span>
      ),
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
      dataIndex: "createdAt",
      key: "createdAt",
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
      render: (createdAt) => (
        <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Xem chi tiết",
      key: "view",
      render: (row) => (
        <Button
          icon={<EyeOutlined />}
          type="link"
          onClick={() => navigateTo(`/view/${row?.id}`)}
        />
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#CED0F8" },
      }),
    },
    {
      title: "Sửa",
      key: "edit",
      render: (row) => (
        <Button
          icon={<EditOutlined />}
          type="link"
          onClick={() => navigateTo(`/edit/${row?.id}`)}
        />
      ),
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
        setTotalResults(response.data?.result?.totalElements || 0); // Update total record count
      }
    };

    fetchData();
  }, [currentPage]); // Dependency ensures re-fetching when page changes

  const onPageChange = (page) => {
    setCurrentPage(page); // Update state, triggers re-fetch
  };

  const navigateTo = (path) => {
    navigate(`/admin/staff${path}`);
  };
  const viewStaf = (id) => {
    navigate(`/admin/staff/view/${id}`);
  };
  return (
    <div className="p-[20px] w-full h-full">
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigateTo("/create")}
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
