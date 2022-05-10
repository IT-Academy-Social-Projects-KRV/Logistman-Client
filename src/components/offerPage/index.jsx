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
    const onFinishFailed = (values) => {
        console.log("error");
    };

    return isLoaded ? (
        <div>
            <Header />
            <Form
                className="form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <div className="point">
                    <div className="point_block">
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
                    <div className="point_block">
                        
                    </div>
                </div>
            </Form>
        </div>
    ) : (
        <>
            <span>Map is not loaded!</span>
        </>
    );
}
