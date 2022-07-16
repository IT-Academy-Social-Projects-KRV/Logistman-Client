import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Header from "../navigation/header";
import { createOffer } from "../../services/offers";
import { getAllGoodCategories } from "../../services/goodCategories";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { errorMessage } from "../../services/alerts";
import Geocode from "react-geocode";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { offerValues } from "../../constants/offerValues";
import InputRules from "../../constants/inputRules";
import { mapCenter } from "../../constants/map";
import moment from "moment";
import { setDisabledDate } from './../../constants/dates';
import { generalMessages } from './../../constants/messages/general';
import { tripsMessages } from "../../constants/messages/trips";
import { mapMessages } from '../../constants/messages/maps';
import { offersMessages } from './../../constants/messages/offers';

const { TextArea } = Input;
const { Option } = Select;

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

Geocode.setLanguage("ua");

Geocode.setRegion("ua");

Geocode.enableDebug();

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    zoomEnabled: true,
    mapTypeControl: true,
    disableDefaultUI: true,
    streetViewControl: true,
    rotateControl: true,
    clickableIcons: true,
    keyboardShortcuts: true,
    fullscreenControl: true,
};

export default function CreateOfferPage(props) {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    let history = useHistory();

    const [map, setMap] = useState();
    const [clickedLatLng, setClickedLatLng] = useState(mapCenter);
    const [data, setData] = useState(null);

    const [address, setAddress] = useState();

    const [form] = Form.useForm();

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setClickedLatLng(latLng);
    };

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(clickedLatLng);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    // get address and other from coordinates
    const getData = async (lat, lng) => {
        var house, street, settlement, region, country, postcode, fullAddress;

        await Geocode.fromLatLng(lat, lng)
            .then(
                (response) => {
                    fullAddress = response.results[0].formatted_address;
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
                        offersMessages.CREATE_OFFER_FAILED,
                        mapMessages.MAP_IS_NOT_WORK
                    )
                }
            ) .catch(() => {
                errorMessage(
                    offersMessages.CREATE_OFFER_FAILED,
                    mapMessages.MAP_IS_NOT_WORK
                );
            });

        if (house === undefined ||
            street === undefined ||
            country === undefined ||
            postcode === undefined) {
            errorMessage(
                offersMessages.CREATE_OFFER_FAILED,
                mapMessages.MAP_IS_NOT_WORK
            );
        }

        var point = {
            address: street + ", " + house,
            settlement: settlement,
            region: region,
            country: country,
            postcode: postcode
        };

        if (JSON.stringify(address) !== JSON.stringify(point)) {
            setAddress(point);
            form.setFieldsValue({
                address: fullAddress
            });
        }
    };

    // for mapping good categories
    useEffect( () => {
        async function fetchData(){
            setData(await getAllGoodCategories());
        }

        fetchData();
    }, []);

    const onFinish = (values) => {
        const point = {
            latitude: clickedLatLng.lat,
            longitude: clickedLatLng.lng,
            address: address.address,
            country: address.country,
            postcode: address.postcode,
            region: address.region,
            settlement: address.settlement,
            isStopover: true,
            order: offerValues.ORDER_BY_DEFAULT
        };

        const offer = { ...values, role: props.offerRole, point };
        
        if (moment(values.date) < moment()) {
            errorMessage(
                tripsMessages.START_DATE_IS_IN_THE_PAST,
                ""
            );
            return;
        }

        createOffer(offer, history, point);
    };

    const onFinishFailed = () => {
        errorMessage(
            offersMessages.CREATE_OFFER_FAILED,
            generalMessages.FIELD_MUST_NOT_BE_EMPTY
        );
    }

    return isLoaded ? (
        <>
            <Header />

            <div className="createOfferBody">
                <h1>Create {props.offerRole.toLowerCase()} offer</h1>

                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                    className="formOffer"
                >
                    <div className="leftFormBlock">
                        <Form.Item
                            name="address"
                            label="Select your address: "
                            labelAlign="left"
                            rules={[
                                InputRules.specificType("string", generalMessages.FIELD_MUST_NOT_BE_EMPTY),
                                InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                            ]}
                        >
                            <PlacesAutocomplete
                                value={address}
                                onSelect={handleSelect}
                            >
                                {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                }) => (
                                    <div>
                                        <Input
                                            {...getInputProps({ placeholder: "Enter your address" })}
                                        />

                                        <div className="description-list">
                                            {loading ? <div>...loading</div> : null}

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
                            name="goodCategory"
                            label="Select good categories: "
                            labelAlign="left"
                            rules={[
                                InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                            ]}
                        >
                            <Select
                                placeholder="Select good categories"
                            >
                                {data?.map((res, idx) => (
                                    <Option value={res.name} key={idx}>
                                        {res.name.toLowerCase()}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="date"
                            label="Select date: "
                            labelAlign="left"
                            rules={[
                                InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                            ]}
                        >
                            <DatePicker
                                disabledDate={setDisabledDate}
                                showTime={{
                                    hideDisabledOptions: true
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="goodsWeight"
                            label="Select good weight: "
                            labelAlign="left"
                            rules={[
                                InputRules.capitalDigitFirst(offersMessages.NOT_VALID_GOOD_WEIGHT_MESSAGE),
                                InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                            ]}
                        >
                            <Input
                                addonAfter="kg"
                                className="goodsWeight"
                                type="number"
                                placeholder="Goods Weight"
                            />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Write description: "
                            labelAlign="left"
                            rules={[
                                InputRules.specificType("string", generalMessages.FIELD_MUST_NOT_BE_EMPTY),
                                InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY),
                                InputRules.notEmpty(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                            ]}
                        >
                            <TextArea placeholder="Description" />
                        </Form.Item>
                    </div>

                    <div className="rightFormBlock">
                        <div className="mapBlock">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={clickedLatLng}
                                onLoad={onLoad}
                                options={defaultOptions}
                                onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
                                id="map"
                            >
                                <Marker
                                    position={clickedLatLng}
                                    onPositionChanged={
                                        getData(clickedLatLng.lat, clickedLatLng.lng)
                                    }
                                />
                            </GoogleMap>
                        </div>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submitButton"
                        >
                            Create offer
                        </Button>
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
