import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getReviewsByBookId } from "../../../api/ReviewAPI";
import { Review } from "../../../models/Review";
import { renderRating } from "../../utils/RatingStar";

interface ReviewBookProps {
  bookId: number;
}

const ReviewBook: React.FC<ReviewBookProps> = (props) => {
  const bookId: number = props.bookId;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviewsByBookId(bookId)
      .then((response) => {
        setReviews(response.reviewData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []); // chi goi 1 lan

  if (loading) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-2 mb-2 text-center">
      <h4>Reviews Produucts: </h4>
      {reviews.map((review, index) => (
        <div className="row" key={index}>
          <div className="col-4 text-end">
            {/* <UserReview/> */}
            <p>{renderRating(review.rating?review.rating:0)}</p>
          </div>
          <div className="col-8 text-start">
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewBook;
