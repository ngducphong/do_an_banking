import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { DatePicker } from "antd";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    birthDate: "",
    role: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setFormData({ ...formData, birthDate: dateString });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className=" w-full h-full bg-white flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg p-6 w-full">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          onClick={() => navigate(-1)}
        >
          <KeyboardReturnIcon className="mr-2" /> Back
        </button>
        <div className="w-full h-full justify-center  flex items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Tạo tài khoản
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex pb-3">
                  <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Họ và tên<span className="text-red-600">(*)</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-1/3 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                  />
                </div>

                <div className="flex pb-3 justify-center items-center">
                  <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Username<span className="text-red-600">(*)</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-1/3 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                  />
                </div>

                <div className="flex pb-3">
                  <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                    SĐT <span className="text-red-600">(*)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-1/3 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                  />
                </div>

                <div className="flex pb-3">
                  <label className=" flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Mật khẩu <span className="text-red-600">(*)</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-1/3 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                  />
                </div>

                <div className="flex pb-3">
                  <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Ngày sinh <span className="text-red-600">(*)</span>
                  </label>
                  <DatePicker
                    className="w-full"
                    placeholder="DD/MM/YYYY"
                    onChange={handleDateChange}
                  />
                </div>

                <div className="flex pb-3">
                  <label className=" flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Vai trò
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="approver">Chuyên viên phê duyệt</option>
                  </select>
                </div>

                <div className="flex ">
                  <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                    Giới tính <span className="text-red-600">(*)</span>
                  </label>
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={formData.gender === "Nam"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Nam
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={formData.gender === "Nữ"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Nữ
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="ml-8">
        <img
          src="/assets/img/icon/creditimg.jpg"
          alt="Illustration"
          className="hidden md:block"
        />
      </div>
    </div>
  );
}

export default RegisterForm;
