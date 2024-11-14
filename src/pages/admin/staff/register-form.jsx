import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {DatePicker} from "antd";
import {createUser, createUserName} from "../../../api/userAPIs.js";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";

function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: null,
        username: null,
        phone: null,
        password: null,
        birthDate: null,
        role: null,
        gender: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dateRequired, setDateRequired] = useState(false); // State for date requirement
    const [genderRequired, setGenderRequired] = useState(false); // State for date requirement
    const handleDateChange = (date, dateString) => {
        setFormData({...formData, birthDate: dateString});
        setDateRequired(false); // Reset date required state when date is selected
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.birthDate) {
            setDateRequired(true); // Set date required if not selected
            return;
        }
        if (!formData.gender) {
            setGenderRequired(true); // Set date required if not selected
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await createUser(formData);
            console.log(response)
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const generateUserName = async (fullName) => {
        try {
            if (fullName === "") {
                setFormData((prev) => ({...prev, username: ""})); // Reset username
            } else {
                const response = await createUserName(fullName);
                setFormData((prev) => ({...prev, username: response?.data?.result})); // Update username
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" w-full h-full bg-white flex items-center justify-center p-4 ">
            <div className="bg-white rounded-lg p-6 w-full">
                <button
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    onClick={() => navigate(-1)}
                >
                    <KeyboardReturnIcon className="mr-2"/> Back
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
                                        onBlur={() => generateUserName(formData.fullName)}
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
                                        readOnly={true}
                                        disabled={true}
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
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Mật khẩu <span className="text-red-600">(*)</span>
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900">
                                            {showPassword ? <EyeInvisibleOutlined onClick={toggleShowPassword}/> :
                                                <EyeOutlined onClick={toggleShowPassword}/>}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex pb-3">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Ngày sinh <span className="text-red-600">(*)</span>
                                    </label>
                                    <DatePicker
                                        className={`w-full ${dateRequired ? "border-red-600" : ""}`} // Add red border if required
                                        placeholder="DD/MM/YYYY"
                                        onChange={handleDateChange}
                                    />
                                </div>
                                {dateRequired && (
                                    <div className="text-red-600 text-sm">Ngày sinh là bắt buộc.</div> // Error message
                                )}

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

                                <div className="flex">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Giới tính <span className="text-red-600">(*)</span>
                                    </label>
                                    <div className="flex space-x-4">
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={true}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            Nam
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={false}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            Nữ
                                        </label>
                                    </div>
                                    {genderRequired && (
                                        <div className="text-red-600 text-sm">Giới tính là bắt buộc.</div> // Error message
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${
                                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
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
