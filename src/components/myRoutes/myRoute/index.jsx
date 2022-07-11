import React from "react";
import {Card, Tooltip, Button, Form} from "antd";
import moment from "moment";
import {FiCalendar} from "react-icons/fi";
import {AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";
import {RiPinDistanceLine} from "react-icons/ri";
import {IconContext} from "react-icons";
import {DEFAULT_ICON_SIZE} from "../../../constants/icon";
import {useState} from "react";
import {useEffect} from "react";
import {concatSettlements, concatThroughCities, deleteRouteById} from "../../../services/trips";
import {getStartPointAddress, getEndPointAddress} from "../../../constants/address";
import {confirmDeleteMessage} from "../../../services/alerts";

function MyRoute(props) {
    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();

    useEffect(() => {
        setCities(concatSettlements(props.data.points));
        setThroughCities(concatThroughCities(props.data.points));
    });

    const updateRoute = () => {
        props.updateRoute();
    }

    const deleteRoute = (id) => {
        confirmDeleteMessage().then((result) => {
            if (result) {
                deleteRouteById(id).then(() => {
                    updateRoute();
                });
            }
        });
    }

    return (
        <IconContext.Provider value={{className: 'icon'}}>
            <Card className="myRouteCard">
                <Form className="myRouteCardBody">
                    <div className="addresses">
                        <p className="fieldText">
                            From:
                            <span id="date">
                                {getStartPointAddress(props.data.points)}
                            </span>
                        </p>

                        <p className="fieldText">
                            To:
                            <span id="date">
                                {getEndPointAddress(props.data.points)}
                            </span>
                        </p>
                    </div>

                    <p className="addresses">
                        <Tooltip placement="top" title={allCities}>
                            {"Through: " + throughCities}
                        </Tooltip>
                    </p>

                    <div className="innerBody">
                        <div className="rightSide">
                            <p className="dataField">
                                <AiOutlineCar
                                    size={DEFAULT_ICON_SIZE}
                                    className="fieldIcon"
                                />
                                Model: {props.data.car.model}
                            </p>

                            <p className="dataField">
                                <AiOutlineInfoCircle
                                    size={DEFAULT_ICON_SIZE}
                                    className="fieldIcon"
                                />
                                Registration number: {props.data.car.registrationNumber}
                            </p>

                            <p className="dataField">
                                <GiWeight
                                    size={DEFAULT_ICON_SIZE}
                                    className="fieldIcon"
                                />
                                Load capacity: {props.data.loadCapacity + " kg"}
                            </p>
                        </div>

                        <div className="leftSide">
                            <p className="dataField">
                                <div className="dates">
                                    <div className="date">
                                        <FiCalendar
                                            size={DEFAULT_ICON_SIZE}
                                            className="fieldIcon"
                                        />
                                        {moment(props.data.startDate).format('LLL') + " "}
                                    </div>

                                    <div className="date">
                                        <AiOutlineArrowRight
                                            size={DEFAULT_ICON_SIZE}
                                            className="fieldIcon"
                                        />
                                        {moment(props.data.expirationDate).format('LLL')}
                                    </div>
                                </div>
                            </p>

                            <p className="dataField">
                                <RiPinDistanceLine
                                    size={DEFAULT_ICON_SIZE}
                                    className="fieldIcon"
                                />
                                Distance: {props.data.distance + " km"}
                            </p>
                        </div>
                    </div>
                    <div className="buttonsBlock">
                        <Button
                            type="danger"
                            onClick={() => deleteRoute(props.data.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Form>
            </Card>
        </IconContext.Provider>
    )
}

export default MyRoute;
