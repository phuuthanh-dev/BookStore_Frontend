import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";

function LoginUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        const loginRequest = {
            username: username,
            password: password,
        };

        fetch("http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginRequest),
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed!");
                }
            })
            .then((data) => {
                const { jwt } = data;
                localStorage.setItem("token", jwt);
                window.location.href = "/";
            })
            .catch((error) => {
                console.error("Login Failed: ", error);
                setError("Login failed. Please check your username and password!");
            });
    }

    return (
        <MDBContainer fluid>
            <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol
                            md="10"
                            lg="6"
                            className="order-2 order-lg-1 d-flex flex-column align-items-center"
                        >
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                Sign in
                            </p>
                            <div className="w-50">
                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="user me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Username"
                                        id="form1"
                                        type="text"
                                        className="w-100"
                                        value={username}
                                        required
                                        onChange={handleUsernameChange}
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mt-4 mb-4">
                                    <MDBIcon fas icon="lock me-3 fa-fw" size="lg" />
                                    <MDBInput label="Password" id="form6" type="password"
                                        required value={password} onChange={handlePasswordChange} />
                                </div>

                                {error && <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "red",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                > {error}
                                </div>}

                                <MDBBtn onClick={handleLogin} type="button" className="mb-4" size="lg">
                                    Login
                                </MDBBtn>
                            </div>
                        </MDBCol>

                        <MDBCol
                            md="10"
                            lg="6"
                            className="order-1 order-lg-2 d-flex align-items-center"
                        >
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                fluid
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default LoginUser;
