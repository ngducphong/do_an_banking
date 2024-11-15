import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {
    Button,
    DatePicker,
    Input,
    Radio,
    Select,
    Typography,
} from "antd";
import {
    createUser,
    createUserName,
    findUserById,
} from "../../../api/userAPIs.js";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import {GENDER, ROLE} from "../../../utils/const.js";
import Popup from "../../../components/Popup/PopUp.jsx";
import moment from "moment/moment.js";

const {Title} = Typography;

function RegisterForm() {
    const location = useLocation();
    const isView = location.pathname.includes("view");
    const isEdit = location.pathname.includes("edit");
    const {id} = useParams(); // Access the id from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: null,
        username: null,
        phone: null,
        password: null,
        dob: null,
        role: null,
        gender: null,
    });
    const [popup, setPopUpProperties] = useState({
        message: null,
        onClose: null,
        type: null,
    });
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dateRequired, setDateRequired] = useState(false); // State for date requirement
    const [genderRequired, setGenderRequired] = useState(false); // State for date requirement
    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                try {
                    const response = await findUserById(id);
                    if (response?.data?.result) {
                        console.log(response.data.result);
                        setFormData({
                            fullname: response.data.result.fullname,
                            username: response.data.result.username,
                            phone: response.data.result.phone,
                            password: response.data.result.password,
                            dob: response.data.result.dob
                                ? moment(response.data.result.dob)
                                : null, // Convert to moment object
                            role: response.data.result.role,
                            gender: response.data.result.gender,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData(); // Call the async function immediately
    }, [id]); // Add dependencies to the effect
    const handleDateChange = (date, dateString) => {
        // Ensure date is valid
        if (date) {
            setFormData((prev) => ({
                ...prev,
                dob: date, // formatted string like "DD/MM/YYYY"
            }));
        } else {
            // If date is cleared or invalid
            setFormData((prev) => ({
                ...prev,
                dob: null,
            }));
        }
    };
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name == "role") {
            setFormData({...formData, [name]: [value]});
        } else {
            setFormData({...formData, [name]: value});
        }
    };
    const closePopUp = () => {
        setPopupVisible(false);
        if (popup.type === 'success') {
            navigate(-1);
        }
    };
    const setPopUpP = (message, onClose, type) => {
        setPopUpProperties({
            message: message,
            onClose: onClose,
            type: type,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDateRequired(false);
        setGenderRequired(false); // Set date required if not selected    // Set date required if not selected
        if (!formData.dob) {
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
            if (response?.data?.code === 100200) {
                setPopupVisible(true);
                setPopUpP("Bạn đã tạo tài khoản thành công", closePopUp, "success")
            }
            console.log(response);
        } catch (error) {
            setPopUpP("Có lỗi xảy ra", closePopUp, "warning")
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const generateUserName = async (fullname) => {
        try {
            if (fullname === "" || !fullname) {
                setFormData((prev) => ({...prev, username: ""})); // Reset username
            } else {
                const response = await createUserName(fullname);
                setFormData((prev) => ({...prev, username: response?.data?.result})); // Update username
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" w-full h-full bg-white grid grid-cols-2 items-center justify-center p-4 ">
            {isPopupVisible && (
                <Popup
                    message={popup.message}
                    onClose={popup.onClose}
                    type={popup.type}
                />
            )}
            <div className="bg-white rounded-lg p-6 w-full h-full">
                <Button
                    type="link"
                    className="!p-0 !m-0 flex items-center font-bold mb-4 !text-black hover:!text-[#CED0F8] transition-colors text-3xl"
                    onClick={() => navigate(-1)}
                >
                    <KeyboardReturnIcon className="mr-2"/>
                    {isView ? `Chi tiết tài khoản ${formData.username}` : "Back"}
                </Button>

                <div className="w-full h-full justify-center  flex items-center">
                    <div className="w-3/4">
                        {
                            !isView && !isEdit ? (
                                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                    Tạo tài khoản
                                </h2>
                            ) : ''
                        }

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="flex pb-3">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Họ và tên<span className="text-red-600">(*)</span>
                                    </label>
                                    <Input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                        disabled={isView}
                                        onBlur={() => generateUserName(formData.fullname)}
                                        className="w-1/3 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                    />
                                </div>

                                <div className="flex pb-3 justify-center items-center">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Username<span className="text-red-600">(*)</span>
                                    </label>
                                    <Input
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
                                    <Input
                                        disabled={isView}
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
                                        <Input
                                            disabled={isView}
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900">
                      {showPassword ? (
                          <EyeInvisibleOutlined onClick={toggleShowPassword}/>
                      ) : (
                          <EyeOutlined onClick={toggleShowPassword}/>
                      )}
                    </span>
                                    </div>
                                </div>

                                <div className="flex pb-3">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Ngày sinh <span className="text-red-600">(*)</span>
                                    </label>
                                    <DatePicker
                                        disabled={isView}
                                        defaultValue={null}
                                        value={formData.dob} // Convert string to moment object
                                        format={"DD/MM/YYYY"}
                                        className={`w-full ${dateRequired ? "border-red-600" : ""}`} // Add red border if required
                                        placeholder="DD/MM/YYYY"
                                        onChange={handleDateChange}
                                    />
                                </div>
                                {dateRequired && (
                                    <div className="text-red-600 text-sm">
                                        Ngày sinh là bắt buộc.
                                    </div> // Error message
                                )}

                                <div className="flex pb-3">
                                    <Title
                                        level={5}
                                        className="flex w-32 text-gray-700 font-bold mb-1 items-center"
                                    >
                                        Vai trò <span className="text-red-600">(*)</span>
                                    </Title>

                                    <Select
                                        name="role"
                                        disabled={isView}
                                        value={formData.role}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            const syntheticEvent = {
                                                target: {
                                                    name: "role",
                                                    value: selectedValues, // Pass the selected values directly
                                                },
                                            };
                                            handleChange(syntheticEvent); // Call your existing handleChange
                                        }}
                                        className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        options={ROLE.map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                        }))}
                                    />
                                </div>
                                <div className="flex pb-3">
                                    <label className="flex w-32 text-gray-700 font-bold mb-1 items-center">
                                        Giới tính <span className="text-red-600">(*)</span>
                                    </label>
                                    <Radio.Group
                                        disabled={isView}
                                        value={formData.gender}
                                        name="gender"
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        options={GENDER.map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                        }))}
                                    ></Radio.Group>
                                </div>
                                {genderRequired && (
                                    <div className="text-red-600 text-sm">
                                        Giới tính là bắt buộc.
                                    </div> // Error message
                                )}
                            </div>
                            {!isView && (
                                <button
                                    type="submit"
                                    className={`w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Đang xử lý..."
                                        : !isEdit
                                            ? "Đăng ký"
                                            : "Cập nhật"}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
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
