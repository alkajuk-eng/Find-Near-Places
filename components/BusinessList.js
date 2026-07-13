"use client";

import { useState, useEffect, useContext } from "react";
import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";


export default function BusinessList({
  places,
  loading
}) {

  const [page, setPage] = useState(0);

  const {
    setSelectedBusiness
  } = useContext(SelectedBusinessContext);


  const pageSize = 5;


  useEffect(() => {
    setPage(0);
  }, [places]);


  const start = page * pageSize;


  const visiblePlaces = places.slice(
    start,
    start + pageSize
  );


  const showPrev = page > 0;


  const showNext =
    start + pageSize < places.length;



  if (loading) {

    return (

      <div className="space-y-3">

        {[1,2,3,4,5].map((item)=>(

          <div
            key={item}
            className="
              flex
              gap-3
              p-3
              border
              rounded-xl
              animate-pulse
            "
          >

            <div className="
              w-20
              h-20
              bg-gray-300
              rounded-lg
            "/>


            <div className="flex-1 space-y-3">

              <div className="
                h-4
                bg-gray-300
                rounded
                w-3/4
              "/>


              <div className="
                h-3
                bg-gray-300
                rounded
              "/>


            </div>

          </div>

        ))}

      </div>

    );

  }



  return (

    <div className="relative mt-5">


      {/* Левая стрелка */}

      {showPrev && (

        <button

          onClick={()=>{
            setPage(page - 1);
          }}

          className="
            absolute
            -left-12
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            rounded-full
            bg-white
            shadow-md
            z-10
          "

        >
          ◀
        </button>

      )}




      {/* Список */}

      <div className="space-y-3">


        {visiblePlaces.map((place,index)=>(


          <div

            key={index}

            onClick={()=>{

              setSelectedBusiness(place);

            }}


            className="
              flex
              gap-4
              p-3
              border
              rounded-xl
              cursor-pointer
              hover:shadow-lg
              transition
              bg-white
            "

          >


            {/* Фото */}

            <img

              src={
                place.photos?.length

                ?

                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`

                :

                "/placeholder.png"
              }


              alt={place.name}


              className="
                w-20
                h-20
                rounded-lg
                object-cover
              "

            />



            {/* Информация */}

            <div className="flex-1">


              <h3 className="font-bold">

                {place.name}

              </h3>


              <p className="text-sm text-gray-600">

                {place.vicinity}

              </p>


              {place.rating && (

                <p className="mt-1">

                  ⭐ {place.rating}

                </p>

              )}


            </div>


          </div>


        ))}


      </div>





      {/* Правая стрелка */}

      {showNext && (

        <button

          onClick={()=>{

            setPage(page + 1);

          }}


          className="
            absolute
            -right-12
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            rounded-full
            bg-white
            shadow-md
            z-10
          "

        >
          ▶
        </button>

      )}



    </div>

  );

}