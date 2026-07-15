import axios from "axios";

// Google Places Nearby Search API URL

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

// API route:
// /api/places
//
// Receives:
// category
// lat
// lng
//
// Returns nearby places from Google

export async function GET(req) {
  try {
    console.log("PLACES API HIT");

    // Get parameters from URL

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");

    const lat = searchParams.get("lat");

    const lng = searchParams.get("lng");

    console.log("REQUEST:", category, lat, lng);

    // Google uses "lodging"
    // instead of "hotel"

    let placeType = category;

    if (category === "hotel") {
      placeType = "lodging";
    }

    // Call Google Places API

    const response = await axios.get(
      BASE_URL,

      {
        params: {
          type: placeType,

          location: `${lat},${lng}`,

          radius: 5000,

          key: process.env.GOOGLE_API_KEY,
        },
      },
    );

    console.log(
      "GOOGLE STATUS:",

      response.data.status,
    );

    console.log(
      "FOUND:",

      response.data.results.length,
    );

    return Response.json(response.data);
  } catch (error) {
    console.log(
      "PLACES ERROR:",

      error.response?.data || error.message,
    );

    return Response.json(
      {
        error: "Failed to get places",
      },

      {
        status: 500,
      },
    );
  }
}
