import axios from "axios";

// Create axios client for Next.js API routes

const axiosClient = axios.create({
  baseURL: "/api",
});

const GlobalApi = {
  // Get nearby places

  getNearByPlace: (
    category,

    lat,

    lng,
  ) => {
    return axiosClient.get(
      "/places",

      {
        params: {
          category,

          lat,

          lng,
        },
      },
    );
  },

  // Search places by text

  searchPlace: (text) => {
    return axiosClient.get(
      "/search",

      {
        params: {
          query: text,
        },
      },
    );
  },
};

export default GlobalApi;
