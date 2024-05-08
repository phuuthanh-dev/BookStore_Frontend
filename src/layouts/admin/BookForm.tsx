import React, { useState } from "react";
import RequireAdmin from "./RequireAdmin";

const BookForm: React.FC = () => {
    const [book, setBook] = useState({
        id: 0,
        title: "",
        description: "",
        originPrice: 0,
        price: 0,
        quantity: 0,
        isbn: "",
        author: "",
        avgRatings: 0,
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(book)
        }).then((response) => {
            if (response.ok) {
                alert("Add book successfully!")
                setBook({
                    id: 0,
                    title: "",
                    description: "",
                    originPrice: 0,
                    price: 0,
                    quantity: 0,
                    isbn: "",
                    author: "",
                    avgRatings: 0,
                })
            } else {
                alert("Add book not successfully!")
                console.log(response)
            }
        })
    }

    return (
        <div className="row d-flex align-items-center justify-content-center">
            <h1>BookForm</h1>
            <div className="col-6">
                <form onSubmit={handleSubmit} className="form">
                    <input type="hidden" id="id" value={book.id} />
                    <label htmlFor="title" >Book name</label>
                    <input className="form-control mb-4" required type="text" id="title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
                    <label htmlFor="description" >Book description</label>
                    <input className="form-control mb-4" required type="text" id="description" value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} />
                    <label htmlFor="price" >Price</label>
                    <input className="form-control mb-4" required type="number" id="price" value={book.price} onChange={(e) => setBook({ ...book, price: parseFloat(e.target.value) })} />
                    <label htmlFor="originPrice" >Origin price</label>
                    <input className="form-control mb-4" required type="number" id="originPrice" value={book.originPrice} onChange={(e) => setBook({ ...book, originPrice: parseFloat(e.target.value) })} />
                    <label htmlFor="originPrice" >Quantity</label>
                    <input className="form-control mb-4" required type="number" id="quantity" value={book.quantity} onChange={(e) => setBook({ ...book, quantity: parseInt(e.target.value) })} />
                    <label htmlFor="author" >Author</label>
                    <input className="form-control mb-4" required type="text" id="author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
                    <label htmlFor="isbn" >ISBN</label>
                    <input className="form-control mb-4" required type="text" id="isbn" value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} />
                    <label htmlFor="avgRatings" >Avarage stars</label>
                    <input className="form-control mb-4" required type="number" id="avgRatings" value={book.avgRatings} onChange={(e) => setBook({ ...book, avgRatings: parseFloat(e.target.value) })} />
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        </div>
    );
}

const BookForm_Admin = RequireAdmin(BookForm);
export default BookForm_Admin;