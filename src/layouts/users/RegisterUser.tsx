import React, { useMemo, useState } from "react";
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
    MDBFile,
} from "mdb-react-ui-kit";
import { checkExist, register } from "../../api/UserAPI";
import { Link } from "react-router-dom";
import debounce from "debounce";

function RegisterUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [gender, setGender] = useState('M');
    const [avatar, setAvatar] = useState<File | null>(null);

    // error messages
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [notification, setNotification] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        // Clear error message
        setErrorUsername("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorConfirmPassword("");

        // Tránh click liên tục
        e.preventDefault();

        // Check again
        const isUsernameValid = !await checkExist(username, "")
        const isEmailValid = !await checkExist("", email)
        const isPasswordValid = !checkPassword(password)
        const isCofirmPasswordValid = !checkConfirmPassword(cfPassword)

        if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isCofirmPasswordValid) {
            return;
        }

        const base64Avatar = avatar ? await getBase64(avatar) : null;

        const isSuccess = await register(username, firstName, lastName, phone, email, password, gender, base64Avatar);

        console.log(isSuccess);
        if (!isSuccess) {
            setNotification("An error occurred during account registration!")
            return;
        }
        setNotification("Registration successful, please check your activation email!")
    };

    const handleUsernameChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // change username value
        console.log(e.target.value)
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

    // Check Password
    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword(
                "Password must contain at least 8 characters and 1 special character!"
            );
            return true;
        } else {
            // Nhập passCf đúng nhưng ch match sau đó nhập pass đúng
            if (password === cfPassword) {
                setErrorConfirmPassword("");
            }
            setErrorPassword("");
            return false;
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);

        setErrorPassword("");

        return checkPassword(e.target.value);
    }


    // Check Confirm Password
    const checkConfirmPassword = (confirmPassword: string) => {
        if (password !== confirmPassword) {
            setErrorConfirmPassword("Passwords do not match!");
            return true;
        } else {
            setErrorConfirmPassword("");
            return false;
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCfPassword(e.target.value);

        setErrorConfirmPassword("");

        return checkConfirmPassword(e.target.value);
    }

    // Xử lí thay đổi File
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setAvatar(file);
        }
    };

    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
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
                                        value={username}
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
                                        <MDBInput label="First Name" id="form2" type="text"
                                            value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                            required />
                                    </div>
                                    <div>
                                        <MDBInput label="Last Name" id="form3" type="text"
                                            value={lastName} onChange={(e) => setLastName(e.target.value)}
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
                                        value="M"
                                        label="Male"
                                        onChange={(e) => setGender(e.target.value)}
                                        checked={gender === "M" ? true : false}
                                        inline
                                    />
                                    <MDBRadio
                                        name="inlineRadio"
                                        id="inlineRadio2"
                                        value="F"
                                        label="Female"
                                        inline
                                    />
                                    <MDBRadio
                                        name="inlineRadio"
                                        id="inlineRadio3"
                                        value="O"
                                        label="Other"
                                        inline
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="envelope me-3 fa-fw" size="lg" />
                                    <MDBInput
                                        label="Your Email"
                                        id="form4"
                                        type="email"
                                        value={email}
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
                                        id="form5"
                                        type="text"
                                        className="w-100"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="lock me-3 fa-fw" size="lg" />
                                    <MDBInput label="Password" id="form6" type="password"
                                        required onChange={handlePasswordChange} />
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
                                        id="form7"
                                        type="password"
                                        onChange={handleConfirmPasswordChange}
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

                                <div className="d-flex flex-row align-items-center">
                                    <MDBIcon fas icon="key me-3 fa-fw" size="lg" />
                                    <MDBFile
                                        id='customFile' accept="image/*" onChange={handleAvatarChange}
                                    />
                                </div>

                                <div className="mb-4 d-flex justify-content-center">
                                    <MDBCheckbox
                                        name="flexCheck"
                                        value=""
                                        id="flexCheckDefault"
                                        label="I agree all statements in"
                                    /> <Link style={{ marginLeft: "4px" }} to="">Terms of service</Link>
                                </div>

                                <MDBBtn className="mb-4" size="lg">
                                    Register
                                </MDBBtn>

                                <div
                                    className="mb-4 mt-1 fw-bold"
                                    style={{
                                        color: "green",
                                        textAlign: "start",
                                        fontSize: "14px",
                                        marginLeft: "45px",
                                    }}
                                >
                                    {notification}
                                </div>
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
