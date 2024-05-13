import { MyRequest } from "./Request";
import { Review } from "../models/Review";

interface ResultInteface {
    reviewData: Review[];
}

async function getData(URL: string): Promise<ResultInteface> {
    const reviews: Review[] = [];

    // request
    const response = await MyRequest(URL);

    // get json book
    const responseData = response._embedded.ratings;

    for (const key in responseData) {
        reviews.push({
            id: responseData[key].id,
            rating: responseData[key].ratingScore,
            comment: responseData[key].comment,
            bookId: 0,
            userId: 0,
        })
    }

    return {
        reviewData: reviews
    };
}

export async function getReviewsByBookId(bookId: number): Promise<ResultInteface> {

    // endpoint
    const URL: string = `http://localhost:8080/books/${bookId}/ratings`;

    return getData(URL);
}
