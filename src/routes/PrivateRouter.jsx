import {Outlet} from "react-router-dom";
import Header from "../layouts/admin/header";

export default function PrivateRouter() {
    return (
        <>
            <Header/>
            <div className="flex h-full w-full">
                <Outlet/>
            </div>
        </>
    );
}
