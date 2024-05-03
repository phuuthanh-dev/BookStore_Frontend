import React, { useEffect, useState } from "react";
import { Book } from "../../models/Book";
import BookProps from "./components/BookProps";
import { findBooksByName, getBooks } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";
import { text } from "stream/consumers";

interface BookListProps {
  textSearch: string;
}

const BookList: React.FC<BookListProps> = ({ textSearch }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    if (textSearch === "") {
      getBooks(currentPage - 1)
        .then((response) => {
          setBooks(response.booksData);
          setLoading(false);
          setTotalPages(response.totalPages);
          setTotalBooks(response.totalBooks);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      setCurrentPage(1);
      findBooksByName(currentPage - 1, textSearch)
        .then((response) => {
          setBooks(response.booksData);
          setLoading(false);
          setTotalPages(response.totalPages);
          setTotalBooks(response.totalBooks);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }
  }, [currentPage, textSearch]); // gọi lại khi trang thay đổi


  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

  if (books.length === 0) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              Không tìm thấy sách
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        {books.map((book) => (
          <BookProps key={book.id} book={book} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BookList;
