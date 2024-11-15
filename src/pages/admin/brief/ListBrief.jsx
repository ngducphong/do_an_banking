import {useCallback, useEffect, useState} from "react";
import {Pagination, Table} from "antd";
import moment from "moment/moment.js";
import {useNavigate} from "react-router-dom";
import {paging} from "../../../api/loanReqInfoAPIs.js";
import {STATUSES} from "../../../utils/const.js";

const ListBrief = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // First page by default
    const [totalResults, setTotalResults] = useState(0); // Total number of records// Initial data from API
    const navigate = useNavigate();
    const [loading, showLoading] = useState(false);
    const [clickedCodes, setClickedCodes] = useState([]);
    const columns = [
        {
            title: "Mã hồ sơ",
            dataIndex: "maHoSo",
            key: "maHoSo",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Họ và tên",
            dataIndex: "hoVaTen",
            key: "hoVaTen",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Sản phẩm vay",
            dataIndex: "sanPhamVay",
            key: "sanPhamVay",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Số tiền vay",
            dataIndex: "soTienVay",
            key: "soTienVay",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Kỳ hạn",
            dataIndex: "kyHan",
            key: "kyHan",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "phuongThucThanhToan",
            key: "phuongThucThanhToan",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
        {
            title: "Ngày đăng ký",
            dataIndex: "ngayDangKy",
            key: "ngayDangKy",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
            render: (ngayDangKy) => (
                <span>{moment(ngayDangKy).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            key: "trangThai",
            onHeaderCell: () => ({
                style: { backgroundColor: "#CED0F8" },
            }),
        },
    ];
    const navigateTo = (path) => {
        navigate(`/admin/staff${path}`);
    };
    // Dependency ensures re-fetching when page changes
    const onPageChange = (page) => {
        setCurrentPage(page); // Update state, triggers re-fetch
    };
    const fetchData = useCallback(async () => {
        showLoading(true)
        try {
            const response = await paging({
                pageIndex: currentPage,
                pageSize: 10,
                clickedCodes,
            });
            setData(response?.data?.result?.content || []);
            setTotalResults(response?.data?.result?.totalElements || 0);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            showLoading(false)
        }
    }, [currentPage, clickedCodes]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const handleBadgeClick = (index) => {
        const status = STATUSES[index];
        setClickedCodes((prev) => {
            if (prev.includes(status.code)) {
                // If already clicked, remove it from the array
                return prev.filter((code) => code !== status.code);
            } else {
                // Add the code to the array
                return [...prev, status.code];
            }
        });
    };

    useEffect(() => {
        console.log('Clicked Codes:', clickedCodes);
    }, [clickedCodes]); // Logs whenever clickedCodes changes
    return (
        <div className="p-6 w-full h-full ">
            <div className="mb-3 pb-3">
                <h1 className="text-2xl font-bold mb-6">DANH SÁCH HỒ SƠ</h1>
                <div className="ml-3 mr-3 grid grid-cols-8 gap-4 text-[10px]">
                    {STATUSES.map((status, index) => (
                        <button
                            key={index}
                            onClick={() => handleBadgeClick(index)}
                            className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${status.color} ${
                                clickedCodes.includes(status.code) ? "opacity-100" : "opacity-50"
                            }`}
                        >
                            <span className="text-lg mr-2">✖</span>
                            {status.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-3 font-bold grid grid-cols-2 items-center">
                <div className="text-2xl ml-3">Tất cả tài khoản hồ sơ vay</div>
                <div className="text-end">
                    Tổng kết quả: {totalResults}
                </div>
            </div>
            <div className="mt-3">
                <Table
                    className="w-full h-full shadow-2xl bg-white rounded overflow-hidden"
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
        </div>
    );
};

export default ListBrief;
