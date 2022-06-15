import React, {useState, useCallback, useEffect} from "react";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import Header from "../navigation/header";
import {createOffer} from "../../services/offers";
import {getAllGoodCategories} from "../../services/goodCategories";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, DatePicker, Select} from "antd";
import {errorMessage} from "../../services/alerts";
import {offersErrorMessages} from "../../constants/messages/offersMessages";
import moment from "moment";
import Geocode from "react-geocode";
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from "react-places-autocomplete";
import {offerValues} from "../../constants/offerValues";
import InputRules from "../../constants/inputRules";

const {TextArea} = Input;
const {RangePicker} = DatePicker;
const {Option} = Select;

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

Geocode.setLanguage("ua");

Geocode.setRegion("ua");

Geocode.enableDebug();

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: offerValues.DEFAULT_LAT_VALUE,
    lng: offerValues.DEFAULT_LNG_VALUE,
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

    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });

    let history = useHistory();

    const [map, setMap] = useState();
    const [clickedLatLng, setClickedLatLng] = useState(center);
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
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);
    
    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    // get address and other from coordinates
    const getData = (lat, lng) => {
        Geocode.fromLatLng(lat, lng)
            .then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    const addressComponents = response.results[0].address_components;

                    let settlement, region;

                    for (
                        let i = 0;
                        i < addressComponents.length;
                        i++
                    ) {
                        for (
                            let j = 0;
                            j < addressComponents[i].types.length;
                            j++
                        ) {
                            switch (addressComponents[i].types[j]) {
                                case "locality":
                                    settlement =
                                        addressComponents[i].long_name;
                                    break;
                                case "administrative_area_level_1":
                                    region = addressComponents[i].long_name;
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
                () => {
                    errorMessage(
                        offersErrorMessages.CREATE_OFFER_FAILED,
                        offersErrorMessages.MAP_IS_NOT_WORK
                    )
                }
            ).catch(() => {
            errorMessage(
                offersErrorMessages.CREATE_OFFER_FAILED,
                offersErrorMessages.MAP_IS_NOT_WORK
            );
        });
    };

    // for mapping good categories
    useEffect(async () => {
        setData(await getAllGoodCategories());
    }, []);

    // form actions
    function disabledDate(current) {
        // Can not select days before today
        return current && current < moment().startOf("day");
    }

    const range = (start, end) => {
        const result = [];

        for (let i = start; i < end; i++) {
            result.push(i);
        }

        return result;
    };

    const getCurrentHour = () => {
        let currDate = new Date();
        return currDate.getHours();
    }

    // function for setting timepicker in rangepicker
    const disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(0, getCurrentHour() + 1)
            }
        }
    };

    const onFinish = (values) => {
        const start = values.dates[0];
        const end = values.dates[1];
        const diff = end.diff(start, 'hours');
        const offer = {...values, role: props.offerRole};
        if (diff < offerValues.MIN_HOURS_VALUE) {
            errorMessage(
                offersErrorMessages.CREATE_OFFER_FAILED,
                offersErrorMessages.TIME_INTERVAL_INCORRECT
            );
        } else {
            createOffer(offer, clickedLatLng, history);
        }
    };

    const onFinishFailed = () => {
        errorMessage(
            offersErrorMessages.CREATE_OFFER_FAILED,
            offersErrorMessages.ENTER_ALL_INPUTS
        );
    }

    return isLoaded ? (
        <>
            <Header/>

            <div className="createOfferBody">
                <h1>Create {props.offerRole} offer</h1>

                <Form
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
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
                                InputRules.specificType("string", offersErrorMessages.EMPTY_FIELD),
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
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
                                            {...getInputProps({placeholder: "Enter your address"})}
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
                            className="input-to-hide"
                            name="settlement"
                            rules={[
                                InputRules.specificType("string", offersErrorMessages.EMPTY_FIELD),
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            className="input-to-hide"
                            name="region"
                            rules={[
                                InputRules.specificType("string", offersErrorMessages.EMPTY_FIELD),
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="goodCategory"
                            label="Select good categories: "
                            labelAlign="left"
                            rules={[
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
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
                            name="dates"
                            label="Select dates: "
                            labelAlign="left"
                            rules={[
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
                            ]}
                        >
                            <RangePicker
                                disabledDate={disabledDate}
                                disabledTime={disabledRangeTime}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [
                                        moment("00:00:00", "HH:mm"),
                                        moment("12:00:00", "HH:mm"),
                                    ],
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>

                        <Form.Item
                            name="goodsWeight"
                            label="Select good weight: "
                            labelAlign="left"
                            rules={[
                                InputRules.capitalDigitFirst(offersErrorMessages.NOT_VALID_GOOD_WEIGHT_MESSAGE),
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
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
                            className="description"
                            label="Write description: "
                            labelAlign="left"
                            rules={[
                                InputRules.specificType("string", offersErrorMessages.EMPTY_FIELD),
                                InputRules.required(offersErrorMessages.EMPTY_FIELD)
                            ]}
                        >
                            <TextArea placeholder="Description"/>
                        </Form.Item>
                    </div>

                    <div className="rightFormBlock">
                        <div className="mapBlock">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={clickedLatLng}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
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
