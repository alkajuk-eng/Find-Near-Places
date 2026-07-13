import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
});

const getNearByPlace = (category, lat, lng) => {
  return axiosClient.get("/places", {
    params: {
      category,
      lat,
      lng,
    },
  });
};

export default {
  getNearByPlace,
};

