// Category data used by CategoryList component
//
// Each category contains:
// id    - unique identifier
// name  - text displayed to user
// value - value sent to Google Places API
// icon  - image from public folder

const CategoryListData = [
  // Petrol stations

  {
    id: 1,
    name: "Gas Station",
    // Google Places type
    value: "gas_station",
    icon: "/petrol-station.png",
  },

  // Restaurants
  {
    id: 2,

    name: "Restaurants",
    // Google Places type
    value: "restaurant",
    icon: "/restaurant.png",
  },

  // Hotels
  {
    id: 3,
    name: "Hotel",
    // Google Places type
    // Converted to "lodging" later in API
    value: "hotel",
    icon: "/hotel.png",
  },
];

// Export categories
// Used inside CategoryList.js

export default {
  CategoryListData,
};
