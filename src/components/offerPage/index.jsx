import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { API } from "../../constants/map";
import Header from "../navigation/header";
import { createOffer } from "../../services/offerService";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, AutoComplete } from "antd";

const { TextArea } = Input;

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
        createOffer(values, history);
    };

    return isLoaded ? (
        <>
            <Header />
            <div className="offer__container">
                <h1>Create offer</h1>
                <Form onFinish={onFinish}>
                    <div className="form__point">
                        <div className="point__block">
                            {clickedLatLng && (
                                <input
                                    type="hidden"
                                    name="latitude"
                                    value={clickedLatLng.lat}
                                />
                            )}
                            {clickedLatLng && (
                                <input
                                    type="hidden"
                                    name="longitude"
                                    value={clickedLatLng.lng}
                                />
                            )}
                            <Form.Item name="address">
                                <Input
                                    type="text"
                                    placeholder="Enter your address"
                                />
                            </Form.Item>
                            <Form.Input name="settlement">
                                <Input
                                    type="text"
                                    placeholder="Enter your settlement"
                                />
                            </Form.Input>
                            <Form.Item name="region">
                                <Input
                                    type="text"
                                    placeholder="Enter your region"
                                    name="region"
                                />
                            </Form.Item>
                        </div>
                        <div className="map point__block">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={5}
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
                    <div className="form__offer">
                        <div className="offer__block">
                            <Form.Item name="startDate">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="goodsWeight">
                                <AutoComplete />
                            </Form.Item>

                            <Form.Item name>
                                <Input
                                    htmlType="number"
                                    placeholder="Goods Weight"
                                />
                            </Form.Item>
                        </div>
                        <div className="offer__block">
                            <Form.Item name="description">
                                <TextArea
                                    id="description"
                                    placeholder="Description"
                                />
                            </Form.Item>

                            <Form.Item className="submitItem">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submitButton"
                                >
                                    Create
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
