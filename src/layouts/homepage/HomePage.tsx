import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";

interface HomePageProps {
  textSearch: string;
  setTextSearch: (textSearch: string) => void;
}

function HomePage({ textSearch, setTextSearch }: HomePageProps) {
  return (
    <div>
      <Banner />
      <Carousel />
      <BookList textSearch={textSearch} />
    </div>
  );
}

export default HomePage;
