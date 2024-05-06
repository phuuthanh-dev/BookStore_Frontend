import { MyRequest } from "./Request";

export const checkExist = async (username: string, email: string) => {
    // end-point
    console.log(username, email);
    let URL = `http://localhost:8080/users/search/existsByUsername?username=${username}`;

    if (email !== "") {
        URL = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
    }
    // call api
    try {
        const response = await MyRequest(URL);
        if (response === true) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error: " + error);
        return false;
    }
};

export const register = async (username: string, firstName: string, lastName: string, phone: string, email: string, password: string, gender: string): Promise<boolean> => {
    // end-point
    let URL = `http://localhost:8080/api/user/register`;

    // call api
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                password: password,
                gender: gender,
            }),
        });

        console.log(response);
        if (!response.ok) {
            throw new Error(`Không thể truy cập ${URL}`);
        }
        return true;
    } catch (error) {
        console.error("Error: " + error);
        return false;
    }
};