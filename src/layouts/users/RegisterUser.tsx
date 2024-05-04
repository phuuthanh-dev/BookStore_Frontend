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
    MDBRadio,
    MDBIcon,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import { checkExist } from "../../api/UserAPI";
import { Link } from "react-router-dom";

function RegisterUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [gender, setGender] = useState(1);

    // error messages
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => { };

    const handleUsernameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // change username value
        setUsername(e.target.value);

        // check exist
        setErrorUsername("");

        // check if username exists
        const exists = await checkExist(e.target.value, "");
        if (exists) {
            setErrorUsername("Username already exists!");
            return;
        }
    };

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail("");
        const exists = await checkExist("", e.target.value);
        if (exists) {
            setErrorEmail("Email already exists!");
            return;
        }
    };

    const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        setPassword(e.target.value);
        if (!passwordRegex.test(e.target.value)) {
            setErrorPassword(
                "Password must contain at least 8 characters and 1 special character!"
            );
        } else {
            // Nhập passCf đúng nhưng ch match sau đó nhập pass đúng
            if (e.target.value === cfPassword) {
                setErrorConfirmPassword("");
            }
            setErrorPassword("");
        }
    };

    const checkConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCfPassword(e.target.value);
        if (password !== e.target.value) {
            setErrorConfirmPassword("Passwords do not match!");
        } else {
            setErrorConfirmPassword("");
        }
    };


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
                                Sign up
                            </p>
                            <form onSubmit={handleSubmit} className="w-50">
                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="user-plus me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Username"
                                        id="form1"
                                        type="text"
                                        className="w-100"
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                </div>
                                <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "red",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                >
                                    {errorUsername}
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user-edit me-3 fa-fw" size="lg" />
                                    <div className="me-3">
                                        <MDBInput label="First Name" id="form1" type="text"
                                            required />
                                    </div>
                                    <div>
                                        <MDBInput label="Last Name" id="form1" type="text"
                                            required />
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="male me-4 fa-fw" size="lg" />
                                    <span className="me-4 fw-bold" style={{ marginLeft: "-4px" }}>
                                        Gender:{" "}
                                    </span>
                                    <MDBRadio
                                        name="inlineRadio"
                                        id="inlineRadio1"
                                        value="option1"
                                        label="Male"
                                        inline
                                    />
                                    <MDBRadio
                                        name="inlineRadio"
                                        id="inlineRadio2"
                                        value="option2"
                                        label="Female"
                                        inline
                                    />
                                    <MDBRadio
                                        name="inlineRadio"
                                        id="inlineRadio3"
                                        value="option3"
                                        label="Other"
                                        inline
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="envelope me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Your Email"
                                        id="form2"
                                        type="email"
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </div>
                                <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "red",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                >
                                    {errorEmail}
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="phone me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Phone Number"
                                        id="form1"
                                        type="text"
                                        className="w-100"
                                        required
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="lock me-3 fa-fw" size="lg" />
                                    <MDBInput label="Password" id="form3" type="password"
                                        required onChange={checkPassword} />
                                </div>
                                <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "red",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                >
                                    {errorPassword}
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="key me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Repeat your password"
                                        id="form4"
                                        type="password"
                                        onChange={checkConfirmPassword}
                                        required
                                    />
                                </div>
                                <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "red",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                >
                                    {errorConfirmPassword}
                                </div>

                                <div className="mb-4 d-flex justify-content-center">
                                    <MDBCheckbox
                                        name="flexCheck"
                                        value=""
                                        id="flexCheckDefault"
                                        label="I agree all statements in"
                                    /> <Link style={{marginLeft: "4px"}} to="">Terms of service</Link>
                                </div>

                                <MDBBtn className="mb-4" size="lg">
                                    Register
                                </MDBBtn>
                            </form>
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

export default RegisterUser;
