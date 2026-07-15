"use client";

import { useState } from "react";

import { SelectedBusinessContext } from "./SelectedBusinessContext";

// Provider stores the currently selected place/business
//
// Used by:
// - BusinessList
// - MapGoogle
// - PlaceInfoBox

export default function SelectedBusinessProvider({ children }) {
  // Store selected business data

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <SelectedBusinessContext.Provider
      value={{
        // Current selected place

        selectedBusiness,

        // Function to change selected place

        setSelectedBusiness,
      }}
    >
      {children}
    </SelectedBusinessContext.Provider>
  );
}
