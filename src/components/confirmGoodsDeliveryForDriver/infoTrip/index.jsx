import React, {useState} from "react";

function TripInfo(props) {
    const [data, setData] = useState();

    return (
        <>
            {props != null ?
                <div className="confirmInfoTrip">
                    <p className="dataField">
                        <FiUser size={DEFAULT_ICON_SIZE}/>
                        {props.dataTrip.fullName.name + " " + props.dataTrip.fullName.surname}
                    </p>

                    <div className="addresses">
                        <p>
                            From: {getPointAddress(props.dataTrip.points[0])}
                        </p>

                        <p>
                            To: {getPointAddress(props.dataTrip.points[props.dataTrip.points.length - 1])}
                        </p>
                    </div>

                    <p className="addresses">
                        <Tooltip placement="top" title={allCities}>
                            {"Through: " + throughCities}
                        </Tooltip>
                    </p>

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
                                            {props.dataTrip.model}
                                        </p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={tooltipMessages.REGISTR_NUMBER}
                                >
                                    <div className="dataField">
                                        <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE}/>
                                        <p>{props.dataTrip.registrationNumber}</p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={tooltipMessages.LOAD_CAPACITY}
                                >
                                    <div className="dataField">
                                        <GiWeight size={DEFAULT_ICON_SIZE}/>
                                        {props.totalWeigth > props.dataTrip.loadCapacity ?
                                            <p style={{color: "red"}}>{props.totalWeigth + " kg"}</p> :
                                            <p>{props.totalWeigth + " kg"}</p>}
                                        <p>{" / " + props.dataTrip.loadCapacity + " kg"}</p>
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="dateDistance">
                                <div className="leftSide">
                                    <div className="dataField">
                                        <div className="dates">
                                            <Tooltip
                                                placement="top"
                                                title={tooltipMessages.START_DATE + ": " + `${moment(props.dataTrip.startDate).format('L')}` + " " + `${moment(props.dataTrip.startDate).format('LT')}`}
                                            >
                                                <div className="date">
                                                    <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.dataTrip.startDate).format('LLL') + " "}</p>
                                                </div>
                                            </Tooltip>

                                            <Tooltip
                                                placement="top"
                                                title={tooltipMessages.EXPIRATION_DATE + ": " + `${moment(props.dataTrip.expirationDate).format('L')}` + " " + `${moment(props.dataTrip.expirationDate).format('LT')}`}
                                            >
                                                <div className="date">
                                                    <AiOutlineArrowRight size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.dataTrip.expirationDate).format('LLL')}</p>
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
                                            <p>{props.distance + " km"}</p>
                                        </div>
                                    </Tooltip>

                                    <div>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submitButton"
                                            onClick={() => {
                                                manageTrip({...dataManage, ...props.creatTripData}, history);
                                            }}
                                            disabled={!hasOffers}
                                        >
                                            Manage trip
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Collapse ghost>
                            <Panel className="description" header="Description" key="1">
                                <p>
                                    {props.dataTrip.description}
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
