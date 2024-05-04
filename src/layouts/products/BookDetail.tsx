import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../../api/BookAPI";
import { Book } from "../../models/Book";
import ImageProduct from "./components/ImageProduct";
import ReviewBook from "./components/ReviewBook";
import { renderRating } from "../utils/RatingStar";
import { formatNumber } from "../utils/FormatNumber";

const BookDetail: React.FC = () => {
  const { id } = useParams();
  let bookId = 0;

  try {
    bookId = parseInt(id + "");
    if (Number.isNaN(bookId)) {
      bookId = 0;
    }
  } catch (error) {
    bookId = 0;
    console.log("Error parsing category id: " + error);
  }

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBook(bookId)
      .then((book) => {
        setBook(book);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [bookId]);

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

  if (!book) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Book Not Found...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ textAlign: "left" }}>
      <div className="row mt-4 mb-4">
        <div className="col-5">
          <ImageProduct bookId={book.id} />
        </div>
        <div className="col-7">
          <div className="row">
            <div className="col-8">
              <h5>
                {renderRating(book.avgRatings ? book.avgRatings : 0)}{" "}
                <span>(0 customer review)</span>
              </h5>
              <h4>{book.title}</h4>
              <h6 style={{ color: "blue" }}>{book.author} (Author)</h6>
              <h4 style={{ color: "red" }}>{formatNumber(book.price)} đ</h4>
              <hr />
              <div>
                ISBN: <span style={{ color: "grey" }}>{book.isbn}</span>
              </div>
              <div>
                Quantity: <span style={{ color: "grey" }}>{book.quantity}</span>
              </div>
              <div>
                Description:{" "}
                <span style={{ color: "grey" }}>{book.description}</span>
              </div>
              <hr />
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-6">
                  <Link to="index.html" className="btn btn-secondary">
                    Add to Cart
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="index.html" className="btn btn-primary">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <ReviewBook bookId={bookId} />
      </div>
    </div>
  );
};

export default BookDetail;
