import React from "react";
import { Card, Button, Tooltip } from "antd";
import moment from "moment";
import { FiUser, FiCalendar } from "react-icons/fi";
import { AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import { useState } from "react";
import { useEffect } from "react";
import { concatSettlements, concatThroughCities } from "../../../services/trips";
import {useHistory} from "react-router-dom";
import { getStartPointAddress, getEndPointAddress } from "../../../constants/address";

function UserRoute(props) {

    const history = useHistory();
    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();
    const renderButton = props.renderButton != null ? props.renderButton : true;

    const moveToManageTrip = () => {
        history.push({
            pathname: `/manage-trip`,
            state: props
        });
    };

    useEffect(() => {
        setCities(concatSettlements(props.data.points));
        setThroughCities(concatThroughCities(props.data.points));
    });

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="routeCard">
                <div className="cardBody">
                    <p className="dataField">
                        <FiUser size={DEFAULT_ICON_SIZE} />
                        {props.data.user.name + " " + props.data.user.surname}
                    </p>

                    <div className="addresses">
                        <p>
                            From: {getStartPointAddress(props.data.points)}
                        </p>

                        <p>
                            To: {getEndPointAddress(props.data.points)}
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
                                <AiOutlineCar size={DEFAULT_ICON_SIZE} />
                                Model: {props.data.car.model}
                            </p>

                            <p className="dataField">
                                <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE} />
                                Registration number: {props.data.car.registrationNumber}
                            </p>

                            <p className="dataField">
                                <GiWeight size={DEFAULT_ICON_SIZE} />
                                Load capacity: {props.data.loadCapacity + " kg"}
                            </p>
                        </div>

                        <div className="leftSide">
                            <p className="dataField">
                                <div className="dates">
                                    <div className="date">
                                        <FiCalendar size={DEFAULT_ICON_SIZE} />
                                        {moment(props.data.startDate).format('LLL') + " "}
                                    </div>

                                    <div className="date">
                                        <AiOutlineArrowRight size={DEFAULT_ICON_SIZE} />
                                        {moment(props.data.expirationDate).format('LLL')}
                                    </div>
                                </div>
                            </p>

                            <p className="dataField">
                                <RiPinDistanceLine size={DEFAULT_ICON_SIZE} />
                                Distance: {props.data.distance + " km"}
                            </p>
                        </div>
                    </div>

                    <div className="bottom">
                        <p className="description">
                            {props.data.description}
                        </p>

                        {renderButton ?
                            <Button
                                className="createTripButton"
                                onClick={() => moveToManageTrip()}
                            >
                                Manage trip
                            </Button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </Card>
        </IconContext.Provider>
    )
}

export default UserRoute; 
