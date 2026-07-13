"use client";

import { useEffect, useState } from "react";

import SideNavBar from "../components/SideNavBar";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";
import MapGoogle from "../components/MapGoogle";
import PlaceInfoBox from "../components/PlaceInfoBox";

import GlobalApi from "../service/GlobalApi";
import { getUserLocation } from "./utils/getUserLocation";


export default function Home() {


  const [places, setPlaces] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("gas_station");

  const [userLocation, setUserLocation] =
    useState(null);

  const [loading, setLoading] =
    useState(false);



  // Получаем позицию пользователя

  useEffect(() => {

    getUserLocation()

      .then((coords) => {

        console.log(
          "USER LOCATION:",
          coords
        );

        setUserLocation(coords);

      })

      .catch((err)=>{

        console.log(
          "LOCATION ERROR:",
          err
        );

      });


  }, []);




  // Запрос мест рядом

  const getNearByPlace = async (

    category,
    lat,
    lng

  ) => {


    try {


      setLoading(true);


      console.log(
        "API CALL:",
        category,
        lat,
        lng
      );



      const resp =
        await GlobalApi.getNearByPlace(

          category,
          lat,
          lng

        );



      console.log(
        "API RESULT:",
        resp.data
      );



      setPlaces(

        resp.data?.results || []

      );



    }

    catch(error){


      console.log(
        "API ERROR:",
        error
      );


    }

    finally{


      setLoading(false);


    }


  };





  // Загружаем места при изменении категории

  useEffect(()=>{


    if(!userLocation)
      return;



    getNearByPlace(

      selectedCategory,

      userLocation.lat,

      userLocation.lng

    );


  },[

    selectedCategory,

    userLocation

  ]);







  return (

    <div className="flex">


      <SideNavBar />



      <div

        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
        px-6
        md:px-10
        mt-10
        w-full
        "

      >



        {/* LEFT SIDE */}

        <div>


          <SearchBar />



          <CategoryList

            setSelectedCategory={
              setSelectedCategory
            }

          />



          <BusinessList

            places={places}

            loading={loading}

          />


        </div>





        {/* RIGHT SIDE */}


        <div>


          <h2 className="text-xl font-bold mb-4">

            Map Area

          </h2>



          <MapGoogle


            userLocation={userLocation}


            places={places}


            selectedCategory={
              selectedCategory
            }


          />




          <PlaceInfoBox


            userLocation={
              userLocation
            }


          />



        </div>



      </div>



    </div>

  );

}