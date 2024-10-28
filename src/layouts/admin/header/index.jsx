import {Dropdown, Space} from "antd";

import HelpIcon from "@mui/icons-material/Help";
import KeyIcon from "@mui/icons-material/Key";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function Header() {


    const logout = () => {
        // Xóa accessToken từ cookies
        Cookies.remove("accessToken");

        // Xóa dữ liệu người dùng từ localStorage
        localStorage.clear();

        // Chuyển hướng người dùng về  trang chủ
        window.location.href = "/";
    };
    const items = [
        {
            label: (
                <div className="flex items-center gap-2">
                    <PersonIcon className="h-4 w-4"/>
                    <span>Thông tin cá nhân</span>
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <Link to={'/admin/change-password'}>
                    <div className="flex items-center gap-2">

                        <KeyIcon/>

                        <span>Đổi mật khẩu</span>

                    </div>
                </Link>
            ),
            key: "1",
        },
        {
            label: (
                <div className="flex items-center gap-2" onClick={logout}>
                    <LogoutIcon/>
                    <span>Đăng xuất</span>
                </div>
            ),
            key: "3",
        },
    ];
    return (
        <>
         <Navbar/>
        </>
    );
}
