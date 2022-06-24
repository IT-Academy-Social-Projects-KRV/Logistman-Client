import React from "react";
import { Card, Tooltip } from "antd";
import moment from "moment";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import { useState } from "react";
import { useEffect } from "react";
import { concatSettlements, concatThroughCities } from "../../../services/trips";

function MyRoute(props) {
    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();
    let startPoint;
    let endPoint;

    useEffect(() => {
        setCities(concatSettlements(props.data.points));
        setThroughCities(concatThroughCities(props.data.points));
    });

    {
        if (props.data.points[0].region != null) {
            startPoint = props.data.points[0].address +
                ", " + props.data.points[0].settlement +
                ", " + props.data.points[0].region +
                ", " + props.data.points[0].country;
        }
        else {
            startPoint = props.data.points[0].address +
                ", " + props.data.points[0].settlement +
                ", " + props.data.points[0].country;
        }
    }

    {
        if (props.data.points[props.data.points.length - 1].region != null) {
            endPoint = props.data.points[props.data.points.length - 1].address +
            ", " + props.data.points[props.data.points.length - 1].settlement +
            ", " + props.data.points[props.data.points.length - 1].region +
            ", " + props.data.points[props.data.points.length - 1].country
        }
        else {
            endPoint = props.data.points[props.data.points.length - 1].address +
            ", " + props.data.points[props.data.points.length - 1].settlement +
            ", " + props.data.points[props.data.points.length - 1].country
        }
    }

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="myRouteCard">
                <div className="myRouteCardBody">
                    <div className="addresses">
                        <p>
                            From: {startPoint}
                        </p>

                        <p>
                            To: {endPoint}
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
                                {props.data.car.model}
                            </p>

                            <p className="dataField">
                                <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE} />
                                {props.data.car.registrationNumber}
                            </p>

                            <p className="dataField">
                                <GiWeight size={DEFAULT_ICON_SIZE} />
                                {props.data.loadCapacity + " kg"}
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
                                {props.data.distance + " km"}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </IconContext.Provider>
    )
}

export default MyRoute;
