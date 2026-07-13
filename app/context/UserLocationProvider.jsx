"use client";

import { useState } from "react";
import { UserLocationContext } from "./UserLocationContext";

export default function UserLocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <UserLocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
}