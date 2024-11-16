import PrivateRouter from "./PrivateRouter";
import HomeAdmin from "../pages/admin/home";
import ListStaff from "../pages/admin/staff/list-staff.jsx";
import RegisterForm from "../pages/admin/staff/register-form.jsx";
import ListBrief from "../pages/admin/brief/ListBrief.jsx";
import PermissionsForm from "../pages/admin/user_management";
import Login from "../pages/user/Auth/Login";
import NotFound from "../pages/notfound/NotFound.jsx";

const routesConfig = [
    {
        path: "/admin",
        element: <PrivateRouter/>,
        children: [
            {path: "", element: <HomeAdmin/>},
            {path: "staff", element: <ListStaff/>},
            {path: "staff/create", element: <RegisterForm/>},
            {path: "staff/view/:id", element: <RegisterForm/>},
            {path: "staff/edit/:id", element: <RegisterForm/>},
            {path: "brief", element: <ListBrief/>},
            { path: "permissions", element: <PermissionsForm /> },
        ],

    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <NotFound /> }
];

export default routesConfig;
