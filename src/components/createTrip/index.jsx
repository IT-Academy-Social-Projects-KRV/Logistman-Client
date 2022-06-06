import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import { Button, Layout, DatePicker, Form, Input, InputNumber, Table } from 'antd';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsRenderer
} from '@react-google-maps/api';
import Header from '../navigation/header';
import { mapCenter } from './../../constants/map';
import { errorMessage } from './../../services/alerts';
import { mapErrorMessages } from './../../constants/messages/map';
import { generalErrorMessages } from './../../constants/messages/general';
import { inputValidationErrorMessages } from './../../constants/messages/inputValidationErrors';
import InputRules from './../../constants/inputRules';
import { setDisabledDate } from "../../constants/dates";
import { CALENDER_DATE_FORMAT } from '../../constants/dates';
import { carsErrorMessages } from './../../constants/messages/cars';
import { getUserVerifiedCars } from "../../services/cars";
import moment from "moment";
import { createTrip } from "../../services/trip";
import { carTableColumns } from './carsTableColumns';
import useStateWithCallback from "use-state-with-callback";
import { Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

Geocode.setApiKey(/**/);
Geocode.setLanguage("ua");
Geocode.setRegion("ua");
Geocode.enableDebug();

function CreateTripPage() {
    const pointsTableColumns = [
        {
            title: 'Street',
            dataIndex: 'street'
        },
        {
            title: 'Settlement',
            dataIndex: 'settlement'
        },
        {
            title: 'Region',
            dataIndex: 'region'
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) =>
                <Space>
                    <Button type="primary" icon={<CloseOutlined />}
                        className="edit-form-button" danger
                        onClick={() => removeSubPoint(record)}
                    >
                        Remove
                    </Button>
                </Space>
        }
    ];

    const [originAddress, setOriginAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [subPointAddress, setSubPointAddress] = useState("");

    const [subPointsAddresses, setSubPointsAddresses] = useState([]);

    const [originCoordinates, setOriginCoordinates] = useState(null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(null);
    const [subPointCoordinates, setSubPointCoordinates] = useStateWithCallback([],
        async () => {
            if (isNewSubPoint &&
                originCoordinates !== null &&
                destinationCoordinates !== null) {
                await buildTheRoute();
                setSubPointAddress("");
            }
            else if (isDeleteSubPoint) {
                await buildTheRoute();
                setIsDeleteSubPoint(false);
            }
        });

    const [map, setMap] = useState(null);
    const [directionResponse, setDirectionResponse] = useState(null);

    const [points, setPoints] = useState([]);

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const [selectedCarId, setSelectedCarId] = useState(null);

    const [center, setCenter] = useState(mapCenter);

    const [verifiedCars, setVerifiedCars] = useState(null);

    const [key, setKey] = useState(1);
    const [isNewSubPoint, setIsNewSubPoint] = useState(false);
    const [isDeleteSubPoint, setIsDeleteSubPoint] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "OUR_KEY"
    });

    useEffect(async () => {
        let cars = await getUserVerifiedCars();
        setVerifiedCars(cars);
    }, []);

    const buildTheRoute = async () => {
        if (originCoordinates === null &&
            destinationCoordinates === null) {
            return;
        }

        if (points.length !== 0) {
            setPoints([]);
        }

        const directionsService = new window.google.maps.DirectionsService();

        const direction = await directionsService.route({
            origin: originCoordinates,
            destination: destinationCoordinates,
            waypoints: subPointCoordinates,
            travelMode: window.google.maps.TravelMode.DRIVING, // by default
            avoidTolls: true
        });

        setDirectionResponse(direction);

        setDistance(direction.routes[0].legs[0].distance.text);
        setDuration(direction.routes[0].legs[0].duration.text); // without waiting

        let distanceInKm = 0, previousKmPoint = 0;

        const legs = direction.routes[0].legs;

        points.push(originCoordinates);

        for (const legIndex in legs) {

            for (const stepIndex in legs[legIndex].steps) {
                const legDistance = legs[legIndex].steps[stepIndex].distance.text;

                const legDistanceArray = legDistance.split(' ');

                let legDistanceInM = legDistanceArray[0];
                const unitOfMeasurement = legDistanceArray[1];

                if (unitOfMeasurement == "м") {
                    distanceInKm += parseFloat(legDistanceInM);
                }
                else {
                    legDistanceInM = legDistanceInM.replace(',', '.');
                    distanceInKm += legDistanceInM * 1000;
                }

                const currentDistanceInKm = distanceInKm < 1000 ? 0 : parseFloat(distanceInKm / 1000);

                if (currentDistanceInKm - 50 > previousKmPoint) {
                    points.push(
                        {
                            lat: legs[legIndex].steps[stepIndex].end_location.lat(),
                            lng: legs[legIndex].steps[stepIndex].end_location.lng()
                        }
                    );

                    previousKmPoint = distanceInKm / 1000;
                }
            }

            if (parseInt(legIndex) + 1 != legs.length) {
                points.push(subPointCoordinates[parseInt(legIndex)].location);
            }
        }

        points.push(destinationCoordinates);
    }

    const handleSelectOrigin = async (originValue) => {
        await setOriginAddress(originValue);

        geocodeByAddress(originValue)
            .then(results => getLatLng(results[0]))
            .then(latLng => setOriginCoordinates(latLng)
            )
            .catch(() =>
                errorMessage(
                    mapErrorMessages.LOAD_COORDINATES_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                )
            );
    };

    const handleSelectDestination = async (destinationValue) => {
        setDestinationAddress(destinationValue);

        geocodeByAddress(destinationValue)
            .then(results => getLatLng(results[0]))
            .then(latLng =>
                setDestinationCoordinates(latLng)
            )
            .catch(() =>
                errorMessage(
                    mapErrorMessages.LOAD_COORDINATES_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                )
            );
    };

    const handleSelectSubPoint = (subPointValue) => {
        setSubPointAddress(subPointValue);
    };

    const onOriginChange = () => {
    };

    const onDestinationChange = () => {
    };

    const onFinish = async (values) => {
        if (selectedCarId === null) {
            // trow error
        }

        for (const carIndex in verifiedCars) {
            const id = parseFloat(carIndex);

            if (verifiedCars[id].id == selectedCarId &&
                parseFloat(values.loadCapacity) > parseFloat(verifiedCars[id].loadCapacity)) {
                // throw error
            }
        }

        await buildTheRoute();

        let tripPoints = [];

        for (const index in points) {
            tripPoints.push({
                latitude: points[index].lat,
                longitude: points[index].lng,
                order: parseInt(index) + 1
            });
        }

        console.log("Start date: ", moment(values.dates[0]._d).format(CALENDER_DATE_FORMAT),
            "\nExpiration date: ", moment(values.dates[1]._d).format(CALENDER_DATE_FORMAT),
            "\n\nDescription: ", values.description,
            "\n\nLoad capacity: ", values.loadCapacity,
            "\nMax route deviation (km): ", values.maxRouteDeviationKm,
            "\n\nTransportation car id: ", selectedCarId,
            "\n\nOrigin address: ", originAddress,
            "\nOrigin coordinates: ", originCoordinates,
            "\n\nDestination address: ", destinationAddress,
            "\nDestination coordinates: ", destinationCoordinates,
            "\n\nAuxiliary points (to build an exact route): ", tripPoints);

        const model = {
            startDate: values.dates[0]._d,
            expirationDate: values.dates[1]._d,
            description: values.description,
            loadCapacity: values.loadCapacity,
            maxRouteDeviationKm: values.maxRouteDeviationKm,
            transportationCarId: selectedCarId,
            points: tripPoints
        };

        setPoints([]);

        // await createTrip(model);
    };

    const onFinishFailed = () => {
        // buildTheRoute();
    };

    const setSubPointDetailedAddress = async (coordinates) => {
        Geocode.fromLatLng(coordinates.lat, coordinates.lng)
            .then((response) => {
                const fullAddressComponents = response.results[0].address_components;
                let house, street, settlement, region, country, postcode;

                for (
                    let i = 0;
                    i < response.results[0].address_components.length;
                    i++
                ) {
                    for (
                        let j = 0;
                        j < response.results[0].address_components[i].types.length;
                        j++
                    ) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "street_number": {
                                house = fullAddressComponents[i].long_name;
                                break;
                            }
                            case "route": {
                                street = fullAddressComponents[i].long_name;
                                break;
                            }
                            case "locality": {
                                settlement = fullAddressComponents[i].long_name;
                                break;
                            }
                            case "administrative_area_level_1": {
                                region = fullAddressComponents[i].long_name;
                                break;
                            }
                            case "country": {
                                country = fullAddressComponents[i].long_name;
                                break;
                            }
                            case "postal_code": {
                                postcode = fullAddressComponents[i].long_name;
                                break;
                            }
                        }
                    }
                }

                setKey(key + 1);

                setSubPointsAddresses([...subPointsAddresses, {
                    key: key,
                    street: street + ", " + house,
                    settlement: settlement,
                    region: region,
                    country: country,
                    postcode: postcode
                }]);
            },
                (error) => {
                    console.log(error);
                }
            );
    };

    const addSubPoint = () => {
        geocodeByAddress(subPointAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setIsNewSubPoint(true);

                setSubPointCoordinates([...subPointCoordinates, {
                    location: latLng,
                    stopover: true
                }]);

                setSubPointDetailedAddress(latLng);

                setIsNewSubPoint(false);
            })
            .catch(() =>
                errorMessage(
                    mapErrorMessages.LOAD_COORDINATES_FAILED,
                    generalErrorMessages.SOMETHING_WENT_WRONG
                )
            );
    }

    const removeSubPoint = async (record) => {
        setIsDeleteSubPoint(true);

        var elementIndex = subPointsAddresses.indexOf(record);
        subPointsAddresses.splice(elementIndex, 1);
        subPointCoordinates.splice(elementIndex, 1);
    }

    return isLoaded ? (
        <div className="createTripBody">
            <Header />

            <h1 id="title">Create trip</h1>

            <Layout id="tripBlock">

                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                    id="tripForm"
                >
                    <Form.Item
                        name="originAddress"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_ORIGIN_ADDRESS
                            )
                        ]}
                    >
                        <PlacesAutocomplete
                            value={originAddress}
                            onChange={onOriginChange}
                            onSelect={handleSelectOrigin}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Origin address'
                                        })}
                                    />

                                    <div className="autocomplete-dropdown-container">
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
                    </Form.Item>

                    <Form.Item
                        name="destinationAddress"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_DESTINATION_ADDRESS
                            )
                        ]}
                    >
                        <PlacesAutocomplete
                            value={destinationAddress}
                            onChange={onDestinationChange}
                            onSelect={handleSelectDestination}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Destination address'
                                        })}
                                    />

                                    <div className="autocomplete-dropdown-container">
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
                        name="subPointAddress"
                    >
                        <PlacesAutocomplete
                            value={subPointAddress}
                            onChange={onDestinationChange}
                            onSelect={handleSelectSubPoint}
                        >
                            {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps
                            }) => (
                                <div>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Sub point address'
                                        })}
                                    />

                                    <div className="autocomplete-dropdown-container">
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
                    </Form.Item>

                    <Button
                        onClick={() => addSubPoint()}
                    >
                        Add sub point
                    </Button>

                    <Form.Item
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
                        onRow={(record, rowIndex) => ({
                            onClick: () => setSelectedCarId(record.id)
                        })}
                    />

                    <Form.Item name="loadCapacity"
                        rules={[
                            InputRules.required(carsErrorMessages.EMPTY_FIELD)
                        ]}
                    >
                        <InputNumber min={1}
                            addonAfter="kg"
                            placeholder="Load capacity"
                        />
                    </Form.Item>

                    <Form.Item name="maxRouteDeviationKm"
                        rules={[
                            InputRules.required(carsErrorMessages.EMPTY_FIELD)
                        ]}
                    >
                        <InputNumber min={0} max={25}
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
