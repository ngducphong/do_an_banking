import {notify} from "../utils/notification";
import {jsonAxios} from "./api.base.url";
import Cookies from "js-cookie";
export const register = async (infoUser) => {
    const newUser = {
        username: infoUser.username,
        email: infoUser.email,
        fullName: infoUser.fullName,
        phone: infoUser.phone,
        password: infoUser.password,
    };
    try {
        const response = await jsonAxios.post("/api/v1/user/register", newUser);
        notify("success", "Đăng ký thành công");
        return response;
    } catch (error) {
        notify("error", "Đăng ký không thành công");
    }
};
export const loginApi = async (user) => {
    const infoUser = {
        username: user.username,
        password: user.password,
    };
    try {
        Cookies.remove("accessToken");
        const response = await jsonAxios.post("/auth/token", infoUser);
        notify("success", "Đăng nhập thành công");
        return response;
    } catch (error) {
        console.log(error);
        notify("error", "Sai tài khoản hoặc mật khẩu");
    }
};
export const paging = async (searchRequest) => {
    try {
        return await jsonAxios.post("/users/paging", searchRequest);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const pagingUsers = async (searchRequest) => {
    try {
        return await jsonAxios.post("/users/paging-users", searchRequest);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const findUserById = async (id)=>{
    try {
        return await jsonAxios.post(`/users/${id}`,);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const createUser = async (form) => {
    try {
        return await jsonAxios.post("/users/create-user-staff", form);
    } catch (error) {
        console.log(error);
        notify("error", "Có lỗi xảy ra");
    }
}
export const createUserName = async (fullname) => {
    try {
        const encodedFullname = encodeURIComponent(fullname);
        return await jsonAxios.get(`/users/generate-username?userName=${encodedFullname}`);
    } catch (error) {
        console.error(error);
        notify("error", "Có lỗi xảy ra");
    }
};
export const getAllUsers = async (searchQuery) => {
    try {
        if (searchQuery) {
            const search = searchQuery?.searchTerms;

            console.log((search))

            let url = 'api/v1/user/page?';
            let params = [];

            if (search.name) {
                params.push(`name=${search.name}`);
            }

            if (search.username) {
                params.push(`username=${search.username}`);
            }

            if (search.email) {
                params.push(`email=${search.email}`);
            }

            if (search.phone) {
                params.push(`phone=${search.phone}`);
            }

            if (search.createDate) {
                params.push(`createDate=${search.createDate}`);
            }

            if (search.voided) {
                params.push(`voided=${search.voided}`);
            }

            if (search.role) {
                params.push(`role=${search.role}`);
            }

            url += params.join('&');

            const response = await jsonAxios.get(
                url
            );
            return response;
        } else {
            const response = await jsonAxios.get("api/v1/user/page");
            return response;
        }
    } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else {
            notify("error", "Có lỗi xảy ra khi lấy thông tin người dùng");
        }
    }
};
export const changePassword = async (changePasswordRequest) => {
    try {
        await jsonAxios.put(
            "/api/v1/user/change-password",
            changePasswordRequest
        );
        notify("success", "Đổi mật khẩu thành công");
    } catch (error) {
        if (error.response.status === 401) {
            notify("error", "Bạn không có quyền");
        } else if (error.response.status === 400) {
            notify("error", error.response.data);
        } else {
            notify("error", "Có lỗi xảy ra khi đổi mật khẩu");
        }
    }
};
