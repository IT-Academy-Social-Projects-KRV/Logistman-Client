import React, {useState, useEffect} from 'react';
import Geocode from "react-geocode";
import {DirectionsRenderer, GoogleMap, Marker, InfoWindow, useJsApiLoader} from "@react-google-maps/api";
import {Result} from "antd";
import {buildTheRoute} from "../../../services/maps";
import {mapCenter} from "../../../constants/map";
import {unitsOfMeasurement} from "../../../constants/others";
import {getOffersNearRoute} from "../../../services/offers";
import marker_S from "../../../assets/images/mapMarkers/marker_S.png";
import marker_R from "../../../assets/images/mapMarkers/marker_R.png";
import {offerRoles} from "../../../constants/offerRoles";

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

function TripMap(props) {
    const [center, setCenter] = useState(mapCenter);
    const [directionResponse, setDirectionResponse] = useState();
    const [offers, setOffers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    });

    useEffect(() => {
        async function fetchData() {
            const offers = props.nearOffers;

            for (let i = 0; i < offers.length; i++) {
                offers[i] = {...offers[i], key: offers[i].pointId};
            }

            setOffers(offers);
            setDirectionResponse(await setAuxiliaryPoints(props.points));
        }

        fetchData();
    }, [props.points, props.nearOffers])

    const setAuxiliaryPoints = async (points) => {
        if (points == null || points.length < 2) {

            return;
        }

        const subPointCoordinates = [];

        for (let i = 1; i < points.length - 1; i++) {
            subPointCoordinates.push({
                location: {
                    lat: points[i].latitude,
                    lng: points[i].longitude
                }
            });
        }

        const direction = await buildTheRoute(
            {
                lat: points[0].latitude,
                lng: points[0].longitude
            },
            {
                lat: points[points.length - 1].latitude,
                lng: points[points.length - 1].longitude
            },
            subPointCoordinates
        )

        setCenter();

        return direction
    }

    const getDistance = (direction) => {
        let distance = 0, previousKmPoint = 0;
        const routeLegs = direction.routes[0].legs;

        for (const legIndex in routeLegs) {

            for (const stepIndex in routeLegs[legIndex].steps) {
                const legDistance = routeLegs[legIndex].steps[stepIndex].distance.text;

                const legDistanceArray = legDistance.split(' ');

                let legDistanceInM = legDistanceArray[0];
                const unitOfMeasurement = legDistanceArray[1];

                if (unitOfMeasurement === unitsOfMeasurement.METER) {
                    distance += parseFloat(legDistanceInM);
                } else {
                    legDistanceInM = legDistanceInM.replace(',', '.');
                    distance += legDistanceInM * 1000;
                }

                previousKmPoint = distance / 1000;
            }
        }

        distance /= 1000;

        return distance;
    };

    if (directionResponse != null) {
        props.getDistance(getDistance(directionResponse));
    }

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {

            return;
        }
        setActiveMarker(marker);
    };

    return isLoaded && offers != null ? (
            <GoogleMap
                center={center}
                zoom={12}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: true,
                    fullscreenControl: true
                }}
                id="map"
            >
                <DirectionsRenderer directions={directionResponse}/>
                {
                    offers.map(item =>
                        (
                            <Marker
                                icon={item.creatorRoleName == offerRoles.SENDER ? marker_S : marker_R}
                                key={item.key}
                                position={{lat: item.latitude, lng: item.longitude}}
                                onClick={() => handleActiveMarker(item.key)}
                            >
                                {activeMarker === item.key ? (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                        <div>
                                            <p>Address: {item.country}, {item.address}</p>
                                            <p>Role: {item.creatorRoleName}</p>
                                            <p>Good category: {item.goodCategoryName}</p>
                                        </div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>)
                    )
                }
            </GoogleMap>
        )
        :
        (
            <Result
                status="404"
                title="No route information."
            />
        );
}

export default TripMap;
