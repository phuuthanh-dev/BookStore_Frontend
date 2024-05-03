import React, { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import { getIconImageByBoodId, getImagesByBookId } from "../../../api/ImageAPI";
import { Image } from "../../../models/Image";
import { Link } from "react-router-dom";
import BookList from "../BookList";
import { Carousel } from "react-responsive-carousel";

interface ImageProductProps {
  bookId: number;
}

const ImageProduct: React.FC<ImageProductProps> = (props) => {
  const bookId: number = props.bookId;

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSelected, setImageSelected] = useState<Image | null>(null);

  const selectImage = (image: Image) => {
    setImageSelected(image);
  };

  useEffect(() => {
    getImagesByBookId(bookId)
      .then((imagesData) => {
        setImages(imagesData);
        if (imagesData.length > 0) {
          selectImage(imagesData[0]);
        }
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
    // <div className="row">
    //   <div>
    //     <img src={imageSelected?.data} alt={imageSelected?.name} />
    //   </div>
    //   <div className="row mt-2">
    //     {images.map((image, index) => {
    //       return (
    //         <div className="col-3" key={index}>
    //           <img
    //             src={image.data}
    //             alt={image.name}
    //             onClick={() => {
    //               selectImage(image);
    //             }}
    //             style={{ width: "50px" }}
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-12">
                <div className="images p-3">
                  <img
                    src={imageSelected?.data}
                    alt={imageSelected?.name}
                    style={{ width: "100%", height: "350px" }}
                  />
                </div>
                <div className="thumbnail mb-4 d-flex">
                  {images.map((image, index) => {
                    return (
                      <div className="col-3" key={index}>
                        <img
                          src={image.data}
                          alt={image.name}
                          onClick={() => {
                            selectImage(image);
                          }}
                          width="100"
                          height="100"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageProduct;
