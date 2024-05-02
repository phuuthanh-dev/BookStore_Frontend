import React, { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import { getImagesByBookId } from "../../../api/ImageAPI";
import { Image } from "../../../models/Image";

interface BookProps {
  book: Book;
}

const BookProps: React.FC<BookProps> = (props) => {
  const bookId: number = props.book.id;
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getImagesByBookId(bookId)
      .then((imagesData) => {
        setImages(imagesData);
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

  let primaryImg: string = "";
  // có ảnh và có data ảnh
  if (images.length > 0 && images[0].data) {
    for (const image of images) {
      // tìm icon
      if (image.icon === true) {
        primaryImg = image.data;
        break;
      }
    }
  }

  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        <img
          src={primaryImg}
          className="card-img-top"
          alt={props.book.title}
          style={{ marginTop: "12px", height: "300px" }}
        />
        <div className="card-body">
          <h5
            className="card—title"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.book.title}
          </h5>
          <p
            className="card-text"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.book.description}
          </p>
          <div className="price">
            <span className="original~price">
              <del>{props.book.originPrice}</del>
            </span>
            <span className="discounted-price">
              <strong>{props.book.price}</strong>
            </span>
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

export default BookProps;
