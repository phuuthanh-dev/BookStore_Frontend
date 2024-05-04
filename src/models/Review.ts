export class Review {
    id: number;
    rating: number;
    comment: string;
    bookId: number;
    userId: number;

	constructor(id: number, rating: number, comment: string, bookId: number, userId: number) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.bookId = bookId;
        this.userId = userId;
    }
    
}