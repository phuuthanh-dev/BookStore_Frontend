import React from "react";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

export const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating - 0.5) {
            stars.push(<StarFill className="text-warning" key={i}/>);
        } else if (i <= rating) {
            stars.push(<StarHalf className="text-warning" key={i}/>);
        } else {
            stars.push(<Star className="text-secondary" key={i}/>);
        }
    }
    
    return stars;
  }