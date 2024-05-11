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

export const register = async (username: string, firstName: string, lastName: string, phone: 
    string, email: string, password: string, gender: string, base64Avatar: string | null): Promise<boolean> => {
    // end-point
    let URL = `http://localhost:8080/api/auth/register`;

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
                avatar: base64Avatar
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

export const handleActiveUser = async (email: string, activationKey: string) : Promise<boolean> => {
    try {
        const URL: string = `http://localhost:8080/api/auth/active?email=${email}&activationKey=${activationKey}`;
        const response = await fetch(URL,
            {
                method: 'GET',
            }
        )
        
        console.log(response);
        if (response.ok) {
            return true;
        } else {
            throw new Error(`Không thể truy cập ${URL}`);
        }

    } catch (error) {
        console.error("Error: " + error);
        return false;
    }
}