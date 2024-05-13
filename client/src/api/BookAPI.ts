import React, { useEffect } from "react";
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
            avgRatings: responseData[key].avgRatings,
            isbn: responseData[key].isbn
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
    const URL: string = `http://localhost:8080/books?size=8&page=${currentPage}`;

    return getData(URL);
}

export async function findBooks(currentPage: number, name: string, cateId: number): Promise<ResultInteface> {

    // endpoint
    let URL: string = `http://localhost:8080/books?size=8&page=${currentPage}`;
    if (name !== "" && cateId == 0) {
        URL = `http://localhost:8080/books/search/findByNameContaining?size=8&page=${currentPage}&name=${name}`;
    }
    if (name === "" && cateId > 0) {
        URL = `http://localhost:8080/books/search/findByCategoryList_CategoryId?size=8&page=${currentPage}&id=${cateId}`;
    }
    if (name !== "" && cateId > 0) {
        URL = `http://localhost:8080/books/search/findByNameAndCategoryList_CategoryId?size=8&page=${currentPage}&id=${cateId}&name=${name}`;
    }
    return getData(URL);
}

export async function getBook(id: number): Promise<Book | null> {
    // endpoint
    let URL: string = `http://localhost:8080/books/${id}`;

    try {
        // request
        const response = await MyRequest(URL);

        if (response) {
            return {
                id: response.id,
                title: response.name,
                author: response.author,
                description: response.description,
                originPrice: response.originalPrice,
                price: response.price,
                quantity: response.quantity,
                avgRatings: response.avgRatings,
                isbn: response.isbn
            }
        } else {
            throw new Error("Sách không tồn tại");
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}