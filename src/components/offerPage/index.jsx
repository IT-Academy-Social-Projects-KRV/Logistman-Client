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
    width: "250px",
    height: "250px",
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
        createOffer(values);
    };
    const onFinishFailed = (values) => {
        console.log("error");
    };

    return isLoaded ? (
        <div>
            <Header />
            <Form
                name="form_name"
                className="form"
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="point">
                    <div className="point_block">
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
                            <Input placeholder="Enter address" />
                        </Form.Item>
                        <Form.Item name="settlement">
                            <Input placeholder="Enter settlement" />
                        </Form.Item>
                        <Form.Item name="region">
                            <Input placeholder="Enter region" />
                        </Form.Item>
                    </div>
                    <div className="map point_block">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={5}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            options={defaultOptions}
                            onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
                        >
                            <Marker position={clickedLatLng} />
                        </GoogleMap>
                    </div>
                </div>
                <div className="offer">
                    <div className="offer_block">
                        <Form.Item name="startDate">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="settlement">
                            <Select style={{ width: 200 }}>
                                <OptGroup label="Manager">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </OptGroup>
                                <OptGroup label="Engineer">
                                    <Option value="Yiminghe">yiminghe</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>
                        <Form.Item name="goodsWeight">
                            <Input placeholder="Enter good weight" />
                        </Form.Item>
                    </div>
                    <div className="offer_block">
                        <Form.Item name="description">
                            <TextArea />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={onFinish}>
                        Create offer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}
