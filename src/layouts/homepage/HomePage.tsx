import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";

function HomePage() {
    return (
        <div>
            <Banner/>
            <Carousel />
            <BookList/>
        </div>
    );
}

export default HomePage;