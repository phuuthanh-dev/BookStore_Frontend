import { MyRequest } from "./Request";

export const checkExist = async (username: string, email: string) => {
    // end-point
    console.log(email);
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

