import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import BookList from "../products/BookList";
import { useParams } from "react-router-dom";

interface HomePageProps {
  textSearch: string;
  setTextSearch: (textSearch: string) => void;
}

function HomePage({ textSearch, setTextSearch }: HomePageProps) {
  const { id } = useParams();
  let categoryId = 0;


  try {
    categoryId = parseInt(id + "");
  } catch (error) {
    categoryId = 0;
    console.log("Error parsing category id: " + error);
  }
  if (Number.isNaN(categoryId)) {
     categoryId = 0;
  }

  return (
    <div>
      <Banner />
      <Carousel />
      <BookList textSearch={textSearch} categoryId={categoryId} />
    </div>
  );
}

export default HomePage;
