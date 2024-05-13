import { MyRequest } from "./Request";
import { Category } from "../models/Category";

async function getData(URL: string): Promise<Category[]> {
    const categories: Category[] = [];

    // request
    const response = await MyRequest(URL);

    // get json book
    const responseData = response._embedded.categories;

    for (const key in responseData) {
        categories.push({
            id: responseData[key].id,
            name: responseData[key].name,
        })
    }
    return categories;
}

export async function getCategories(): Promise<Category[]> {

    // endpoint
    const URL: string = `http://localhost:8080/categories`;

    return getData(URL);
}