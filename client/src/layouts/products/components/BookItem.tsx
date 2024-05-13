import React, { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import { getIconImageByBoodId } from "../../../api/ImageAPI";
import { Image } from "../../../models/Image";
import { Link } from "react-router-dom";
import { renderRating } from "../../utils/RatingStar";
import { formatNumber } from "../../utils/FormatNumber";

interface BookProps {
  book: Book;
}

const BookItem: React.FC<BookProps> = (props) => {
  const [bookId, setBookId] = useState<number>(props.book.id);
  const [iconImage, setIconImage] = useState<Image>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLastBookId = async () => {
      try {
        const response = await fetch("http://localhost:8080/books/search/findFirstByOrderByIdDesc");
        if (!response.ok) {
          throw new Error("Failed to fetch last book's ID");
        }
        const lastBook = await response.json();
        if (lastBook && lastBook.id) {
          // Update the bookId state with the new value
          setBookId(lastBook.id);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
      }
    };
  
    // Call getLastBookId only if bookId is undefined
    if (bookId === undefined) {
      getLastBookId();
    }
  }, [bookId]); 


  useEffect(() => {
    // Fetch icon image based on the updated bookId
    if (bookId !== undefined) {
      getIconImageByBoodId(bookId)
        .then((imagesData) => {
          setIconImage(imagesData);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }
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

  return (
    <div className="col-md-3 mt-4">
      <div className="card">
        <Link to={`/view-detail/book/${props.book.id}`}>
          <img
            src={iconImage?.data}
            className="card-img-top"
            alt={props.book.title}
            style={{ marginTop: "12px", height: "300px" }}
          />
        </Link>
        <div className="card-body">
          <Link
            to={`/view-detail/book/${props.book.id}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <h6
              className="card—title"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "start",
              }}
            >
              {props.book.title}
            </h6>
          </Link>
          <div className="price d-flex align-items-start flex-column mb-2">
            <span className="discounted-price">
              <strong style={{ color: "red" }}>
                {formatNumber(props.book.price)}<sup>đ</sup>
              </strong>
            </span>
            <span className="original-price">
              <del>{formatNumber(props.book.originPrice)}<sup>đ</sup></del>
            </span>
          </div>
          <div className="row mt—2" role="group">
            <div className="col-6" style={{ textAlign: "start" }}>
              <span>
                {renderRating(
                  props.book.avgRatings ? props.book.avgRatings : 0
                )}
              </span>
            </div>
            <div className="col-6 text-end">
              <Link to="/" className="btn btn-secondary btn-block me-2">
                <i className="fas fa-heart"></i>
              </Link>
              <button className="btn btn-danger btn-block">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
