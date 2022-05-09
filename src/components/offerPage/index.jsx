import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Header from "../navigation/header";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

export default function Offer() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCU9Ghsq5fKRy9U8yWALIxnsBuxWIaLbhQ",
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <>
            <Header />
            <div className="offer__container">
                <h1>Create offer</h1>
                <form>
                    <div className="form__point">
                        <div className="point__block">
                            <input
                                type="text"
                                placeholder="Enter your address"
                            />
                            <input
                                type="text"
                                placeholder="Enter your settlement"
                            />
                            <input
                                type="text"
                                placeholder="Enter your region"
                            />
                        </div>
                        <div className="map point__block">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                                id="map"
                            ></GoogleMap>
                        </div>
                    </div>
                    <div className="form__offer">
                        <div className="offer__block">
                            <input type="text" placeholder="Enter date" />
                            <select>
                                Goods Category
                                <option>Goods Category</option>
                                <option>Їжа</option>
                                <option>Одяг</option>
                                <option>Гроші</option>
                                <option>Запчастини</option>
                                <option>Інше...</option>
                            </select>
                            <input type="number" placeholder="Goods Weight" />
                        </div>
                        <div className="offer__block">
                            <textarea
                                id="description"
                                placeholder="Description"
                            ></textarea>
                            <button>Create offer</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}
