import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
export const Test = () => {
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = jwtDecode(token);
            if (userData) {
                setUsername(userData.sub + "");
            }
        }
    }, [])
    return (
        <div>
           Hello {username}
        </div>
    );
}