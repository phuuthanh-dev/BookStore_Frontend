import { Image } from "../models/Image";
import { MyRequest } from "./Request";

async function getImages(URL: string): Promise<Image[]> {
    const result: Image[] = [];

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

export async function getImagesByBookId(id: number): Promise<Image[]> {

    // endpoint
    const URL: string = `http://localhost:8080/books/${id}/images`;

    return getImages(URL);
}

export async function getIconImageByBoodId(id: number): Promise<Image | undefined> {
    // endpoint
    const URL: string = `http://localhost:8080/books/${id}/images`;
    const images: Image[] = await getImages(URL);

    for (const image of images) {
        // tìm icon
        if (image.icon === true) {
            return image;
        }
    }
    return undefined;
}
