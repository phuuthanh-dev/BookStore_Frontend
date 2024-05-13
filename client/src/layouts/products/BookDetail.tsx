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
  const [quantity, setQuantity] = useState(1);
  const stockQuantity = book?.quantity ? book.quantity : 0;

  const increaseQuantity = (value: number) => {
    const newQuantity = value + quantity;
    if (newQuantity <= stockQuantity) {
      setQuantity(quantity + value);
    }
  };

  const decreaseQuantity = (value: number) => {
    if (quantity > 1) {
      setQuantity(quantity - value);
    }
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (
      !Number.isNaN(newQuantity) &&
      newQuantity <= stockQuantity &&
      newQuantity >= 1
    ) {
      setQuantity(newQuantity);
    } else if (newQuantity > stockQuantity) {
      setQuantity(stockQuantity);
    }
  };

  const handleBuyNow = () => {};

  const handleAddToCart = () => {};

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
        <div className="col-4">
          <ImageProduct bookId={book.id} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              <h5>
                {renderRating(book.avgRatings ? book.avgRatings : 0)}{" "}
                <span>(0 customer review)</span>
              </h5>
              <h4>{book.title}</h4>
              <h6 style={{ color: "blue" }}>{book.author} (Author)</h6>
              <h4 style={{ color: "red" }}>
                {formatNumber(book.price)}
                <sup>đ</sup>
              </h4>
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
              <div>
                <div className="mb-2">Quantity</div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => decreaseQuantity(1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="no-spinners form-control fw-bold text-center"
                    value={quantity}
                    min={1}
                    max={book.quantity}
                    onChange={handleChangeQuantity}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => increaseQuantity(1)}
                  >
                    +
                  </button>
                </div>
                {book.price && (
                  <div className="mt-4">
                    Subtotal:
                    <br />
                    <h4 className="mt-1">
                      {formatNumber(book.price * quantity)}
                      <sup>đ</sup>
                    </h4>
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button
                    onClick={handleBuyNow}
                    type="button"
                    className="btn btn-danger mt-2"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    type="button"
                    className="btn btn-outline-primary mt-2"
                  >
                    Add To Cart
                  </button>
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
