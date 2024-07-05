"use client"

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Tooltip } from 'react-leaflet';
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import { CheckPoint } from "@/types/types";

const position: [number, number] = [48.8566, 2.3522];

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776000.png",
    iconSize: [38, 38],
});

const SearchField = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();

    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider,
            style: 'button',
            showMarker: false,
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map, provider]);
    return null
};

const MapComponent = ({ checkpoints, setCheckpoints }: { checkpoints: CheckPoint[], setCheckpoints: React.Dispatch<React.SetStateAction<CheckPoint[]>> }) => {

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                const id = checkpoints.length + 1;
                setCheckpoints([
                    ...checkpoints,
                    {
                        latitude: e.latlng.lat,
                        longitude: e.latlng.lng,
                        rank: id,
                        hint: "",
                        name: `${e.latlng.lat} / ${e.latlng.lng}`,
                        id: id.toString(),
                    },
                ]);
            },
        });
        return null;
    };

    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={25}
                />

                <SearchField />

                <MarkerClusterGroup chunkedLoading>
                    {checkpoints?.map((marker, index) => (
                        <Marker key={index} position={[marker.latitude, marker.longitude]} icon={customIcon}>
                            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                                #{marker.id} - {marker.name}
                            </Tooltip>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
                <MapEvents />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
