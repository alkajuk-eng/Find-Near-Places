// Get current user GPS location

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if browser supports geolocation

    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser");

      return;
    }

    // Request current position from device

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Return latitude and longitude

        resolve({
          lat: position.coords.latitude,

          lng: position.coords.longitude,
        });
      },

      (error) => {
        // Handle GPS errors

        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject("User denied location permission");

            break;

          case error.POSITION_UNAVAILABLE:
            reject("Location information unavailable");

            break;

          case error.TIMEOUT:
            reject("Location request timed out");

            break;

          default:
            reject("Unknown location error");
        }
      },

      {
        // Use GPS with better accuracy

        enableHighAccuracy: true,

        // Wait maximum 10 seconds

        timeout: 10000,

        // Use cached location for 5 minutes

        maximumAge: 300000,
      },
    );
  });
};
