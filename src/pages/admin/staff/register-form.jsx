import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {
    Button, Card,
    DatePicker, Form,
    Input,
    Radio,
    Select,
} from "antd";
import {
    createUser,
    createUserName,
    findUserById,
} from "../../../api/userAPIs.js";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {GENDER, ROLE} from "../../../utils/const.js";
import Popup from "../../../components/Popup/PopUp.jsx";
import PersonIcon from "@mui/icons-material/Person";
import {Girl} from "@mui/icons-material";
import moment from "moment";

function RegisterForm() {
    const location = useLocation();
    const isView = location.pathname.includes("view");
    const isEdit = location.pathname.includes("edit");
    const {id} = useParams(); // Access the id from the URL
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [popup, setPopUpProperties] = useState({
        message: null,
        onClose: null,
        type: null,
    });
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUserName] = useState(''); // State để lưu trữ mã hồ sơ
    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                try {
                    const response = await findUserById(id);
                    if (response?.data?.result) {
                        setUserName(response?.data?.result?.username)
                        Object.entries(response?.data?.result).forEach(([key, value]) => {
                            if (['dob'].includes(key) && value) {
                                // Chuyển đổi giá trị ngày sang moment nếu key là ngày
                                form.setFieldValue(key, moment(value));
                            } else {
                                form.setFieldValue(key, value);
                            }
                        })
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData(); // Call the async function immediately
    }, [form, id]); // Add dependencies to the effect
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name == "role") {
            form.setFieldValue(name, [value])
        } else {
            form.setFieldValue(name, value)
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
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await createUser(form.getFieldValue());
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
                form.setFieldValue('username', null)
            } else {
                const response = await createUserName(fullname);
                form.setFieldValue('username', response?.data?.result)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {
                !isView && !isEdit ? (
                    <div className="w-full h-full bg-white grid grid-cols-2 items-center justify-center p-4 ">
                        {isPopupVisible && (
                            <Popup
                                message={popup.message}
                                onClose={popup.onClose}
                                type={popup.type}
                            />
                        )}
                        <Form initialValues={
                            {
                                fullname: null,
                                username: null,
                                phone: null,
                                password: null,
                                dob: null, // Convert to moment object
                                role: null,
                                gender: null
                            }
                        } onFinish={handleSubmit}
                              size={'large'} className={' bg-white w-full m-0 p-0 h-full !block'} form={form}
                              labelWrap={true} colon={false} labelAlign={'left'} labelCol={{span: 6}}
                              wrapperCol={{span: 16}}>
                            <Button
                                type="link"
                                className="!p-0 !m-0 flex items-center font-bold mb-4 !text-black hover:!text-[#CED0F8] transition-colors text-3xl"
                                onClick={() => navigate(-1)}>
                                <KeyboardReturnIcon className="mr-2"/>
                                {isView ? `Chi tiết tài khoản ${username}` : "Back"}
                            </Button>

                            <div className="w-full justify-center  flex items-center">
                                <div className="w-3/4">
                                    {
                                        !isView && !isEdit ? (
                                            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                                Tạo tài khoản
                                            </h2>
                                        ) : ''
                                    }
                                </div>
                            </div>
                            <div className={'ml-12'}>
                                <Form.Item required className={'w-full'} name={'fullname'}
                                           label={<><PersonIcon/>Họ và tên</>}>
                                    <Input onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                           readOnly={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'username'}
                                           label={<><PersonIcon/>Username</>}>
                                    <Input readOnly/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'phone'}
                                           label={<><PersonIcon/>SĐT</>}>
                                    <Input readOnly={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'password'}
                                           label={<><PersonIcon/>Mật khẩu</>}>
                                    <Input.Password
                                        readOnly={isView}
                                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    required
                                    className={'w-full'}
                                    name={'dob'}
                                    label={<><PersonIcon/>Ngày sinh</>}
                                >
                                    <DatePicker
                                        readOnly={isView}
                                        format={"DD/MM/YYYY"}
                                        placeholder="DD/MM/YYYY"
                                    />
                                </Form.Item>

                                <Form.Item required className={'w-full'} name={'role'}
                                           label={<><PersonIcon/>Vai trò</>}>
                                    <Select
                                        readOnly={isView}
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
                                </Form.Item>
                                <Form.Item name={'gender'} label={<><Girl/> Giới tính</>}>
                                    <Radio.Group readOnly={isView}
                                                 className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                                 options={GENDER.map((item) => ({
                                                     value: item.id, label: item.name,
                                                 }))}>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            {!isView && (
                                <div className={'w-full flex justify-center'}>
                                    <Button
                                        htmlType={'submit'}
                                        className={`w-2/3 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${
                                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                        readOnly={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Đang xử lý..."
                                            : !isEdit
                                                ? "Đăng ký"
                                                : "Cập nhật"}
                                    </Button>
                                </div>

                            )}
                        </Form>
                        <div className="flex justify-end">
                            <img
                                src="/assets/img/icon/creditimg.jpg"
                                alt="Illustration"
                                className="hidden md:block"
                            />
                        </div>
                    </div>
                ) : <div className="w-full h-full p-4 ">
                    {isPopupVisible && (
                        <Popup
                            message={popup.message}
                            onClose={popup.onClose}
                            type={popup.type}
                        />
                    )}
                    <Form initialValues={
                        {
                            fullname: null,
                            username: null,
                            phone: null,
                            password: null,
                            dob: null, // Convert to moment object
                            role: null,
                            gender: null
                        }
                    } onFinish={handleSubmit}
                          size={'large'} className={' bg-white w-full m-0 p-0 h-full !block'} form={form}
                          labelWrap={true} colon={false} labelAlign={'left'} labelCol={{span: 6}}
                          wrapperCol={{span: 16}}>
                        <Button
                            type="link"
                            className="!p-0 !m-0 mt-5 flex items-center font-bold !text-black hover:!text-[#CED0F8] transition-colors text-3xl"
                            onClick={() => navigate(-1)}>
                            <KeyboardReturnIcon className="mr-2"/>
                            {isView ? `Chi tiết tài khoản ${username}` : "Back"}
                        </Button>

                        <div className="w-full justify-center mt-10 flex items-center">
                            <div className="w-3/4">
                                {
                                    !isView && !isEdit ? (
                                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                            Tạo tài khoản
                                        </h2>
                                    ) : ''
                                }
                            </div>
                        </div>
                        <Card className={'p-[30px] w-full bg-[#f3f4f6]'}>
                            <div className={'w-full grid grid-cols-2'}>
                                <div>
                                    <Form.Item required className={'w-full'} name={'fullname'}
                                               label={<><PersonIcon/>Họ và tên</>}>
                                        <Input onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                               readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'username'}
                                               label={<><PersonIcon/>Username</>}>
                                        <Input readOnly/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'phone'}
                                               label={<><PersonIcon/>SĐT</>}>
                                        <Input readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'password'}
                                               label={<><PersonIcon/>Mật khẩu</>}>
                                        <Input.Password
                                            readOnly={isView}
                                            iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        required
                                        className={'w-full'}
                                        name={'dob'}
                                        label={<><PersonIcon/>Ngày sinh</>}
                                    >
                                        <DatePicker
                                            readOnly={isView}
                                            format={"DD/MM/YYYY"}
                                            placeholder="DD/MM/YYYY"
                                        />
                                    </Form.Item>

                                    <Form.Item required className={'w-full'} name={'role'}
                                               label={<><PersonIcon/>Vai trò</>}>
                                        <Select
                                            readOnly={isView}
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
                                    </Form.Item>
                                    <Form.Item name={'gender'} label={<><Girl/> Giới tính</>}>
                                        <Radio.Group readOnly={isView}
                                                     className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                                     options={GENDER.map((item) => ({
                                                         value: item.id, label: item.name,
                                                     }))}>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item required className={'w-full'} name={'CCCD'}
                                               label={<><PersonIcon/>CCCD</>}>
                                        <Input onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                               readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'MVN'}
                                               label={<><PersonIcon/>MVN</>}>
                                        <Input readOnly/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'Tỉnh/TP'}
                                               label={<><PersonIcon/>Tỉnh/TP</>}>
                                        <Input readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'password'}
                                               label={<><PersonIcon/>Quận/Huyện</>}>
                                        <Input readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'password'}
                                               label={<><PersonIcon/>Phường/Xã</>}>
                                        <Input readOnly={isView}/>
                                    </Form.Item>
                                    <Form.Item required className={'w-full'} name={'role'}
                                               label={<><PersonIcon/>Hiệu lực</>}>
                                        <Select
                                            readOnly={isView}
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
                                    </Form.Item>
                                </div>
                            </div>
                        </Card>
                        {!isView && (
                            <div className={'w-full flex justify-center'}>
                                <Button
                                    htmlType={'submit'}
                                    className={`w-2/3 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    readOnly={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Đang xử lý..."
                                        : !isEdit
                                            ? "Đăng ký"
                                            : "Cập nhật"}
                                </Button>
                            </div>

                        )}
                    </Form>
                </div>

            }
        </>
    );
}

export default RegisterForm;
