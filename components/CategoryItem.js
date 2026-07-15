import React from "react";

function CategoryItem({ category, active }) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        p-3
        rounded-2xl
        cursor-pointer
        w-[100px]
        h-[100px]
        transition-all
        duration-200

        ${
          active
            ? "bg-purple-500 text-white shadow-lg scale-105"
            : "bg-purple-100 text-purple-700"
        }
      `}
    >
      <img
        src={category.icon}
        alt={category.name}
        className="
          w-[35px]
          h-[35px]
          object-contain
        "
      />

      <h2
        className="
          text-[12px]
          mt-1
          text-center
        "
      >
        {category.name}
      </h2>
    </div>
  );
}

export default CategoryItem;
