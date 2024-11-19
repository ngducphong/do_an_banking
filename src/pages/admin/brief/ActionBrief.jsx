import {Breadcrumb, Button, Card, DatePicker, Form, Input, InputNumber, Radio} from 'antd';
import './brief.css'
import {GENDER} from "../../../utils/const.js";
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from "@mui/icons-material/Person";
import {
    AccessAlarm, CalendarMonth, CreditCard, Girl, OpenInBrowser, Phone, TrendingUp, ViewDay
} from "@mui/icons-material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getLoan} from "../../../api/loanReqInfoAPIs.js";
import moment from "moment";

const ActionBrief = () => {
    const {id} = useParams(); // Lấy id từ URL
    const [loan] = Form.useForm();
    const [mahoso, setMahoso] = useState(''); // State để lưu trữ mã hồ sơ
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLoan(id);
                const data = response?.data?.result;

                if (data) {
                    loan.setFieldsValue({
                        makhachhang: data.makhachhang,
                        cccd: data.cccd,
                        hotenkhach: data.hotenkhach,
                        sdt: data.sdt,
                        ngaysinh: data.ngaysinh ? moment(data.ngaysinh) : null,
                        gioitinh: data.gioitinh,
                        mahoso: data.mahoso,
                        sotienvay: data.sotienvay,
                        sanphamvay: data.sanphamvay,
                        kyhan: data.kyhan,
                        ngayvay: data.ngayvay ? moment(data.ngayvay) : null,
                        phuongthuctinhlai: data.phuongthuctinhlai,
                        tramoithang: data.tramoithang,
                        laisuat: data.laisuat,
                    });
                    setMahoso(data.mahoso);
                }
            } catch (error) {
                console.error('Failed to fetch loan data:', error);
            }
        };

        fetchData();
    }, [id, loan]); // Dependency bao gồm id và loan form instance.

    return (<>
        <div className={'grid grid-cols-1 container'}>
            <Breadcrumb
                separator=">"
                items={[
                    {title: 'Chờ tiếp nhận HS'},
                    {title: 'Đã tiếp nhận HS'},
                    {title: 'Chờ KT'},
                    {title: 'Đang KT'}
                ]}

            />
            <Form form={loan} labelWrap={true} colon={false} labelAlign={'left'} labelCol={{span: 6}}
                  wrapperCol={{span: 16}}>
                <div className={'grid grid-cols-1 w-full h-full ml-4 mr-4 custom-input-form'}>
                    <div className={'text-2xl'}>
                        <span>&lt; KHOẢN VAY {mahoso}</span>
                    </div>
                    <div>
                        <Button className={'mt-3 bg-[#CED0F8]'} htmlType={'submit'}>Nhận</Button>
                    </div>
                    <Card className={'mt-4 mb-4'}>
                        <h3 className={'mb-4'}>THÔNG TIN KHÁCH HÀNG</h3>
                        <div className={'grid grid-cols-2 ml-4 mr-4'}>
                            <Form.Item name={'makhachhang'} label={<><ArticleIcon/>Mã khách hàng</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'cccd'} label={<><CreditCard/>CCCD</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'hotenkhach'} label={<><PersonIcon/>Họ tên khách</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'sdt'} label={<><Phone/>SĐT</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'ngaysinh'} label={<><ViewDay/>Ngày sinh</>}>
                                <DatePicker
                                    disabled
                                    format={"DD/MM/YYYY"}
                                    placeholder="DD/MM/YYYY"
                                />
                            </Form.Item>
                            <Form.Item name={'gioitinh'} label={<><Girl/> Giới tính</>}>
                                <Radio.Group disabled
                                             name="gender"
                                             className="w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 m-0"
                                             options={GENDER.map((item) => ({
                                                 value: item.id, label: item.name,
                                             }))}>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </Card>
                    <Card>
                        <h3 className={'mb-4'}>THÔNG TIN ĐỀ NGHỊ VAY</h3>
                        <div className={'grid grid-cols-2 ml-4 mr-4'}>
                            <Form.Item name={'mahoso'} label={<><ArticleIcon/>Mã hồ sơ</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'sotienvay'} label={<><CreditCard/>Số tiền vay</>}>
                                <InputNumber readOnly suffix={'VND'}
                                             min={0}
                                             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}/>
                            </Form.Item>
                            <Form.Item name={'sanphamvay'} label={<><PersonIcon/>Sản phẩm vay</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'kyhan'} label={<><AccessAlarm/>Kỳ hạn</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'ngayvay'} label={<><CalendarMonth/>Ngày vay</>}>
                                <DatePicker
                                    disabled
                                    format={"DD/MM/YYYY"}
                                    placeholder="DD/MM/YYYY"/>
                            </Form.Item>
                            <Form.Item name={'phuongthuctinhlai'} label={<><TrendingUp/>Phương thức tính lãi</>}>
                                <Input readOnly/>
                            </Form.Item>
                            <Form.Item name={'ngaysinh'} label={<><ViewDay/>Ngày sinh</>}>
                                <DatePicker
                                    disabled
                                    format={"DD/MM/YYYY"}
                                    placeholder="DD/MM/YYYY"/>
                            </Form.Item>
                            <Form.Item name={'sotienvay'} label={<><CreditCard/>Số tiền vay</>}>
                                <InputNumber
                                    readOnly
                                    min={0}
                                    formatter={(value) => `${value}%`}
                                    parser={(value) => value?.replace('%', '')}
                                />
                            </Form.Item>
                            <Form.Item label={<><ArticleIcon/>Giấy tờ đi kèm</>}>
                                <OpenInBrowser className={'ml-3'}/>
                                <SaveAltIcon className={'ml-3'}/>
                            </Form.Item>
                        </div>

                    </Card>
                </div>
            </Form>
        </div>
    </>)
        ;
};

export default ActionBrief;
