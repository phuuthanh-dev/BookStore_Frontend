export class Book {
    id: number;
    title?: string;
    author?: string;
    description?: string;
    originPrice?: number;
    price?: number;
    quantity?: number;
    avgRatings?: number;

    constructor(id: number, title: string, author: string, description: string, originPrice: number, price: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.originPrice = originPrice;
        this.price = price;
    }

}