import React from "react";
import {Tooltip, Collapse} from "antd";
import moment from "moment";
import {FiCalendar} from "react-icons/fi";
import {AiOutlineCar, AiOutlineInfoCircle} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";
import {RiPinDistanceLine} from "react-icons/ri";
import {DEFAULT_ICON_SIZE} from "../../../constants/icon";
import {getPointAddress} from "../../../constants/address";

const {Panel} = Collapse;

function TripInfo(props) {

    console.log("props", props.tripInfo);

    return (
        <>
            {props.tripInfo != null ?
                <div className="confirmInfoTrip">
                    <div className="addresses">
                        <p>
                            From: {getPointAddress(props.tripInfo.points[0])}
                        </p>

                        <p>
                            To: {getPointAddress(props.tripInfo.points[1])}
                        </p>
                    </div>

                    <div>
                        <div className="innerBody">
                            <div className="rightSide">
                                <Tooltip
                                    placement="top"
                                    title={"tooltipMessages.CAR"}
                                >
                                    <div className="dataField">
                                        <AiOutlineCar size={DEFAULT_ICON_SIZE}/>
                                        <p>
                                            {props.tripInfo.model}
                                        </p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={"tooltipMessages.REGISTR_NUMBER"}
                                >
                                    <div className="dataField">
                                        <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE}/>
                                        <p>{props.tripInfo.registrationNumber}</p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={"tooltipMessages.LOAD_CAPACITY"}
                                >
                                    <div className="dataField">
                                        <GiWeight size={DEFAULT_ICON_SIZE}/>
                                        <p>{props.tripInfo.loadCapacity + " kg"}</p>
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="dateDistance">
                                <div className="leftSide">
                                    <div className="dataField">
                                        <div className="dates">
                                            <Tooltip
                                                placement="top"
                                                title={"tooltipMessages.START_DATE" + ": " + `${moment(props.tripInfo.departureDate).format('L')}` + " " + `${moment(props.tripInfo.departureDate).format('LT')}`}
                                            >
                                                <div className="date">
                                                    <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.tripInfo.departureDate).format('LLL') + " "}</p>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <Tooltip
                                        placement="top"
                                        title={"tooltipMessages.DISTANCE"}
                                    >
                                        <div className="dataField">
                                            <RiPinDistanceLine size={DEFAULT_ICON_SIZE}/>
                                            <p>{props.distance + " km"}</p>
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Collapse ghost>
                            <Panel className="description" header="Description" key="1">
                                <p>
                                    {props.tripInfo.description}
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
                :
                <h1>Not Data!</h1>}
        </>
    );
}

export default TripInfo;
