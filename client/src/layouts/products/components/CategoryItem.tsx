import React, { useEffect, useState } from "react";
import { Category } from "../../../models/Category";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  return (
    <li>
      <Link className="dropdown-item" to={`/category/${props.category.id}`}>
        {props.category.name}
      </Link>
    </li>
  );
};

export default CategoryItem;
