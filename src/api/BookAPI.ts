import React from "react";
import { Book } from "../models/Book";
import { MyRequest } from "./Request";

export async function getBooks(): Promise<Book[]> {
    const result: Book[] = [];

    // endpoint
    const URL: string = "http://localhost:8080/books";

    // request
    const response = await MyRequest(URL);

    // get json response
    const responseData = response._embedded.books;

    for (const key in responseData) {
        result.push({
            id: responseData[key].id,
            title: responseData[key].name,
            author: responseData[key].author,
            description: responseData[key].description,
            originPrice: responseData[key].originalPrice,
            price: responseData[key].price,
            quantity: responseData[key].quantity,
            avgRatings: responseData[key].avgRatings
        })
    }

    return result;
}