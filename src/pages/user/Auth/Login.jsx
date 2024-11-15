import React, { useState } from "react";
import { loginApi } from "../../../api/userAPIs";
import Cookies from "js-cookie";
import { notify } from "../../../utils/notification";
import FormAddCategory from "../../../components/form/FormAddCategory.jsx";
import FormForgotPassword from "../../../components/form/FormForgotPassword.jsx";
import {Button} from "antd";
import {editCategory} from "../../../api/categoryAPIs.js";
import {resetPassword} from "../../../api/resetPasswordAPIs.js";
import {Box, Grid} from "@mui/material";

export default function Login() {
  // region state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogining, setIsLogining] = useState(false);
  const [isFormForgotPassword, setIsFormForgotPassword] = useState(false);
  const closedFormForgotPassword = () => {
    setIsFormForgotPassword(false);
  };
  // end region
  // Hàm đăng nhập
  const login = async () => {
    setIsLogining(true);
    try {
      const response = await loginApi({ username, password });
      const { token: accessToken, expiryTime, roles, type, username: fullName } = response?.data?.result;

      localStorage.setItem("user", fullName);
      localStorage.setItem("roles", JSON.stringify(roles));
      // Lưu accessToken vào cookies
      Cookies.set("accessToken", accessToken, {
        expires: expiryTime / (24 * 60 * 60 * 1000),
        secure: true,
      });

      console.log("check : ");
      notify("success", "Đăng nhập thành công");
      //  // Xử lý chuyển hướng nếu cần
      window.location.href = "/admin";

    } catch (error) {
      console.log(error);
      notify("error", error.response.data || "Có lỗi xảy ra khi đăng nhập");
    } finally {
      // setIsLogining(false);
    }
  };


  // Gọi hàm đăng nhập khi nhấn phím Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <>
      <div className="main-wrapper log-wrap">
        <div className="row">
          <div className="col-md-4 login-bg">
            <Grid item xs={12} md={6} className="text-center">
              <Box
                  component="img"
                  src="/assets/img/icon/homeimg.jpg" // Corrected image path
                  alt="Credit Card Banner"
                  sx={{
                    maxWidth: "100%",
                    boxShadow: 3,
                  }}
              />
            </Grid>
          </div>
          <div className="col-md-8 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="w-100">

                  <h1>Đăng nhập</h1>
                  <div className="input-block">
                    <label className="form-control-label">Tên đăng nhập</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên đăng nhập"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">Mật khẩu</label>
                    <div className="pass-group">
                      <input
                        type="password"
                        className="form-control pass-input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <span className="feather-eye toggle-password" />
                    </div>
                  </div>


                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-start"
                      onClick={login}
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
