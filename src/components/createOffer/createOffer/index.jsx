import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Form, Input, Button, DatePicker, Dropdown, AutoComplete} from "antd";
import {createOffer} from "../../../services/offerServices/createOffer";
import {createPoint} from "../../../services/pointServices/createPoint";
import { AlertService } from './../../../services/alert.service';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {defaultTheme} from '../../../assets/Theme/ThemeMap';
import Header from "../../navigation/header";
import TextArea from "antd/lib/input/TextArea";
import {setUserRole} from "../../../reduxActions/auth";
import goodCategoryService from "../../../api/goodCategory";
import {getlistCategories} from "../../../services/goodCategoryServices/goodCategoryService";


const API_KAY = process.env.REACT_APP_API_KEY;

const containerStyle = {
    width: '400px',
    height: '400px'
};
const defaultOptions = {
    panControl: true,
    zoomControl:true,
    mapTypeControl: false,
    scaleControle:false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: true,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    fullscreenControl: true,
    styles: defaultTheme
}

function RecipientOffer()
{
    const [clickedLatLng, setClickedLatLng] = useState();

    let history = useHistory();

    const center = {
        lat: 48.6869929831833,
        lng: 31.086004890453573
    }

    const libraries = ['places']

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [map, setMap] = React.useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KAY,
        libraries
    });

    const onFinishCreatePint = (values) => {
        createPoint(values, history);
    };

    const onFinishCreateOffer = (values) => {
        createOffer(values, history);
    };
    console.log(getlistCategories);

    const onFinishFailed = () => {
        AlertService.errorMessage("Log in is blocked!", "First, correct all comments!")
    }
        return(

        <div className="mainPageBody">
            <Header/>
            <p className="title">Create your Point</p>
            <div>
                {isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onClick={e => setClickedLatLng(e.latLng.toJSON())}
                    options={defaultOptions}
                >
                    <Marker position={clickedLatLng}/>
                </GoogleMap> : <h2>Loading</h2>}
                <Form
                    className="form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinishCreatePint}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    {clickedLatLng && (
                        <Form.Item
                            name="latitude"
                            className="textForm"
                            initialValue={clickedLatLng.lat}
                            hidden={true}
                        >
                        </Form.Item>
                    )}
                    {clickedLatLng && (
                    <Form.Item
                        name="longitude"
                        className="textForm"
                        initialValue={clickedLatLng.lng}
                        hidden={true}
                    >
                    </Form.Item>
                    )}
                    <Form.Item
                        name="address"
                        className="textForm"
                    >
                        <Input  placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        name="settlement"
                        className="textForm"
                    >
                        <Input  placeholder="Settlement" />
                    </Form.Item>
                    <Form.Item
                        name="region"
                        className="textForm"
                    >
                        <Input  placeholder="Region" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submitButton"
                    >
                        Create Point
                    </Button>
                </Form>
            </div>
            <div className="center">
                <p className="title">Create your Offer</p>
                <Form
                    className="form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinishCreateOffer}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item
                        name="goodsWeight"
                        className="textForm"
                    >
                        <Input placeholder="Goods weight" />
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                    >
                        <DatePicker placeholder="Start Date" />
                    </Form.Item>
                    <Form.Item
                        name="expirationDate"
                    >
                        <DatePicker placeholder="Expiration Date" />
                    </Form.Item>
                    <Form.Item
                        name="goodCategoryId"
                        className="textForm"
                    >
                        <AutoComplete
                            placeholder="good Category Id"
                            option = {getlistCategories}
                        />
                    </Form.Item>
                    <Form.Item
                        name="offerPointId"
                        className="textForm"
                    >
                        <Input placeholder="offer Point Id" />
                    </Form.Item>
                    <Form.Item
                        name="creatorRoleId"
                        className="textForm"
                        initialValue={setUserRole().type}
                    >
                        <Input placeholder="creator Role Id" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        className="textForm"
                    >
                        <TextArea placeholder="description" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submitButton"
                    >
                        Create Offer
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RecipientOffer;
