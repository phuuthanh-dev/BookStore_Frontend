import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/user/login");
                return;
            } else {
                // giải mã token
                const decodeToken = jwtDecode(token) as JwtPayload;
                console.log(decodeToken);

                // lấy thông tin cụ thể
                const isAdmin = decodeToken.isAdmin;

                // kiểm tra thông tin cụ thể
                if (!isAdmin) {
                    navigate("/bao-loi-403");
                    return;
                }
            }
        }, [navigate])

        return <WrappedComponent {...props} />;
    }
    return WithAdminCheck;
}

export default RequireAdmin;