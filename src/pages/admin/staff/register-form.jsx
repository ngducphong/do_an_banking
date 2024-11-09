import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { DatePicker, Input } from "antd";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };
  return (
    <div className="register-form items-center justify-center">
      <button className="back-button" onClick={() => navigate(-1)}>
        <KeyboardReturnIcon></KeyboardReturnIcon> Back
      </button>
      <h2>Tạo tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1">
          <label className="text-xl">
            Họ và tên <span className="text-red-600">(*)</span>
            <Input
              label="Họ và tên"
              className="ml-3 w-2/3"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-xl">
            Username <span className="text-red-600">(*)</span>
            <Input
              className="ml-3 w-2/3"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-xl">
            SĐT <span className="text-red-600">(*)</span>
            <Input
              className="ml-3 w-2/3"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-xl">
            Mật khẩu <span className="text-red-600">(*)</span>
            <Input
              className="ml-3 w-2/3"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-xl">
            Ngày sinh <span className="text-red-600">(*)</span>
            <DatePicker
              className="ml-3 w-2/3"
              placeholder="DD/MM/YYYY"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-xl">
            Vai trò
            <select
              className="ml-3 w-2/3"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Chọn vai trò</option>
              <option value="approver">Chuyên viên phê duyệt</option>
              {/* Add more roles as needed */}
            </select>
          </label>

          <label>
            Giới tính (*)
            <div className="gender-options ml-3 w-2/3">
              <label className="ml-3 w-2/3">
                <Input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label className="ml-3 w-2/3">
                <Input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={handleChange}
                />
                Nữ
              </label>
            </div>
          </label>
        </div>

        <button type="submit" className="submit-button">
          Đăng ký
        </button>
      </form>

      <div className="illustration">
        {/* Illustration element here, you can use an img tag or an SVG as per your design */}
      </div>
    </div>
  );
}

export default RegisterForm;
