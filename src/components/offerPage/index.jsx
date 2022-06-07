import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Header from "../navigation/header";
import { createOffer } from "../../services/offers";
import { getGoodCategories } from "../../services/goodCategorie";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { errorMessage } from "../../services/alerts";
import { offersErrorMessages } from "../../constants/messages/offersMessages";
import moment from "moment";
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { offerValues } from "../../constants/offerValues";

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

export default function CreateOfferPage() {
  console.log('KEY: ',process.env.REACT_APP_API_KEY);
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
          offersErrorMessages.CREATE_OFFER_FAILED,
          offersErrorMessages.MAP_IS_NOT_WORK
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

  const range = (start, end) => {
    const result = [];
  
    for (let i = start; i < end; i++) {
      result.push(i);
    }
  
    return result;
  };

  const getCurrentHour = () =>{
    var currDate = new Date();
    return currDate.getHours();
  }

  
  // function for setting timepicker in rangepicker
  const disabledRangeTime = (_, type) => {
    if(type === 'start'){
      return{
        disabledHours: () => range(0,60).splice(0,getCurrentHour() + 1),
      }
    }
  };

  const onFinish = (values) => {
    var start = values.dates[0];
    var end = values.dates[1];
    var diff = end.diff(start, 'hours')
    if(diff < offerValues.MIN_HOURS_VALUE){
      errorMessage(offersErrorMessages.CREATE_OFFER_FAILED, offersErrorMessages.TIME_INTERVAL_INCORRECT);
    } else{
      createOffer(values, clickedLatLng, history);
    }
  };

  const onFinishFailed = (values) => {
    errorMessage(
      offersErrorMessages.CREATE_OFFER_FAILED,
      offersErrorMessages.ENTER_ALL_INPUTS
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
              label="Select your address: "
              labelAlign="left"
              rules={[
                {
                  type: "string",
                  message: offersErrorMessages.EMPTY_ADDRESS_MESSAGE,
                },
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_ADDRESS_MESSAGE,
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
                  message: offersErrorMessages.EMPTY_SETTLEMENT_MESSAGE,
                },
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_SETTLEMENT_MESSAGE,
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
                  message: offersErrorMessages.EMPTY_SETTLEMENT_MESSAGE,
                },
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_SETTLEMENT_MESSAGE,
                },
              ]}
            >
              <Input name="region" type="hidden" placeholder="Enter your region" />
            </Form.Item>
            <Form.Item
              name="goodCategory"
              label="Select good categorie: "
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_GOOD_CATEGORY_MESSAGE,
                },
              ]}
            >
              <Select placeholder="Select good categories" className="select-good-categorie">
                {data?.map((res, idx) => (
                  <Option value={res.name} key={idx}>
                    {res.name.toLowerCase()}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dates"
              label="Select date: "
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_START_DATE_MESSAGE,
                },
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
                {
                  pattern: "^[0-9]",
                  message: offersErrorMessages.NOT_VALID_GOOD_WEIGHT_MESSAGE,
                },
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_GOOD_WEIGHT_MESSAGE,
                },
              ]}
            >
              <Input addonAfter="kg" className="goodsWeight" type="number" placeholder="Goods Weight" />
            </Form.Item>
            <Form.Item
              name="description"
              className="description"
              label="Write description: "
              labelAlign="left"
              rules={[
                {
                  type: "string",
                  message: offersErrorMessages.EMPTY_DESCRIPTION_MESSAGE,
                },
                {
                  required: true,
                  message: offersErrorMessages.EMPTY_DESCRIPTION_MESSAGE,
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
