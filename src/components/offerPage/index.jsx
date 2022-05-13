import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API, GEOCODING_API_KEY } from "../../constants/map";
import Header from "../navigation/header";
import { createOffer } from "../../services/offerService";
import { getGoodCategories } from "../../services/goodCategoryService";
import { useHistory } from "react-router-dom";
import { inputValidationErrors } from "../../constants/messages/inputValidationErrors";
import { Form, Input, Button, DatePicker, AutoComplete, Select } from "antd";
import Geocode from "react-geocode";

Geocode.setApiKey(API);

Geocode.setLanguage("ua");

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
    mapTypeControl: true,
    scaleControle: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: true,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
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

    const [addressValue, setAddressValue] = useState();
    const [settlementValue, setSettlementValue] = useState();
    const [regionValue, setRegionValue] = useState();

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    //Geocode.fromLatLng(clickedLatLng?.lat, clickedLatLng?.lng).then(
    //    (response) => {
    //        const address = response.results[0].formatted_address;
    //        console.log(address);
    //    },
    //    (error) => {
    //        console.error(error);
    //    }
    //);

    Geocode.fromLatLng(clickedLatLng.lat, clickedLatLng.lng).then(
        (response) => {
            const address = response.results[0].formatted_address;
            let city, state, country;
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
                    switch (
                        response.results[0].address_components[i].types[j]
                    ) {
                        case "locality":
                            city =
                                response.results[0].address_components[i]
                                    .long_name;
                            break;
                        case "administrative_area_level_1":
                            state =
                                response.results[0].address_components[i]
                                    .long_name;
                            break;
                        case "country":
                            country =
                                response.results[0].address_components[i]
                                    .long_name;
                            break;
                    }
                }
            }
            console.log("City ", city, "State ", state, "Country ", country);
            setAddressValue(address);
            setSettlementValue(city);
            setRegionValue(state);
            console.log("Adress: ", addressValue);
        },
        (error) => {
            console.error(error);
        }
    );

    useEffect(async () => {
        setData(await getGoodCategories());
    }, []);

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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <div className="topFormBlock">
                        <div className="addressBlock">
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        type: "string",
                                        message:
                                            inputValidationErrors.EMPTY_ADDRESS_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_ADDRESS_MESSAGE,
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter your address"
                                    value={addressValue}
                                />
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
                                    type="text"
                                    placeholder="Enter your settlement"
                                />
                            </Form.Item>
                            <Form.Item
                                name="region"
                                rules={[
                                    {
                                        type: "string",
                                        message:
                                            inputValidationErrors.EMPTY_REGION_MESSAGE,
                                    },
                                    {
                                        required: true,
                                        message:
                                            inputValidationErrors.EMPTY_REGION_MESSAGE,
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter your region"
                                    name="region"
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
                                defaultZoom={18}
                                onClick={(e) =>
                                    setClickedLatLng(e.latLng.toJSON())
                                }
                                id="map"
                            >
                                <Marker position={clickedLatLng} />
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
