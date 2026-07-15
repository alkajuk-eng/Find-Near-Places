"use client";

import { createContext } from "react";

// Global context for user GPS location
//
// Used by:
// - MapGoogle      -> center map on user
// - UserLocationMarker -> show user marker
// - PlaceInfoBox   -> calculate distance
// - Business search -> find nearby places

export const UserLocationContext = createContext(null);
