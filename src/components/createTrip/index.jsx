import React, { useState } from "react";
import Geocode from "react-geocode";
import { Button } from 'antd';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from '@react-google-maps/api';
import Header from '../navigation/header';

Geocode.setApiKey("AIzaSyAdPX1hEy04ED1D8TLhLsTEwNSJ5xbo0Vo");

Geocode.setLanguage("ua");

Geocode.setRegion("ua");

Geocode.enableDebug();

const center = {
    lat: 50.45,
    lng: 30.52
};

export default function CreateTripPage() {
    const [originAddress, setOriginAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    const [map, setMap] = useState(/** @type google.maps.Map */(null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAdPX1hEy04ED1D8TLhLsTEwNSJ5xbo0Vo"
    });

    async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService();

        const results = await directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING
        });

        setDirectionsResponse(results);

        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    const handleSelectOrigin = async (value) => {
        setOriginAddress(value);

        geocodeByAddress(value)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setOrigin(latLng);
            })
            .catch(error => console.error('Error', error));
    };

    const handleSelectDestination = async (value) => {
        setDestinationAddress(value);

        geocodeByAddress(value)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setDestination(latLng);
            })
            .catch(error => console.error('Error', error));
    };

    const onOriginChange = (value) => {
        setOriginAddress(value);
    };

    const onDestinationChange = (value) => {
        setDestinationAddress(value);
    };

    return isLoaded ? (
        <div className="createTripBody">

            <Header />

            <PlacesAutocomplete
                value={originAddress}
                onChange={onOriginChange}
                onSelect={handleSelectOrigin}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search the origin address',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <PlacesAutocomplete
                value={destinationAddress}
                onChange={onDestinationChange}
                onSelect={handleSelectDestination}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                }) => (

                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search the destination address',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <Button onClick={calculateRoute}>
                Ok
            </Button>

            <div style={{ height: "500px", width: "100%" }}>
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </div>
        </div>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}
