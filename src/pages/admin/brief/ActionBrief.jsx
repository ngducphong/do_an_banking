import {Breadcrumb, Button, Card, DatePicker, Form, Input, InputNumber, Modal, Radio, Spin} from 'antd';
import './brief.css'
import {GENDER, STATUSES} from "../../../utils/const.js";
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from "@mui/icons-material/Person";
import {
    AccessAlarm, CalendarMonth, CreditCard, Girl, OpenInBrowser, Phone, TrendingUp, ViewDay
} from "@mui/icons-material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    checkingCicLoanReqInfo,
    checkingLoanReqInfo,
    getLoan,
    receiveLoan, rejectedCheckHs,
    waitingForCheckLoanReqInfo,
    waitingForCicCheckLoanReqInfo,
    waitingForEvaluationLoanReqInfo
} from "../../../api/loanReqInfoAPIs.js";
import moment from "moment";
import {InfoCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import {getCicInformationByIdNumber} from "../../../api/cicAPIs.js";

const ActionBrief = () => {
    const {id} = useParams(); // Lấy id từ URL
    const [loan] = Form.useForm();
    const [trangthai, setTrangthai] = useState(''); // State để lưu trữ mã hồ sơ
    const [currentIndex, setCurrentIndex] = useState(0); // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalRefuseOpen, setIsModalRefuseOpen] = useState(false);
    const [cic, setCic] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'))
    const [reason, setReason] = useState("");
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setCic(null)
        setIsModalOpen(false);
    };
    const fetchData = useCallback(async () => {
        try {
            const response = await getLoan(id);
            const data = response?.data?.result;

            if (data) {
                loan.setFieldsValue({
                    id: data.id,
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
                setTrangthai(data.trangthai);
                let index = STATUSES.findIndex(value => value.code === data.trangthai);
                while (index % 4 !== 0) {
                    index--;
                }
                setCurrentIndex(index)
            }
        } catch (error) {
            console.error('Failed to fetch loan data:', error);
        }
    }, [id, loan]);

    useEffect(() => {
        fetchData();
    }, [fetchData, id]);
    const getCicInformation = async (idNumber) => {
        try {
            const response = await getCicInformationByIdNumber(idNumber);

            if (response) {
                // Use setTimeout correctly to delay the state update
                setTimeout(() => {
                    setCic(response?.data);
                }, 1000);
            } else {
                console.error("No response from CIC API");
            }
        } catch (error) {
            console.error("Error fetching CIC information:", error);
        }
    };
    const actionLoan = async (loanId) => {
        try {
            let response
            if (trangthai === STATUSES[0].code) {
                response = await receiveLoan(loanId);
            } else if (trangthai === STATUSES[1].code) {
                response = await waitingForCheckLoanReqInfo(loanId);
            } else if (trangthai === STATUSES[2].code) {
                response = await checkingLoanReqInfo(loanId);
            } else if (trangthai === STATUSES[3].code) {
                response = await waitingForCicCheckLoanReqInfo(loanId);
            } else if (trangthai === STATUSES[4].code) {
                setIsModalOpen(true)
                response = await checkingCicLoanReqInfo(loanId);
                await getCicInformation(loan.getFieldValue('cccd'))
            } else if (trangthai === STATUSES[5].code) {
                response = await waitingForEvaluationLoanReqInfo(loanId);
            } else if (trangthai === STATUSES[6].code) {
                response = await waitingForEvaluationLoanReqInfo(loanId);
            } else {
                return
            }
            const data = response?.data?.result;

            if (data) {
                // Logic xử lý dữ liệu nếu cần
                fetchData(); // Update form after loan is received
            }
        } catch (error) {
            console.error('Failed to receive loan:', error);
        }
    }
    const rejectCheckLoan = async (id, reason) => {
        const response = await rejectedCheckHs(id, reason)
        if (response && response.data) {
            fetchData(); // Update form after loan is received
        }
    }
    return (<>
        <Modal
            maskClosable={false}
            centered
            title={!cic ?
                <div className={'flex justify-center gap-2 text-2xl font-bold'}>
                    <Spin indicator={<LoadingOutlined spin/>} size={'large'}/>
                    <span>Check CIC</span>
                </div> : <div className="flex items-center gap-2 text-xl font-bold">
                    <InfoCircleOutlined style={{fontSize: "24px"}}/>
                    <span>Thông tin tín dụng</span>
                </div>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null} // Không cần nút OK/Cancel

        >
            {
                !cic ? <p style={{textAlign: "center"}}>Điểm tín dụng đang được cập nhật!</p>
                    : <div style={{whiteSpace: "pre-line", fontSize: "16px"}}>
                        - Họ và tên khách: {cic.customerName}{"\n"}
                        - Ngày sinh: {cic.dateOfBirth}{"\n"}
                        - CCCD: {cic.idNumber}{"\n"}
                        - Quê quán: {cic.address}{"\n"}
                        - Lịch sử giao dịch tín dụng: {cic.creditScore}{"\n"}
                        - Phân loại khách hàng theo thông tin tín dụng: {cic.remarks}
                    </div>
            }
        </Modal>
        <Modal
            bodyStyle={{height: "fit-content", minHeight: 300}}
            width={700}
            title={
                <div className="flex justify-center text-center text-3xl font-bold">
                    <i className="bi bi-keyboard mr-2"></i>
                    Nhập lý do từ chối
                </div>
            }
            open={isModalRefuseOpen}

            onCancel={() => {
                setIsModalRefuseOpen(false) // Đóng modal
            }}
            footer={[
                <Button
                    key={null}
                    type="primary"
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => rejectCheckLoan(loan.getFieldValue('id'), reason)}
                >
                    Gửi
                </Button>
            ]}
            centered
        >
            <Input.TextArea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do từ chối"
                rows={15}
                className="resize-none border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
        </Modal>
        <div className={'grid grid-cols-1 container'}>
            <Breadcrumb
                separator=">"
                itemRender={(route) => {
                    return (<span
                        className={((route.title === 'Chờ tiếp nhận HS' && trangthai === STATUSES[0].code)
                            || (route.title === 'Đã tiếp nhận HS' && trangthai === STATUSES[1].code)
                            || (route.title === 'Chờ KT' && trangthai === STATUSES[2].code)
                            || (route.title === 'Đang KT' && trangthai === STATUSES[3].code)
                            || (route.title === 'Chờ check CIC' && trangthai === STATUSES[4].code)
                            || (route.title === 'Đang check CIC' && trangthai === STATUSES[5].code)
                            || (route.title === 'Chờ thẩm định ĐT' && trangthai === STATUSES[6].code)
                            || (route.title === 'Đang thẩm định ĐT' && trangthai === STATUSES[7].code)
                            || (route.title === 'Chờ thẩm định ĐB' && trangthai === STATUSES[8].code)
                            || (route.title === 'Đã từ chối' && trangthai === 'REJECTED_CHECK')) ? 'text-red-500' : 'text-black'}>{route.title}</span>);
                }}
                items={trangthai !== 'REJECTED_CHECK' ? [{title: 'Chờ tiếp nhận HS',},
                    {title: 'Đã tiếp nhận HS'},
                    {title: 'Chờ KT'},
                    {title: 'Đang KT'},
                    {title: 'Chờ check CIC'},
                    {title: 'Đang check CIC'},
                    {title: 'Chờ thẩm định ĐT'},
                    {title: 'Đang thẩm định ĐT'},
                    {title: 'Chờ thẩm định ĐB'}].slice(currentIndex, currentIndex + 4) :
                    [{title: 'Đang KT'},
                    {title: 'Đã từ chối'},
                ]} // Hiển thị 4 mục đầu tiên hoặc logic tùy chỉnh
            />
            <Form initialValues={{
                id: null,
                makhachhang: null,
                cccd: null,
                hotenkhach: null,
                sdt: null,
                ngaysinh: null,
                gioitinh: null,
                mahoso: null,
                sotienvay: null,
                sanphamvay: null,
                kyhan: null,
                ngayvay: null,
                phuongthuctinhlai: null,
                tramoithang: null,
                laisuat: null,
            }} form={loan} labelWrap={true} colon={false} labelAlign={'left'} labelCol={{span: 6}}
                  onFinish={() => actionLoan(loan.getFieldValue('id'))}
                  wrapperCol={{span: 16}}>
                <div className={'grid grid-cols-1 w-full h-full ml-4 mr-4 custom-input-form'}>
                    <div className={'text-2xl'}>
                        <span>&lt; KHOẢN VAY {loan.getFieldValue('mahoso')}</span>
                    </div>
                    <div>
                        {trangthai === STATUSES[0].code ? <Button className={'mt-3 bg-[#CED0F8] text-white'}
                                                                  htmlType={'submit'}>Nhận</Button> : trangthai === STATUSES[1].code ?
                            <Button className={'mt-3 bg-[#CED0F8] text-white'} htmlType={'submit'}>Y/C kiểm
                                tra</Button> : trangthai === STATUSES[2].code ?
                                <Button className={'mt-3 bg-[#CED0F8] text-white'} htmlType={'submit'}>Kiểm
                                    tra</Button> : trangthai === STATUSES[3].code ? <div className={'flex'}>
                                    <Button className={'mt-3 bg-[#CED0F8] text-white hover:bg-sky-700'}
                                            htmlType={'submit'}>Hoàn tất KT</Button>
                                    <Button onClick={() => {
                                        setIsModalRefuseOpen(true)
                                    }} className={'mt-3 bg-red-500 ml-5 text-white hover:bg-sky-700'}
                                            htmlType={'button'}>Từ chối</Button>
                                </div> : trangthai === STATUSES[4].code ?
                                    <Button className={'mt-3 bg-[#CED0F8] text-white'} htmlType={'submit'}>Check
                                        CIC</Button> : ''}
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
    </>);
};

export default ActionBrief;