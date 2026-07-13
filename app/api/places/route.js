 import axios from "axios";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(req) {
  try {
    console.log("API HIT");

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || "restaurant";
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const response = await axios.get(BASE_URL, {
      params: {
        type: category,
        location: `${lat},${lng}`,
        radius: 5000,
        key: GOOGLE_API_KEY,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}