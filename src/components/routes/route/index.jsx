import React from "react";
import { Card, Button } from "antd";
import moment from "moment";
import { FiUser, FiCalendar } from "react-icons/fi";
import { AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";

function UserRoute(props) {

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="routeCard">
                <div className="cardBody">
                    <p className="dataField">
                        <FiUser size={DEFAULT_ICON_SIZE} />
                        {props.data.user.name + " " + props.data.user.surname}
                    </p>
                    <div className="addresses">
                        <p>From: {props.data.points[0].address}</p>
                        <p>To: {props.data.points[props.data.points.length - 1].address}</p>
                    </div>
                    <p className="addresses">
                        {"Through: " +
                            props.data.points[0].settlement +
                            ", " +
                            props.data.points[1].settlement +
                            ", " +
                            props.data.points[props.data.points.length - 2].settlement +
                            ", " +
                            props.data.points[props.data.points.length - 1].settlement}
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
                    <div className="bottom">
                        <p className="description">
                            {props.data.description}
                        </p>
                        <Button className="createTripButton">
                            Create trip
                        </Button>
                    </div>
                </div>
            </Card>
        </IconContext.Provider>
    )
}

export default UserRoute; 
