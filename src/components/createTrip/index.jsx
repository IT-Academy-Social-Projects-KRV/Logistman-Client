import React, { useState, useCallback, useEffect } from 'react';
import {Form, Input, Button, DatePicker, Select} from "antd";
import Geocode from "react-geocode";
import AppK from "../../components/createTrip/offersTrip"
import Header from "../navigation/header";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { offerValues } from "../../constants/offerValues";

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: offerValues.DEFAULT_LAT_VALUE,
    lng: offerValues.DEFAULT_LNG_VALUE,
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    zoomEnabled: true,
    mapTypeControl: true,
    disableDefaultUI: true,
    streetViewControl: true,
    rotateControl: true,
    clickableIcons: true,
    keyboardShortcuts: true,
    fullscreenControl: true,
};

function AddOfferToTripPage() {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    const [map, setMap] = useState();
    const [clickedLatLng, setClickedLatLng] = useState(center);

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
            <div className="createTripBody">
                <p className="title">Create trip</p>
                <div className="mapBlok_addOfferToTrip">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={clickedLatLng}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={defaultOptions}
                        id="map"
                    >
                    </GoogleMap>
                </div>
                <div className="component-block">
                    <div className="offersComponent">
                        <AppK className = "appK" />

                    </div>
                    <div className="routeComponent">
                        <p>InfoTrip</p>
                    </div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submitButton"
                    >
                        Create trip
                    </Button>
                </div>

            </div>
        </>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}

export default AddOfferToTripPage;
