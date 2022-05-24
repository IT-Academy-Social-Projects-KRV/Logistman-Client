import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Header from "../navigation/header";
import { createOffer } from "../../services/offerService";
import { getGoodCategories } from "../../services/goodCategoryService";
import { useHistory } from "react-router-dom";
import { inputValidationErrors } from "../../constants/messages/inputValidationErrors";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { errorMessage } from "../../services/alert.service";
import { offerErrorMessages } from "../../constants/messages/offer";
import moment from "moment";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

Geocode.setApiKey(process.env.REACT_APP_API_KEY);

Geocode.setLanguage("ua");

Geocode.setRegion("ua");

Geocode.enableDebug();

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 50.64,
  lng: 26.26,
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

export default function OfferPage() {
  const { isLoaded } = useJsApiLoader({
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
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                settlement =
                  response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                region = response.results[0].address_components[i].long_name;
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
      (error)=>{
        errorMessage(
          offerErrorMessages.CREATE_OFFER_FAILED,
          offerErrorMessages.MAP_IS_NOT_WORK
        )
      }
    );
  };

  // for mapping good categories
  useEffect(async () => {
    setData(await getGoodCategories());
  }, []);

  // form actions
  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf("day");
  }

  const onFinish = (values) => {
    createOffer(values, clickedLatLng, history);
  };

  const onFinishFailed = (values) => {
    errorMessage(
      offerErrorMessages.CREATE_OFFER_FAILED,
      offerErrorMessages.ENTER_ALL_INPUTS
    );
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
          className="formOffer"
        >
          <div className="leftFormBlock">
            <Form.Item
              name="address"
              rules={[
                {
                  type: "string",
                  message: inputValidationErrors.EMPTY_ADDRESS_MESSAGE,
                },
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_ADDRESS_MESSAGE,
                },
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
            className="input-to-hide"
              name="settlement"
              rules={[
                {
                  type: "string",
                  message: inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                },
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                },
              ]}
            >
              <Input name="settlement" type="hidden"  placeholder="Enter your settlement" />
            </Form.Item>
            <Form.Item
            className="input-to-hide"

              name="region"
              rules={[
                {
                  type: "string",
                  message: inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                },
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_SETTLEMENT_MESSAGE,
                },
              ]}
            >
              <Input name="region" type="hidden" placeholder="Enter your region" />
            </Form.Item>
            <Form.Item
              name="goodCategory"
              rules={[
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_GOOD_CATEGORY_MESSAGE,
                },
              ]}
            >
              <Select placeholder="Select good categories">
                {data?.map((res, idx) => (
                  <Option value={res.name} key={idx}>
                    {res.name.toLowerCase()}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="startDate"
              rules={[
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_START_DATE_MESSAGE,
                },
              ]}
            >
              <RangePicker
                disabledDate={disabledDate}
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
              rules={[
                {
                  message: inputValidationErrors.EMPTY_GOOD_WEIGHT_MESSAGE,
                },
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_GOOD_WEIGHT_MESSAGE,
                },
              ]}
            >
              <Input type="number" min="0" placeholder="Goods Weight" />
            </Form.Item>
            <Form.Item
              name="description"
              className="description"
              rules={[
                {
                  message: inputValidationErrors.EMPTY_DESCRIPTION_MESSAGE,
                },
                {
                  required: true,
                  message: inputValidationErrors.EMPTY_DESCRIPTION_MESSAGE,
                },
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
                onUnmount={onUnmount}
                options={defaultOptions}
                onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
                id="map"
              >
                <Marker
                  position={clickedLatLng}
                  onPositionChanged={getData(
                    clickedLatLng.lat,
                    clickedLatLng.lng
                  )}
                />
              </GoogleMap>
            </div>
            <Button type="primary" htmlType="submit" className="submitButton">
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
