"use client";

import SideNavBar from "../components/SideNavBar";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";
import GlobalApi from "../service/GlobalApi";
import { useEffect, useState } from "react";
import { getUserLocation } from "./utils/getUserLocation";
import MapGoogle from "../components/MapGoogle";

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("gas_station");
  const [userLocation, setUserLocation] = useState(null);

  // 📍 получаем геолокацию
  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        console.log("USER LOCATION:", coords);
        setUserLocation(coords);
      })
      .catch((err) => {
        console.error("Geo error:", err);
      });
  }, []);

  // 📍 запрос к API
  const getNearByPlace = async (category, lat, lng) => {
    try {
      console.log("API CALL:", category, lat, lng);

      const resp = await GlobalApi.getNearByPlace(
        category,
        lat,
        lng,
        Date.now()
      );

      console.log("API RESULT:", resp.data);

      setPlaces(resp.data?.results || []);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  // 📍 вызываем API когда есть координаты или меняется категория
  useEffect(() => {
    if (!userLocation) return;

    getNearByPlace(
      selectedCategory,
      userLocation.lat,
      userLocation.lng
    );
  }, [selectedCategory, userLocation]);

  return (
    <div className="flex">
      <SideNavBar />

      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8">
        <div>
          <SearchBar />

          <CategoryList setSelectedCategory={setSelectedCategory} />

          <BusinessList places={places} />
        </div>

        <div>
{/*           
          <h2>Map Area</h2>
          {userLocation ? (
            <p>
              Lat: {userLocation.lat}, Lng: {userLocation.lng}
            </p>
          ) : (
            <p>Getting location...</p>
          )}
 */}
          {/* <MapGoogle/> */}
          <MapGoogle userLocation={userLocation} />
        </div>
      </div>
    </div>
  );
}