import React from "react";
import { Card, Tooltip } from "antd";
import moment from "moment";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineCar, AiOutlineInfoCircle } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import { useState } from "react";
import { useEffect } from "react";
import { concatSettlements, concatThroughCities } from "../../../services/trips";
import { getPointAddress } from "../../../constants/address";

function MyRoute(props) {
    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();

    useEffect(() => {
        setCities(concatSettlements(props.data.points));
        setThroughCities(concatThroughCities(props.data.points));
    });

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="myRouteCard">
                <div className="myRouteCardBody">
                    <div className="addresses">
                        <p>
                            From: {getPointAddress(props.data.points[0])}
                        </p>

                        <p>
                            To: {getPointAddress(props.data.points[props.data.points.length - 1])}
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
                                        {moment(props.data.departureDate).format('LLL') + " "}
                                    </div>
                                </div>
                            </p>

                            <p className="dataField">
                                <RiPinDistanceLine size={DEFAULT_ICON_SIZE} />
                                Distance: {props.data.distance + " km"}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </IconContext.Provider>
    )
}

export default MyRoute;
