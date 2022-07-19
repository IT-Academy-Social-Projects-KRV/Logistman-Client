import React from "react";
import {Tooltip, Collapse} from "antd";
import moment from "moment";
import {FiCalendar} from "react-icons/fi";
import {AiOutlineCar, AiOutlineInfoCircle} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";
import {RiPinDistanceLine} from "react-icons/ri";
import {DEFAULT_ICON_SIZE} from "../../../constants/icon";
import {getPointAddress} from "../../../constants/address";
import {tooltipMessages} from "../../../constants/tooltipeMessages/tripInfoMasseges";

const {Panel} = Collapse;

function TripInfo(props) {

    return (
        <>
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
                                title={tooltipMessages.CAR}
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
                                title={tooltipMessages.REGISTR_NUMBER}
                            >
                                <div className="dataField">
                                    <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE}/>
                                    <p>{props.tripInfo.registrationNumber}</p>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="top"
                                title={tooltipMessages.LOAD_CAPACITY}
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
                                            title={tooltipMessages.DEPARTURE_DATE}
                                        >
                                            <div className="date">
                                                <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                                <p>{moment.utc(props.tripInfo.departureDate).format('LL HH:mm') + " "}</p>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>

                                <Tooltip
                                    placement="top"
                                    title={tooltipMessages.DISTANCE}
                                >
                                    <div className="dataField">
                                        <RiPinDistanceLine size={DEFAULT_ICON_SIZE}/>
                                        <p>{props.tripInfo.distance + " km"}</p>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Collapse ghost>
                        <Panel
                            className="description"
                            header="Description"
                            key="tripDescription">
                            <p>
                                {props.tripInfo.description}
                            </p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </>
    );
}

export default TripInfo;
