/* "use client"

import React, { useEffect, useState } from 'react'
import Data from '../Shared/Data';
import CategoryItem from './CategoryItem';

function CategoryList() {
  const[category,setCategory]=useState([]);
  useEffect(()=>{setCategory(Data.CategoryListData)},[]);
  return (
    <div>
      <h2 className='
        text-[20px]
        mt-3
        font-bold
        mb-3
      '>Select Your Category</h2>
      <div 
        className='
        flex
        gap-6
        mb-6
        '>
        {category.map((item,index)=>(
          <div key={index}>
            <CategoryItem category={item}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList */

"use client";

import React, { useEffect, useState } from "react";
import Data from "../Shared/Data";
import CategoryItem from "./CategoryItem";

function CategoryList({ setSelectedCategory }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setCategory(Data.CategoryListData);
  }, []);

  return (
    <div>
      <h2 className="text-[20px] mt-3 font-bold mb-3">
        Select Your Category
      </h2>

      <div className="flex gap-6 mb-6">
        {category.map((item) => (
          <div
            key={item.name}
            className="cursor-pointer"
            onClick={() => {
              console.log("CLICK:", item.name); // 👈 проверка клика
              setSelectedCategory(item.value);
            }}
          >
            <CategoryItem category={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;