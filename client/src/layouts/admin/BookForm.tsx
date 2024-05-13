import React, { useState } from "react";
import RequireAdmin from "./RequireAdmin";

interface BookFormProps {
    socket: null | any;
}

const BookForm: React.FC<BookFormProps> = (props) => {
    const [book, setBook] = useState({
        id: 0,
        name: "",
        description: "",
        originPrice: 0,
        price: 0,
        quantity: 0,
        isbn: "",
        author: "",
        avgRatings: 0,
        dataImage: "",
        icon: true,
    })

    const [images, setImages] = useState<File | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(book)
        }).then((response) => {
            if (response.ok) {
                alert("Add book successfully!")
                props.socket?.emit("updateBookList", {book});
                setBook({
                    id: 0,
                    name: "",
                    description: "",
                    originPrice: 0,
                    price: 0,
                    quantity: 0,
                    isbn: "",
                    author: "",
                    avgRatings: 0,
                    dataImage: "",
                    icon: true,
                })
            } else {
                alert("Add book not successfully!")
                console.log(response)
            }
        })
    }

    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    }

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImages(file);
            if (file) {
                const base64Image = await getBase64(file);
                setBook({
                    ...book,
                    dataImage: base64Image || ""
                });
            } else {
                setBook({ ...book, dataImage: "" });
            }
        }
    }

    return (
        <div className="row d-flex align-items-center justify-content-center">
            <h1>BookForm</h1>
            <div className="col-6">
                <form onSubmit={handleSubmit} className="form">
                    <input type="hidden" id="id" value={book.id} />
                    <label htmlFor="title" >Book name</label>
                    <input className="form-control mb-4" required type="text" id="title" value={book.name} onChange={(e) => setBook({ ...book, name: e.target.value })} />
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
                    <label htmlFor="images" >Images</label>
                    <input className="form-control mb-4" required type="file" accept="image/*" id="images" onChange={onImageChange} />
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        </div>
    );
}

const BookForm_Admin = RequireAdmin(BookForm);
export default BookForm_Admin;