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

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const [form] = Form.useForm();

    // Get latitude & longitude from address.
    const getAddressByName = (name) => {
        Geocode.fromAddress(name).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const getData = () => {
        Geocode.fromLatLng(clickedLatLng.lat, clickedLatLng.lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let settlement, region, country;
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
                            case "country":
                                country =
                                    response.results[0].address_components[i]
                                        .long_name;
                                break;
                        }
                    }
                }

                form.setFieldsValue({
                    address: address,
                    settlement: settlement,
                    region: region,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    };

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
                                <Input
                                    placeholder="Enter your address"
                                    name="address"
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
                                defaultZoom={18}
                                onClick={(e) =>
                                    setClickedLatLng(e.latLng.toJSON())
                                }
                                id="map"
                            >
                                <Marker
                                    position={clickedLatLng}
                                    onPositionChanged={getData}
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
