import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActiveUser() {
    const [isActive, setIsActive] = useState(false);
    const [notification, setNotification] = useState("");

    const { email, activationKey } = useParams();

    useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const email = urlParams.get("email");
        // const activationKey = urlParams.get("activationKey");
        if (email && activationKey) {
            fetchData();
        };
    }, []);

    const fetchData = async () => {
        try {
            const URL: string = `http://localhost:8080/api/user/active?email=${email}&activationKey=${activationKey}`;
            const response = await fetch(URL, { method: 'GET' });
            console.log(isActive)
            if (response.ok) {
                setIsActive(true);
                return;
            } else {
                setNotification("Activation Failed");
            }
        } catch (error) {

        }
    }

    return (
        <div className="row mt-4">
            {isActive
                ? <h3 className="fw-bold" style={{ color: "green" }}>Your account has been successfully activated, please log in to continue the service!</h3>
                : <h3 className="fw-bold" style={{ color: "red" }}>{notification}</h3>
            }
        </div>
    );
}

export default ActiveUser;