import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {
    Button, Card, DatePicker, Form, Input, notification, Radio, Select,
} from "antd";
import {
    createUser, createUserName, findUserById, updateUser,
} from "../../../api/userAPIs.js";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {ACTIVE, GENDER, ROLE} from "../../../utils/const.js";
import Popup from "../../../components/Popup/PopUp.jsx";
import PersonIcon from "@mui/icons-material/Person";
import {Girl} from "@mui/icons-material";
import moment from "moment";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BadgeIcon from '@mui/icons-material/Badge';
import HttpsIcon from '@mui/icons-material/Https';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import GroupIcon from '@mui/icons-material/Group';
import BoltIcon from '@mui/icons-material/Bolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import {fetchDistricts, fetchProvinces, fetchWards} from "../../../api/locationAPIs.js";
import dayjs from "dayjs";

function RegisterForm() {
    const location = useLocation();
    const isView = location.pathname.includes("view");
    const isEdit = location.pathname.includes("edit");
    const {id} = useParams(); // Access the id from the URL
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [popup, setPopUpProperties] = useState({
        message: null, onClose: null, type: null,
    });
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [username, setUserName] = useState('');
    const [province, setProvinces] = useState([])// State để lưu trữ mã hồ sơ
    const [district, setDistricts] = useState()// State để lưu trữ mã hồ sơ
    const [ward, setWards] = useState()// State để lưu trữ mã hồ sơ
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        fetchUserData();
        getListProvince()// Call the async function immediately
    }, [form, id]);
    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
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
                        } else if (['roles'].includes(key) && value) {
                            form.setFieldValue(key, value[0]);
                        } else {
                            form.setFieldValue(key, value);
                        }
                    })
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };// Add dependencies to the effect
    const getListProvince = async () => {
        const data = await fetchProvinces()
        setProvinces(data)
    }
    const getListDistrict = async (id) => {
        const data = await fetchDistricts(id)
        setDistricts(data)
    }
    const getListWard = async (id) => {
        const data = await fetchWards(id)
        setWards(data)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name == "role") {
            form.setFieldValue(name, [value])
        } else {
            form.setFieldValue(name, value)
        }
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            let response;
            if (!isEdit) {
                response = await createUser(form.getFieldValue())
            } else {
                response = await updateUser(form.getFieldValue())
            }

            if (response?.data?.code === 100200) {
                if (!isEdit) {
                    // Show success notification
                    openNotificationWithIcon('success', 'Thành công', 'Thêm mới nhân viên thành công');
                } else {
                    openNotificationWithIcon('success', 'Thành công', 'Cập nhật nhân viên thành công');
                }
                // Use a delayed navigation with state
                setTimeout(() => {
                    navigate('/admin/staff', {state: {success: true}});
                }, 500); // Slight delay to ensure the notification is rendered
            }
        } catch (error) {
            openNotificationWithIcon('error', 'Lỗi', 'Có lỗi xảy ra trong quá trình thêm mới nhân viên');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (location.state?.success) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới nhân viên thành công');
        }
    }, [location.state]);
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
    return (<>
        {contextHolder}
        {!isView && !isEdit ? (
                <div className="w-full h-full bg-white grid grid-cols-2 items-center justify-center p-4 ">
                    {isPopupVisible && (<Popup
                        message={popup.message}
                        onClose={popup.onClose}
                        type={popup.type}
                    />)}
                    <Form initialValues={{
                        fullname: null, username: null, phone: null, password: null, dob: null, // Convert to moment object
                        role: null, gender: null
                    }} onFinish={handleSubmit}
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
                                {!isView && !isEdit ? (
                                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                        Tạo tài khoản
                                    </h2>) : ''}
                            </div>
                        </div>
                        <div className={'ml-12'}>
                            <Form.Item rules={[{
                                required: true,
                                message: 'Họ và tên không được để trống'
                            }
                            ]} required className={'w-full'} name={'fullname'}
                                       label={<><PersonIcon/>Họ và tên</>}>
                                <Input disabled={isView} onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                       disabled={isView}
                                />
                            </Form.Item>
                            <Form.Item required className={'w-full'} name={'username'}
                                       label={<><PersonIcon/>Username</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item rules={[{
                                required: true,
                                message: 'SĐT không được để trống'
                            }
                            ]} required className={'w-full'} name={'phone'}
                                       label={<><LocalPhoneIcon/>SĐT</>}>
                                <Input disabled={isView}/>
                            </Form.Item>
                            <Form.Item rules={[{
                                required: true,
                                message: 'Mật khẩu không được để trống'
                            }
                            ]} required className={'w-full'} name={'password'}
                                       label={<><PersonIcon/>Mật khẩu</>}>
                                <Input.Password
                                    disabled={isView}
                                    iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Form.Item>
                            <Form.Item rules={[{
                                required: true,
                                message: 'Ngày sinh không được để trống'
                            }
                            ]}
                                       required
                                       className={'w-full'}
                                       name={'dob'}
                                       label={<><PersonIcon/>Ngày sinh</>}
                            >
                                <DatePicker
                                    disabledDate={(current) => {
                                        // Can not select days before today and today
                                        return current && current > dayjs().endOf('day');
                                    }}
                                    format={"DD/MM/YYYY"}
                                    placeholder="DD/MM/YYYY"
                                />
                            </Form.Item>

                            <Form.Item rules={[{
                                required: true,
                                message: 'Vai trò không được để trống'
                            }
                            ]} required className={'w-full'} name={'role'}
                                       label={<><PersonIcon/>Vai trò</>}>
                                <Select allowClear={true}
                                        disabled={isView}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            const syntheticEvent = {
                                                target: {
                                                    name: "role", value: selectedValues, // Pass the selected values directly
                                                },
                                            };
                                            handleChange(syntheticEvent); // Call your existing handleChange
                                        }}
                                        className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        options={ROLE.map((item) => ({
                                            value: item.id, label: item.name,
                                        }))}
                                />
                            </Form.Item>
                            <Form.Item rules={[{
                                required: true,
                                message: 'Giới tính không được để trống'
                            }
                            ]} required={true} name={'gender'} label={<><Girl/> Giới tính</>}>
                                <Radio.Group disabled={isView}
                                             className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                             options={GENDER.map((item) => ({
                                                 value: item.id, label: item.name,
                                             }))}>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className={'w-full flex justify-center'}>
                            <Button
                                htmlType={'submit'}
                                className={`w-2/3 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                readOnly={isSubmitting}
                            >
                                {isSubmitting ? "Đang xử lý..." : !isEdit ? "Đăng ký" : "Cập nhật"}
                            </Button>
                        </div>
                    </Form>
                    <div className="flex justify-end">
                        <img
                            src="/assets/img/icon/creditimg.jpg"
                            alt="Illustration"
                            className="hidden md:block"
                        />
                    </div>
                </div>) :
            <div className="w-full h-full p-4 ">
                {isPopupVisible && (<Popup
                    message={popup.message}
                    onClose={popup.onClose}
                    type={popup.type}
                />)}
                <Form initialValues={{
                    fullname: null,
                    username: null,
                    phone: null,
                    password: null,
                    dob: null, // Convert to moment object
                    roles: null,
                    gender: null
                }} onFinish={handleSubmit}
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
                            {!isView && !isEdit ? (<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                                Tạo tài khoản
                            </h2>) : ''}
                        </div>
                    </div>
                    <Card className={'p-[30px] w-full bg-[#f3f4f6]'}>
                        <div className={'w-full grid grid-cols-2'}>
                            <div>
                                <Form.Item required className={'w-full'} name={'fullname'}
                                           label={<><PersonIcon/>Họ và tên</>}>
                                    <Input onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                           disabled={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'username'}
                                           label={<><BadgeIcon/>Username</>}>
                                    <Input disabled={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'phone'}
                                           label={<><LocalPhoneIcon/>SĐT</>}>
                                    <Input disabled={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'password'}
                                           label={<><HttpsIcon/>Mật khẩu</>}>
                                    <Input.Password
                                        disabled={isView}
                                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    required
                                    className={'w-full'}
                                    name={'dob'}
                                    label={<><CalendarViewDayIcon/>Ngày sinh</>}
                                >
                                    <DatePicker disabled={isView}
                                                disabledDate={(current) => {
                                                    // Can not select days before today and today
                                                    return current && current > dayjs().endOf('day');
                                                }}
                                                format={"DD/MM/YYYY"}
                                                placeholder="DD/MM/YYYY"
                                    />
                                </Form.Item>

                                <Form.Item required className={'w-full'} name={'roles'}
                                           label={<><GroupIcon/>Vai trò</>}>
                                    <Select
                                        disabled={isView}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            const syntheticEvent = {
                                                target: {
                                                    name: "role", value: selectedValues, // Pass the selected values directly
                                                },
                                            };
                                            handleChange(syntheticEvent); // Call your existing handleChange
                                        }}
                                        className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        options={ROLE.map((item) => ({
                                            value: item.id, label: item.name,
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item required={true} name={'gender'} label={<><Girl/> Giới tính</>}>
                                    <Radio.Group disabled={isView}
                                                 className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                                 options={GENDER.map((item) => ({
                                                     value: item.id, label: item.name,
                                                 }))}>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item required className={'w-full'} name={'cin'}
                                           label={<><CreditCardIcon/>CCCD</>}>
                                    <Input onBlur={() => generateUserName(form.getFieldValue('fullname'))}
                                           disabled={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'code'}
                                           label={<><SwitchAccountIcon/>MVN</>}>
                                    <Input disabled={isView}/>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'province'}
                                           label={<><LocationOnIcon/>Tỉnh/TP</>}>
                                    <Select
                                        disabled={isView}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            getListDistrict(selectedValues); // Call your existing handleChange
                                        }} allowClear
                                        options={province?.map((item) => ({
                                            value: item.code, label: item.name,
                                        }))}
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'district'}
                                           label={<><LocationOnIcon/>Quận/Huyện</>}>
                                    <Select
                                        disabled={isView}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            getListWard(selectedValues); // Call your existing handleChange
                                        }} allowClear
                                        options={district?.map((item) => ({
                                            value: item.code, label: item.name,
                                        }))}
                                    > </Select>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'ward'}
                                           label={<><LocationOnIcon/>Phường/Xã</>}>
                                    <Select
                                        disabled={isView}
                                        allowClear
                                        options={ward?.map((item) => ({
                                            value: item.code, label: item.name,
                                        }))}
                                    > </Select>
                                </Form.Item>
                                <Form.Item required className={'w-full'} name={'active'}
                                           label={<><BoltIcon/>Hiệu lực</>}>
                                    <Select
                                        disabled={isView}
                                        onChange={(selectedValues) => {
                                            // Create a synthetic event to match the expected structure
                                            const syntheticEvent = {
                                                target: {
                                                    name: "role", value: selectedValues, // Pass the selected values directly
                                                },
                                            };
                                            handleChange(syntheticEvent); // Call your existing handleChange
                                        }}
                                        className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                        options={ACTIVE.map((item) => ({
                                            value: item.id, label: item.name,
                                        }))}
                                    />
                                </Form.Item>
                            </div>
                            <div></div>
                            {isEdit &&
                                <div className={'flex justify-end'}>
                                    <Button
                                        htmlType={'submit'}
                                        className={`bg-purple-500 py-2 px-4 rounded-lg hover:bg-purple-600 mt-6 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        readOnly={isSubmitting}
                                    >
                                        {isSubmitting ? "Đang xử lý..." : !isEdit ? "Đăng ký" : "Cập nhật"}
                                    </Button>
                                </div>
                            }
                        </div>
                    </Card>
                </Form>
            </div>

        }
    </>);
}

export default RegisterForm;
