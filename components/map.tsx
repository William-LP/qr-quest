"use client"

import React from 'react'

import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { Icon } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import "leaflet/dist/leaflet.css"

import { CheckPoint } from "@/types/types"


// import LeafletControlGeocoder from "./LeafletControlGeocoder";


const position: [number, number] = [48.8566, 2.3522]



const customIcon = new Icon({
    // iconUrl: require("./img/location-marker.png"),
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776000.png",
    iconSize: [38, 38]
})





const map = ({ checkpoints, setCheckpoints }: { checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>> }) => {



    const MapEvents = () => {
        useMapEvents({
            click(e) {
                const id = checkpoints.length + 1


                setCheckpoints(
                    [
                        ...checkpoints,
                        {

                            lat: e.latlng.lat,
                            long: e.latlng.lng,
                            rank: id,
                            hint: "",
                            name: `${e.latlng.lat} / ${e.latlng.lng}`,
                            id: id.toString()
                        }
                    ]

                );
            },
        });
        return false;
    }
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={25}
                />

                <MarkerClusterGroup
                    chunkedLoading
                >
                    {
                        checkpoints?.map((marker, index) => (
                            <Marker key={index} position={[marker.lat, marker.long]} icon={customIcon}>
                                {/* <Popup style={{ padding: 0 }} >
                            <PopUpCard />
                        </Popup> */}
                                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                                    #{marker.id} - {marker.name}
                                </Tooltip>
                            </Marker>
                        ))
                    }
                </MarkerClusterGroup>
                <MapEvents />
                { /* <LeafletControlGeocoder /> */}
            </MapContainer>

        </div>
    )
}

export default map


