import React from "react";
import {Button, Tooltip, Collapse} from "antd";
import moment from "moment";
import {FiUser, FiCalendar} from "react-icons/fi";
import {AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";
import {RiPinDistanceLine} from "react-icons/ri";
import {IconContext} from "react-icons";
import {DEFAULT_ICON_SIZE} from "../../../constants/icon";
import {useState} from "react";
import {useEffect} from "react";
import {concatSettlements, concatThroughCities, manageTrip} from "../../../services/trips";
import {tooltipMessages} from "../../../constants/tooltipeMessages/tripInfoMasseges";
import {errorMessage} from "../../../services/alerts";
import {tripsMessages} from "../../../constants/messages/trips";
import {useHistory} from 'react-router-dom';
import {getPointAddress} from "../../../constants/address";

const {Panel} = Collapse;

function UserRoute(props) {
    let history = useHistory();
    let hasOffers = false;

    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();
    const [dataManage, setDataManage] = useState();

    useEffect(() => {
        setCities(concatSettlements(props.dataTrip.points));
        setThroughCities(concatThroughCities(props.dataTrip.points));
        setDataManage({
            tripId: props.dataTrip.id,
            distance: props.distance,
            totalWeight: props.dataTrip.loadCapacity
        });
    }, [props.distance])

    if (props.createTripData != null) {
        hasOffers = props.createTripData.pointsTrip.some(item => item.offerId != null);
    }

    if (props.totalWeigth >= props.dataTrip.loadCapacity) {
        hasOffers = false;
        errorMessage(tripsMessages.TITLE_OVERLOAD, tripsMessages.TEXT_OVERLOAD);
    }

    return (
        <IconContext.Provider value={{className: 'icon'}}>
            {props.createTripData != null ?
                <div className="tripBody">
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
                                            <p style={{color: "red"}}>{Math.round(props.totalWeigth, 1) + " kg"}</p> :
                                            <p>{Math.round(props.totalWeigth, 1) + " kg"}</p>}
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
                                                title={tooltipMessages.DEPARTURE_DATE + ": "
                                                    + `${moment(props.dataTrip.departureDate).format('L')}` + " "
                                                    + `${moment(props.dataTrip.departureDate).format('HH:mm')}`}
                                            >
                                                <div className="date">
                                                    <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.dataTrip.departureDate).format('LL HH:mm') + " "}</p>
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
                                                manageTrip({...dataManage, ...props.createTripData}, history);
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
                <h1>Not Data!</h1>
            }
        </IconContext.Provider>
    );
}

export default UserRoute;
