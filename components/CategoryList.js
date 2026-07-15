"use client";

import React, { useEffect, useState } from "react";

import Data from "../Shared/Data";
import CategoryItem from "./CategoryItem";

function CategoryList({ setSelectedCategory }) {
  const [category, setCategory] = useState([]);

  // Store currently selected category

  const [activeCategory, setActiveCategory] = useState("gas_station");

  useEffect(() => {
    setCategory(Data.CategoryListData);
  }, []);

  return (
    <div>
      <h2 className="text-[20px] mt-3 font-bold mb-3">Select Your Category</h2>

      <div className="flex gap-6 mb-6">
        {category.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              console.log(
                "SELECT CATEGORY:",

                item.value,
              );

              setActiveCategory(item.value);

              setSelectedCategory(item.value);
            }}
          >
            <CategoryItem
              category={item}
              active={activeCategory === item.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
