import React, { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import { getIconImageByBoodId } from "../../../api/ImageAPI";
import { Image } from "../../../models/Image";
import { Link } from "react-router-dom";
import BookList from "../BookList";

interface BookProps {
  book: Book;
}

const BookItem: React.FC<BookProps> = (props) => {
  const bookId: number = props.book.id;
  const [iconImage, setIconImage] = useState<Image>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIconImageByBoodId(bookId)
      .then((imagesData) => {
        setIconImage(imagesData);
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
    <div className="col-md-3 mt-2">
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
              textDecoration: "none", color: "black"
            }}
          >
            <h6
              className="card—title"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: 'start'
              }}
            >
              {props.book.title}
            </h6>
          </Link>
          <div className="price d-flex align-items-start flex-column">
            <h6 className="discounted-price">
              <strong style={{ color: "red" }}>{props.book.price} đ</strong>
            </h6>
            <div className="original-price">
              <del>{props.book.originPrice} đ</del>
            </div>
          </div>
          <div className="row mt—2" role="group">
            <div className="col-6">
              <a href="index.html" className="btn btn-secondary btn-block">
                <i className="fas fa-heart"></i>
              </a>
            </div>
            <div className="col-6">
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
