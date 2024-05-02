import { Image } from "../models/Image";
import { MyRequest } from "./Request";

export async function getImagesByBookId(id: number): Promise<Image[]> {
    const result: Image[] = [];

    // endpoint
    const URL: string = `http://localhost:8080/books/${id}/images`;

    // request
    const response = await MyRequest(URL);

    // get json response
    const responseData = response._embedded.images;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            name: responseData[key].name,
            icon: responseData[key].icon,
            link: responseData[key].link,
            data: responseData[key].data
        })
    }

    return result;
}
