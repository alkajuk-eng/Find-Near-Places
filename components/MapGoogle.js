"use client";


import { useContext, useState } from "react";

import {
 GoogleMap,
 LoadScript,
 MarkerF,
 InfoWindow
}
from "@react-google-maps/api";


import UserLocationMarker from "./Marker";


import {
 SelectedBusinessContext
}
from "../app/context/SelectedBusinessContext";



export default function MapGoogle({

userLocation,
places,
selectedCategory

}) {


const [map,setMap]=useState(null);



const {

selectedBusiness,
setSelectedBusiness

}=useContext(SelectedBusinessContext);




function getMarkerIcon(){


switch(selectedCategory){


case "gas_station":

return "/petrol-station.png";


case "restaurant":

return "/restaurant.png";


case "hotel":

return "/hotel.png";


default:

return "/placeholder.png";


}


}



return (

<LoadScript

googleMapsApiKey={
process.env.NEXT_PUBLIC_GOOGLE_API_KEY
}

>


{userLocation && (


<GoogleMap


mapContainerStyle={{

width:"100%",
height:"400px",
borderRadius:"20px"

}}


center={userLocation}


zoom={14}


onLoad={(map)=>setMap(map)}


>



<UserLocationMarker

userLocation={userLocation}

/>



{places?.map((place,index)=>(


<MarkerF


key={index}


position={{

lat:Number(place.geometry.location.lat),

lng:Number(place.geometry.location.lng)

}}


icon={{

url:getMarkerIcon(),

scaledSize:
new window.google.maps.Size(40,40)

}}



onClick={()=>{

setSelectedBusiness(place);

}}


/>


))}




{selectedBusiness && (


<InfoWindow


position={{

lat:Number(
selectedBusiness.geometry.location.lat
),

lng:Number(
selectedBusiness.geometry.location.lng
)

}}



onCloseClick={()=>{

setSelectedBusiness(null);

}}



>


<div>

<h3 className="font-bold">

{selectedBusiness.name}

</h3>


<p>

{selectedBusiness.vicinity}

</p>


</div>


</InfoWindow>


)}



</GoogleMap>


)}



</LoadScript>

)


}