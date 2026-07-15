"use client";

import { useEffect, useState } from "react";

// Components

import SideNavBar from "../components/SideNavBar";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";
import FavoriteList from "../components/FavoriteList";
import MapGoogle from "../components/MapGoogle";
import PlaceInfoBox from "../components/PlaceInfoBox";

// API service

import GlobalApi from "../service/GlobalApi";

// GPS function

import { getUserLocation } from "./utils/getUserLocation";

export default function Home() {
  // Stores places from Google API

  const [places, setPlaces] = useState([]);

  // Current selected category

  const [selectedCategory, setSelectedCategory] = useState("gas_station");

  // User GPS location

  const [userLocation, setUserLocation] = useState(null);

  // Loading state

  const [loading, setLoading] = useState(false);

  // Show favorites list

  const [showFavorites, setShowFavorites] = useState(false);

  // Get user location when app starts

  useEffect(() => {
    console.log("GETTING USER LOCATION");

    getUserLocation()
      .then((coords) => {
        console.log("USER LOCATION:", coords);

        setUserLocation(coords);
      })

      .catch((error) => {
        console.log("LOCATION ERROR:", error);
      });
  }, []);

  // Load nearby places

  const getNearByPlace = async (
    category: string,

    lat: number,

    lng: number,
  ) => {
    try {
      setLoading(true);

      console.log("GET PLACES:", category, lat, lng);

      const response = await GlobalApi.getNearByPlace(
        category,

        lat,

        lng,
      );

      console.log(
        "PLACES RESULT:",

        response.data,
      );

      setPlaces(response.data?.results || []);
    } catch (error) {
      console.log(
        "PLACES ERROR:",

        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // Text search

  const searchPlace = async (text: string) => {
    try {
      setLoading(true);

      console.log(
        "TEXT SEARCH:",

        text,
      );

      const response = await GlobalApi.searchPlace(text);

      console.log(
        "SEARCH RESULT:",

        response.data,
      );

      setPlaces(response.data?.results || []);

      // After search show normal list

      setShowFavorites(false);
    } catch (error) {
      console.log(
        "SEARCH ERROR:",

        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // Load places when:
  // - GPS ready
  // - category changes

  useEffect(() => {
    if (!userLocation) {
      console.log("WAITING FOR LOCATION");

      return;
    }

    getNearByPlace(
      selectedCategory,

      userLocation.lat,

      userLocation.lng,
    );
  }, [selectedCategory, userLocation]);

  return (
    <div className="flex">
      {/* Left navigation */}

      <SideNavBar setShowFavorites={setShowFavorites} />

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
          {/* Search */}

          <SearchBar onSearch={searchPlace} />

          {showFavorites ? (
            // Favorites list

            <FavoriteList />
          ) : (
            <>
              {/* Categories */}

              <CategoryList setSelectedCategory={setSelectedCategory} />

              {/* Places list */}

              <BusinessList places={places} loading={loading} />
            </>
          )}
        </div>

        {/* RIGHT SIDE */}

        <div>
          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Map Area
          </h2>

          <MapGoogle
            userLocation={userLocation}
            places={places}
            selectedCategory={selectedCategory}
          />

          <PlaceInfoBox userLocation={userLocation} />
        </div>
      </div>
    </div>
  );
}
