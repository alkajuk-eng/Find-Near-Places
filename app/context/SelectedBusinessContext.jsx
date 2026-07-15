"use client";

import { createContext } from "react";

// Create global context for selected business/place
//
// This context is shared between:
// - BusinessList  -> select a place from list
// - MapGoogle     -> select a place marker
// - PlaceInfoBox  -> show selected place information

export const SelectedBusinessContext = createContext(null);
