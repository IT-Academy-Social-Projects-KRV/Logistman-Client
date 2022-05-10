import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API } from "../../constants/map";
import Header from "../navigation/header";
import { createOffer } from "../../services/offerService";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, AutoComplete, Select } from "antd";

const { TextArea } = Input;
const { Option, OptGroup } = Select;

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 48.686,
    lng: 31.086,
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
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

    const [map, setMap] = useState(null);
    const [clickedLatLng, setClickedLatLng] = useState();

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const onFinish = (values) => {
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
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <div className="topFormBlock">
                        <div className="addressBlock">
                            <Form.Item name="address">
                                <Input
                                    type="text"
                                    placeholder="Enter your address"
                                />
                            </Form.Item>
                            <Form.Item name="settlement">
                                <Input
                                    type="text"
                                    placeholder="Enter your settlement"
                                />
                            </Form.Item>
                            <Form.Item name="region">
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
                            <Form.Item name="startDate">
                                <DatePicker />
                            </Form.Item>

                            <Form.Item name="goodsWeight">
                                <Input
                                    htmlType="number"
                                    placeholder="Goods Weight"
                                />
                            </Form.Item>
                        </div>
                        <div className="otherOfferDataBlock">
                            <Form.Item
                                name="description"
                                className="description"
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
