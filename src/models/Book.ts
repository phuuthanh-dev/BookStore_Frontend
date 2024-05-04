export class Book {
    id: number;
    title?: string;
    author?: string;
    description?: string;
    originPrice?: number;
    price?: number;
    quantity?: number;
    avgRatings?: number;
    isbn?: string;

    constructor(id: number, title: string, author: string, description: string, originPrice: number, price: number, isbn: string, avgRatings: number, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.originPrice = originPrice;
        this.price = price;
        this.isbn = isbn;
        this.avgRatings = avgRatings;
        this.quantity = quantity;
    }

}