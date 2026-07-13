/* import axios from "axios"

const BASE_URL='https://maps.googleapis.com/maps/api/place'
const GOOGLE_API_KEY=process.env.GOOGLE_API_KEY

export default async function handler(req,res){
    try{
        const responce=await axios(BASE_URL+
            '/nearbysearch/json?fields=formatted_address,name,rating,opening_hours,geometry,photos&type='+
        req.query.category+'&location='+req.query.lat+','+req.query.lng+'&radius=1000&key='
        +GOOGLE_API_KEY);

        const data=response.data;
        res.status(200).json('data');
    }catch(error)
    {
        console.error(error)
        res.status(500).json({error:error});
    }
} */

/* import axios from "axios";

const BASE_URL ="https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category") || "restaurant";
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    console.log("QUERY:", { category, lat, lng });
    console.log("KEY:", GOOGLE_API_KEY);

    const response = await axios.get(BASE_URL, {
      params: {
        type: category,
        location: `${lat},${lng}`,
        radius: 1000,
        key: GOOGLE_API_KEY,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);

    return Response.json(
      { error: error.response?.data || error.message },
      { status: 500 }
    );
  }
} */

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