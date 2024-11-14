import { notify } from "../utils/notification";
import {formDataAxios, jsonAxios} from "./api.base.url";



export const getPermissionsByRoleName = async (roleName) => {
  try {
    const response = await jsonAxios.get(`/role-permission/permissions?roleName=${roleName}`);
    return response.data;
  } catch (error) {
    notify("error", "Bạn không có quyền xem trang này");
  }
};

export const addPermissionsToRole = async (role, apiCodes) => {
  try {
    const response = await jsonAxios.post('/role-permission/add-permissions-api', {
      role: role,
      apiCodes: apiCodes
    });
    return response.data;  // Trả về dữ liệu từ API nếu thành công
  } catch (error) {
    console.error("Lỗi khi thêm quyền cho vai trò:", error);
    // Bạn có thể hiển thị thông báo lỗi cho người dùng ở đây
    return null;
  }
};
