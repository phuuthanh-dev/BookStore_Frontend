import React, { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import { getIconImageByBoodId, getImagesByBookId } from "../../../api/ImageAPI";
import { Image } from "../../../models/Image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageProductProps {
  bookId: number;
}

const ImageProduct: React.FC<ImageProductProps> = (props) => {
  const bookId: number = props.bookId;

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

  return (
    <div className="row">
      <div className="col-12">
        <Carousel showArrows={true} showIndicators={true} showThumbs={true}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.data}
                alt={image.name}
                style={{ maxWidth: "400px" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageProduct;
