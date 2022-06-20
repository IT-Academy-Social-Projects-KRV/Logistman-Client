import { getLatLng, geocodeByAddress } from 'react-places-autocomplete';
import { DEFAULT_AVOID_TOLLS, DEFAULT_TRAVEL_MODE } from '../constants/map';

export const getCoordinatesFromAddress = async (address) => {
    const results = await geocodeByAddress(address);
    return await getLatLng(results[0]);
}

export const buildTheRoute = async (originCoordinates, destinationCoordinates, subPointCoordinates) => {
    const directionsService = new window.google.maps.DirectionsService();

    const direction = await directionsService.route({
        origin: originCoordinates,
        destination: destinationCoordinates,
        waypoints: subPointCoordinates,
        travelMode: DEFAULT_TRAVEL_MODE,
        avoidTolls: DEFAULT_AVOID_TOLLS
    });

    return direction;
}
