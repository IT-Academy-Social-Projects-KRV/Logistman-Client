import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API } from "../../constants/map";
import Header from "../navigation/header";
import { createOffer } from "../../services/offerService";
import { getGoodCategories } from "../../services/goodCategoryService";
import { useHistory } from "react-router-dom";
import { inputValidationErrors } from "../../constants/messages/inputValidationErrors";
import { Form, Input, Button, DatePicker, Select } from "antd";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

Geocode.setApiKey(API);

Geocode.setLanguage("ua");

Geocode.setRegion("ua");

Geocode.enableDebug();

const { TextArea } = Input;
const { Option } = Select;

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 50.643,
    lng: 26.263,
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    zoomEnabled: true,
    mapTypeControl: true,
    disableDefaultUI: true,
    scaleControle: true,
    streetViewControl: true,
    rotateControl: true,
    clickableIcons: true,
    keyboardShortcuts: true,
    scrollwheel: true,
    fullscreenControl: true,
};

export default function Offer() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API,
    });

    let history = useHistory();

    const [map, setMap] = useState();
    const [clickedLatLng, setClickedLatLng] = useState(center);
    const [data, setData] = useState(null);

    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setClickedLatLng(latLng);
        setCoordinates(latLng);
    };

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const [form] = Form.useForm();

    const getData = (lat, lng) => {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let settlement, region;
                for (
                    let i = 0;
                    i < response.results[0].address_components.length;
                    i++
                ) {
                    for (
                        let j = 0;
                        j <
                        response.results[0].address_components[i].types.length;
                        j++
                    ) {
                        switch (
                            response.results[0].address_components[i].types[j]
                        ) {
                            case "locality":
                                settlement =
                                    response.results[0].address_components[i]
                                        .long_name;
                                break;
                            case "administrative_area_level_1":
                                region =
                                    response.results[0].address_components[i]
                                        .long_name;
                                break;
                        }
                    }
                }

                form.setFieldsValue({
                    settlement: settlement,
                    region: region,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    };

    /*useEffect(async () => {
        /!*setData(await getGoodCategories());*!/
    });*/

    const onFinish = (values) => {
        console.log(values);
        createOffer(values, clickedLatLng, history);
    };

    const onFinishFailed = (values) => {
        console.log("error");
    };

    return isLoaded ? (
        <>
            <Header />
            <div className="createOfferBody">
                <h1>Create offer</h1>
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <div className="topFormBlock">
                        <div className="addressBlock">
                            <Form.Item name="address">
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <p>Latitude: {coordinates.lat}</p>
                                            <p>Longitude: {coordinates.lng}</p>

                                            <input {...getInputProps({ placeholder: "Type address" })} />

                                            <div>
                                                {loading ? <div>...loading</div> : null}

                                                {suggestions.map(suggestion => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                                    };

                                                    return (
                                                        <div {...getSuggestionItemProps(suggestion, { style })}>
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
                                name="settlement"
                                rules={[
                                    {
                                        type: "string",
                                        message:
                                            inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                                    },
                                ]}
                            >
                                <Input
                                    name="settlement"
                                    placeholder="Enter your settlement"
                                />
                            </Form.Item>
                            <Form.Item
                                name="region"
                                rules={[
                                    {
                                        type: "string",
                                        message:
                                            inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                                    },
                                ]}
                            >
                                <Input
                                    name="region"
                                    placeholder="Enter your settlement"
                                />
                            </Form.Item>
                        </div>

                        <div className="mapBlock">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                                options={defaultOptions}
                                zoom={18}
                                onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
                                    id="map"
                            >
                                <Marker
                                    position={clickedLatLng}
                                    onPositionChanged={getData(
                                        clickedLatLng.lat,
                                        clickedLatLng.lng
                                    )}
                                    icon={{
                                        url: "https://cdn-icons-png.flaticon.com/512/1067/1067357.png",
                                        origin: new window.google.maps.Point(
                                            0,
                                            0
                                        ),
                                        anchor: new window.google.maps.Point(
                                            15,
                                            15
                                        ),
                                        scaledSize: new window.google.maps.Size(
                                            30,
                                            30
                                        ),
                                    }}
                                />
                            </GoogleMap>
                        </div>
                    </div>

                    <div className="bottomFormBlock">
                        <div className="otherOfferDataBlock">
                            <Form.Item name="goodCategoryId">
                                <Select>
                                    {data?.map((res, idx) => (
                                        <Option value={idx + 1} key={idx}>
                                            {res.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item name="startDate">
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="goodsWeight"
                                rules={[
                                    {
                                        message:
                                            inputValidationErrors.EMPTY_GOOD_WEIGHT_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_GOOD_WEIGHT_MESSAGE,
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Goods Weight"
                                />
                            </Form.Item>
                        </div>
                        <div className="otherOfferDataBlock">
                            <Form.Item
                                name="description"
                                className="description"
                                rules={[
                                    {
                                        message:
                                            inputValidationErrors.EMPTY_DESCRIPTION_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_DESCRIPTION_MESSAGE,
                                    },
                                ]}
                            >
                                <TextArea placeholder="Description" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submitButton"
                                >
                                    Create offer
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}
