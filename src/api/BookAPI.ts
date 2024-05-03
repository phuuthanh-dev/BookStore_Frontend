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
    const URL: string = `http://localhost:8080/books?size=3&page=${currentPage}`;

    return getData(URL);
}

export async function findBooksByName(currentPage: number, name: string): Promise<ResultInteface> {

    // endpoint
    let URL: string = `http://localhost:8080/books?size=3&page=${currentPage}`;
    if (name !== "") {
        // URL = `http://localhost:8080/books?size=3&page=0&name=${name}`;
        URL = `http://localhost:8080/books/search/findByNameContaining?size=3&page=${currentPage}&name=${name}`;
    }
    return getData(URL);
}