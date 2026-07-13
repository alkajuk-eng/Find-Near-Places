"use client";

import { useState } from "react";
import { SelectedBusinessContext } from "./SelectedBusinessContext";


export default function SelectedBusinessProvider({ children }) {

  const [selectedBusiness, setSelectedBusiness] = useState(null);


  return (

    <SelectedBusinessContext.Provider

      value={{
        selectedBusiness,
        setSelectedBusiness
      }}

    >

      {children}

    </SelectedBusinessContext.Provider>

  );
}