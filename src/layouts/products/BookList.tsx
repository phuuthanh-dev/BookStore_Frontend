import React, { useEffect, useState } from "react";
import { Book } from "../../models/Book";
import BookProps from "./components/BookProps";
import { getBooks } from "../../api/BookAPI";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBooks()
      .then((bookData) => {
        setBooks(bookData);
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
    <div className="container">
      <div className="row mt-4">
        {books.map((book) => (
          <BookProps key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
