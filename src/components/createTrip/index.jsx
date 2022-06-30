import React, {useState, useCallback, useEffect} from 'react';
import {Button} from "antd";
import Geocode from "react-geocode";
import Header from "../navigation/header";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {useLocation} from "react-router-dom";
import AddOfferToTrip from "./offersPointTrip";
import UserRoute from "./infoTrip";

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 34,
    lng: 23,
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

function ManageTripPage() {
    const location = useLocation();
    const userData = location.state;
    console.log(userData);
    const {isLoaded} = useJsApiLoader({
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
            <Header/>
            <div className="createTripBody">
                <p className="title">Manage trip</p>
                <div className="mapComponent">
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

                {userData != null ?
                    <UserRoute props={userData}/>
                    :
                    <p>Trip not found</p>
                }

                <div className="component-block">

                    <AddOfferToTrip/>

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

export default ManageTripPage;
