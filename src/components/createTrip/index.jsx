import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { Button, Layout, DatePicker, Form, Input, InputNumber, Table, Radio } from 'antd';
import PlacesAutocomplete from "react-places-autocomplete";
import { useJsApiLoader, GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Header from '../navigation/header';
import { geocodeLanguage, mapCenter } from './../../constants/map';
import { errorMessage, confirmMessage } from './../../services/alerts';
import { mapErrorMessages } from './../../constants/messages/map';
import { generalErrorMessages } from './../../constants/messages/general';
import { inputValidationErrorMessages } from './../../constants/messages/inputValidationErrors';
import InputRules from './../../constants/inputRules';
import { checkTimeDifference, setDisabledDate, CALENDER_DATE_FORMAT } from "../../constants/dates";
import { carsErrorMessages } from './../../constants/messages/cars';
import { carTableColumns } from './carsTableColumns';
import { CloseOutlined } from '@ant-design/icons';
import { unitsOfMeasurement } from './../../constants/others';
import { getUserVerifiedCarsAsync } from './../../services/cars';
import { tripsMessages } from './../../constants/messages/trips';
import { buildTheRoute, getCoordinatesFromAddress } from './../../services/map';
import { pointsMessages } from './../../constants/messages/points';
import { createTrip } from "../../services/trip";
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

Geocode.setApiKey(process.env.REACT_APP_API_KEY);
Geocode.setLanguage(geocodeLanguage);
Geocode.setRegion(geocodeLanguage);
Geocode.enableDebug();

function CreateTripPage() {
    let history = useHistory();

    // points' table columns
    const pointsTableColumns = [
        {
            title: "Address",
            dataIndex: "address"
        },
        {
            title: "Settlement",
            dataIndex: "settlement"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (_, record) =>
                <Button
                    danger
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={() => deleteSubPointAsync(record)}
                >
                    Delete
                </Button>
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedCarId(selectedRows[0].id);
        }
    }

    // addresses
    const [originAddress, setOriginAddress] = useState();
    const [destinationAddress, setDestinationAddress] = useState();
    const [subPointAddress, setSubPointAddress] = useState();
    const [subPointsAddresses, setSubPointsAddresses] = useState([]);

    // coordinates
    const [originCoordinates, setOriginCoordinates] = useState();
    const [destinationCoordinates, setDestinationCoordinates] = useState();
    const [subPointCoordinates, setSubPointCoordinates] = useState([]);

    // map
    const [map, setMap] = useState();
    const [center, setCenter] = useState(mapCenter);
    const [directionResponse, setDirectionResponse] = useState();
    const [points, setPoints] = useState([]);

    // cars
    const [verifiedCars, setVerifiedCars] = useState();
    const [selectedCarId, setSelectedCarId] = useState();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    });

    useEffect(() => {
        async function getCarsAsync() {
            const cars = await getUserVerifiedCarsAsync();

            let key = 0;
            cars.map(car => {
                car.key = key;
                key++;
            });

            setVerifiedCars(cars);
        }
        getCarsAsync();
    }, []);

    // form functions
    const onFinishAsync = async (formValues) => {
        if (!checkIsTripReadyForCreating() ||
            !checkIsValidLoadCapacity(formValues.loadCapacity) ||
            !checkTimeDifference(formValues.dates)) {
            return;
        }

        const distance = await buildTheRouteAsync(true);
        const result = await confirmMessage();

        if (result) {
            const tripPoints = await formTripPointsAsync();
            
            setPoints([]);

            const model = {
                startDate: formValues.dates[0]._d,
                expirationDate: formValues.dates[1]._d,
                description: formValues.description,
                loadCapacity: formValues.loadCapacity,
                maxRouteDeviationKm: formValues.maxRouteDeviationKm,
                transportationCarId: selectedCarId,
                distance: distance,
                points: tripPoints
            }

            createTrip(model, history);
        }
    };

    const onFinishFailed = () => {
        errorMessage(
            tripsMessages.CREATE_TRIP_BLOCKED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    // select & change addresses from PlacesAutocomplete component
    const selectOriginAddressAsync = async (originAddress) => {
        const coordinates = await getCoordinatesFromAddress(originAddress);

        setOriginCoordinates(coordinates);
        setCenter(coordinates);
        setOriginAddress(originAddress);
    };

    const selectDestinationAddressAsync = async (destinationAddress) => {
        const coordinates = await getCoordinatesFromAddress(destinationAddress);

        setDestinationCoordinates(coordinates);
        setCenter(coordinates);
        setDestinationAddress(destinationAddress);
    };

    const selectSubPointAddress = (subPointAddress) => {
        setSubPointAddress(subPointAddress);
    };

    const changeOriginAddress = () => {
        setOriginAddress();
        setOriginCoordinates();

        clearMap();
    };

    const changeDestinationAddress = () => {
        setDestinationAddress();
        setDestinationCoordinates();

        clearMap();
    };

    // manage sub points
    const addSubPointAsync = async () => {
        const coordinates = await getCoordinatesFromAddress(subPointAddress);

        if (subPointCoordinates.length !== 0) {
            const prevSubPointLocation = subPointCoordinates[subPointCoordinates.length - 1].location;

            if (JSON.stringify(prevSubPointLocation) == JSON.stringify(coordinates)) {
                errorMessage(
                    pointsMessages.POINT_IS_ALREADY_EXISTS
                );

                return;
            }
        }

        const detailedAddress = await getPointDetailedAddressAsync(coordinates, true);

        if (detailedAddress === undefined) {
            return;
        }

        subPointsAddresses.push(detailedAddress);
        subPointCoordinates.push({
            location: coordinates,
            stopover: true
        });

        setCenter(coordinates);

        await buildTheRouteAsync(false);
    };

    const deleteSubPointAsync = async (subPoint) => {
        setCenter();

        const elementIndex = subPointsAddresses.indexOf(subPoint);

        subPointsAddresses.splice(elementIndex, 1);
        subPointCoordinates.splice(elementIndex, 1);

        await buildTheRouteAsync(false);
    };

    // build the route
    const buildTheRouteAsync = async (isGetAllPoints) => {
        if (originCoordinates === undefined &&
            destinationCoordinates === undefined) {
            return;
        }

        const direction = await buildTheRoute(
            originCoordinates,
            destinationCoordinates,
            subPointCoordinates
        );

        setDirectionResponse(direction);

        if (isGetAllPoints) {
            if (points.length !== 0) {
                setPoints([]);
            }

            return setAuxiliaryPointsAndGetDistance(direction);
        }
    };

    // auxiliary functions
    const getPointDetailedAddressAsync = async (subPointCoordinates_, isStopover) => {
        var house, street, settlement, region, country, postcode;

        await Geocode.fromLatLng(subPointCoordinates_.lat, subPointCoordinates_.lng)
            .then(
                (response) => {
                    const fullAddressComponents = response.results[0].address_components;

                    for (
                        let i = 0;
                        i < fullAddressComponents.length;
                        i++
                    ) {
                        for (
                            let j = 0;
                            j < fullAddressComponents[i].types.length;
                            j++
                        ) {
                            switch (fullAddressComponents[i].types[j]) {
                                case "street_number":
                                    house = fullAddressComponents[i].long_name;
                                    break;
                                case "route":
                                    street = fullAddressComponents[i].long_name;
                                    break;
                                case "locality":
                                    settlement = fullAddressComponents[i].long_name;
                                    break;
                                case "administrative_area_level_1":
                                    region = fullAddressComponents[i].long_name;
                                    break;
                                case "country":
                                    country = fullAddressComponents[i].long_name;
                                    break;
                                case "postal_code":
                                    postcode = fullAddressComponents[i].long_name;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                },
                () => {
                    errorMessage(
                        mapErrorMessages.LOAD_ADDRESS_FAILED,
                        generalErrorMessages.SOMETHING_WENT_WRONG
                    );
                    return undefined;
                }
            )
            .catch(() => {
                errorMessage(
                    mapErrorMessages.LOAD_ADDRESS_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                );
                return undefined;
            });

        if ((isStopover &&
            (house === undefined ||
                street === undefined ||
                country === undefined ||
                postcode === undefined)) ||
            !isStopover &&
            settlement === undefined &&
            region === undefined) {
            errorMessage(
                mapErrorMessages.LOAD_ADDRESS_FAILED,
                generalErrorMessages.SOMETHING_WENT_WRONG
            );

            return undefined;
        }

        return {
            address: street + ", " + house,
            settlement: settlement,
            region: region,
            country: country,
            postcode: postcode
        };
    };

    const clearMap = () => {
        setDirectionResponse();
        setCenter();
    };

    const checkIsTripReadyForCreating = () => {
        if (originCoordinates === undefined) {
            errorMessage(
                tripsMessages.LOAD_ORIGIN_ADDRESS_FAILED,
                tripsMessages.CREATE_TRIP_BLOCKED
            );
            return false;
        }

        if (destinationCoordinates === undefined) {
            errorMessage(
                tripsMessages.LOAD_DESTINATION_ADDRESS_FAILED,
                tripsMessages.CREATE_TRIP_BLOCKED
            );
            return false;
        }

        if (JSON.stringify(originCoordinates) === JSON.stringify(destinationCoordinates) &&
            subPointCoordinates.length === 0) {
            errorMessage(
                tripsMessages.INVALID_DISTANCE,
                tripsMessages.CREATE_TRIP_BLOCKED
            );
            return false;
        }

        if (selectedCarId === undefined) {
            errorMessage(
                carsErrorMessages.ANY_SELECTED_CAR,
                tripsMessages.CREATE_TRIP_BLOCKED
            );
            return false;
        }

        return true;
    };

    const checkIsValidLoadCapacity = (loadCapacity) => {
        for (let index = 0; index < verifiedCars.length; index++) {
            const car = verifiedCars[index];

            if (car.id === selectedCarId &&
                parseFloat(loadCapacity) > parseFloat(car.loadCapacity)) {
                errorMessage(
                    carsErrorMessages.NOT_VALID_LOAD_CAPACITY_FOR_TRIP,
                    tripsMessages.CREATE_TRIP_BLOCKED
                );
                return false;
            }
        }

        return true;
    };

    const formTripPointsAsync = async () => {
        let tripPoints = [];

        for (let index = 0; index < points.length; index++) {
            const point = points[index];

            if (point.stopover) {
                const pointAddress = await getPointDetailedAddressAsync(
                    {
                        lat: point.location.lat,
                        lng: point.location.lng
                    },
                    true
                );

                tripPoints.push({
                    latitude: point.location.lat,
                    longitude: point.location.lng,
                    address: pointAddress.address,
                    country: pointAddress.country,
                    postcode: pointAddress.postcode,
                    region: pointAddress.region,
                    settlement: pointAddress.settlement,
                    stopover: true,
                    order: index + 1
                });
            }
            else {
                tripPoints.push({
                    latitude: point.location.lat,
                    longitude: point.location.lng,
                    stopover: false,
                    order: index + 1
                });
            }
        }

        return tripPoints;
    };

    const setAuxiliaryPointsAndGetDistance = (direction) => {
        let distance = 0, previousKmPoint = 0;
        const routeLegs = direction.routes[0].legs;

        points.push({
            location: originCoordinates,
            stopover: true
        });

        for (const legIndex in routeLegs) {
            var intLegIndex = parseInt(legIndex);

            for (const stepIndex in routeLegs[legIndex].steps) {
                const legDistance = routeLegs[legIndex].steps[stepIndex].distance.text;

                const legDistanceArray = legDistance.split(' ');

                let legDistanceInM = legDistanceArray[0];
                const unitOfMeasurement = legDistanceArray[1];

                if (unitOfMeasurement === unitsOfMeasurement.METER) {
                    distance += parseFloat(legDistanceInM);
                }
                else {
                    legDistanceInM = legDistanceInM.replace(',', '.');
                    distance += legDistanceInM * 1000;
                }

                const currentDistanceInKm = distance < 1000 ? 0 : parseFloat(distance / 1000);

                if (currentDistanceInKm - 5 > previousKmPoint) {
                    points.push(
                        {
                            location: {
                                lat: routeLegs[legIndex].steps[stepIndex].end_location.lat(),
                                lng: routeLegs[legIndex].steps[stepIndex].end_location.lng()
                            },
                            stopover: false
                        }
                    );

                    previousKmPoint = distance / 1000;
                }
            }

            if (intLegIndex + 1 !== routeLegs.length) {
                points.push({
                    location: subPointCoordinates[intLegIndex].location,
                    stopover: false
                });
            }

            const endLocationCoordinates = routeLegs[intLegIndex].end_location;

            points.push({
                location: {
                    lat: endLocationCoordinates.lat(),
                    lng: endLocationCoordinates.lng()
                },
                stopover: true
            });
        }

        distance /= 1000;
        return distance;
    };

    return isLoaded ? (
        <div className="createTripBody">
            <Header />

            <h1 id="title">Create a trip</h1>

            <Layout id="tripBlock">

                <Form
                    initialValues={{ remember: true }}
                    onFinish={onFinishAsync}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                    id="tripForm"
                >
                    <Form.Item
                        label="Enter the origin's address: "
                        name="originAddress"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_ORIGIN_ADDRESS
                            )
                        ]}
                    >
                        <PlacesAutocomplete
                            value={originAddress}
                            onSelect={selectOriginAddressAsync}
                            onChange={changeOriginAddress}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Origin address'
                                        })}
                                    />

                                    <div className="description-list">
                                        {loading ? <div>Loading...</div> : null}

                                        {suggestions.map((suggestion) => {
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                    className="description-item"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </Form.Item>

                    <Form.Item
                        label="Enter the destination's address: "
                        name="destinationAddress"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_DESTINATION_ADDRESS
                            )
                        ]}
                    >
                        <PlacesAutocomplete
                            value={destinationAddress}
                            onSelect={selectDestinationAddressAsync}
                            onChange={changeDestinationAddress}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Destination address'
                                        })}
                                    />

                                    <div className="description-list">
                                        {loading ? <div>Loading...</div> : null}

                                        {suggestions.map((suggestion) => {
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                    className="description-item"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </Form.Item>

                    {
                        subPointsAddresses.length > 0 ?
                            <>
                                <p>Points</p>

                                <Table
                                    columns={pointsTableColumns}
                                    dataSource={[...subPointsAddresses]}
                                    pagination={false}
                                    size="small"
                                    style={{ 'maxWidth': '400px' }}
                                />
                            </>
                            :
                            <></>
                    }

                    <Form.Item
                        label="Enter the sub point's address: "
                        name="subPointAddress"
                    >
                        <PlacesAutocomplete
                            value={subPointAddress}
                            onSelect={selectSubPointAddress}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Origin address'
                                        })}
                                    />

                                    <div className="description-list">
                                        {loading ? <div>Loading...</div> : null}

                                        {suggestions.map((suggestion) => {
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                    className="description-item"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </Form.Item>

                    <Button
                        onClick={() => addSubPointAsync()}
                    >
                        Add sub point
                    </Button>

                    <Form.Item
                        label="Select the trip's dates: "
                        name="dates"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.UNSELECTED_DATE
                            )
                        ]}
                    >
                        <RangePicker
                            disabledDate={setDisabledDate}
                            showTime={{
                                hideDisabledOptions: true
                            }}
                            format={CALENDER_DATE_FORMAT}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Enter the description: "
                        name="description"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_DESCRIPTION
                            ),
                            InputRules.lengthRange(
                                1,
                                1000,
                                inputValidationErrorMessages.DESCRIPTION_MUST_BE_BETWEEN_1_AND_1000
                            )
                        ]}
                    >
                        <TextArea placeholder="Description" value={""} />
                    </Form.Item>

                    <p>Cars</p>
                    <Table
                        columns={carTableColumns}
                        dataSource={verifiedCars}
                        size="small"
                        pagination={false}
                        rowSelection={{
                            type: "radio",
                            ...rowSelection
                        }}
                    />

                    <Form.Item
                        label="Enter the load capacity: "
                        name="loadCapacity"
                        rules={[
                            InputRules.required(carsErrorMessages.EMPTY_FIELD)
                        ]}
                    >
                        <InputNumber min={1}
                            addonAfter="kg"
                            placeholder="Load capacity"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Enter the max route deviation: "
                        name="maxRouteDeviationKm"
                        rules={[
                            InputRules.required(carsErrorMessages.EMPTY_FIELD)
                        ]}
                    >
                        <InputNumber min={1} max={25}
                            addonAfter="km"
                            placeholder="Max route deviation"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Ok
                    </Button>

                    <div style={{ height: "500px", width: "100%" }}>
                        <GoogleMap
                            center={center}
                            zoom={12}
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            options={{
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: true,
                                fullscreenControl: true
                            }}
                            onLoad={map => setMap(map)}
                        >
                            <Marker position={center} />
                            {directionResponse && (
                                <DirectionsRenderer directions={directionResponse} />
                            )}
                        </GoogleMap>
                    </div>
                </Form>
            </Layout>
        </div>
    ) : (
        <span>Map is not loaded!</span>
    );
}

export default CreateTripPage;
