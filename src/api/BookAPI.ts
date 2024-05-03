import React from "react";
import { Book } from "../models/Book";
import { MyRequest } from "./Request";

interface ResultInteface {
    booksData: Book[];
    totalPages: number;
    numberBooksPerPage: number;
    totalBooks: number
}

async function getData(URL: string): Promise<ResultInteface> {
    const books: Book[] = [];

    // request
    const response = await MyRequest(URL);

    // get json book
    const responseData = response._embedded.books;

    // get json page
    const totalPages = response.page.totalPages;
    const numberBooksPerPage = response.page.size;
    const totalBooks = response.page.totalElements;

    for (const key in responseData) {
        books.push({
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

    return { 
        booksData: books, 
        totalPages: totalPages, 
        numberBooksPerPage: numberBooksPerPage, 
        totalBooks: totalBooks 
    };
}

export async function getBooks(currentPage: number): Promise<ResultInteface> {

    // endpoint
    const URL: string = `http://localhost:8080/books?size=1&page=${currentPage}`;

    return getData(URL);
}

export async function get3NewBook(): Promise<ResultInteface> {
    const result: Book[] = [];

    // endpoint
    const URL: string = "http://localhost:8080/books";

    return getData(URL);
}