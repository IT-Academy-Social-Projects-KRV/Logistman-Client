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

const {Panel} = Collapse;

function UserRoute(props) {
    let history = useHistory();

    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();
    const [dataManage, setDataManage] = useState();

    useEffect(() => {
        setCities(concatSettlements(props.props.points));
        setThroughCities(concatThroughCities(props.props.points));
        setDataManage({
            tripId: props.props.id,
            distance: props.distance,
            totalWeight: props.props.loadCapacity
        });
    }, [props.distance])

    let hasOffers = false;
    if (props.creatTripData != null) {
        hasOffers = props.creatTripData.pointsTrip.some(item => item.offerId != null);
    }

    if (props.totalWeigth >= props.props.loadCapacity) {
        hasOffers = false;
        errorMessage(tripsMessages.TITLE_OVERLOAD, tripsMessages.TEXT_OVERLOAD);
    }

    return (<IconContext.Provider value={{className: 'icon'}}>
            {props.creatTripData != null ?
                <div className="tripBody">
                    <p className="dataField">
                        <FiUser size={DEFAULT_ICON_SIZE}/>
                        {props.props.fullName.name + " " + props.props.fullName.surname}
                    </p>

                    <div className="addresses">
                        <p>
                            From: {props.props.points[0].address + ", "
                            + props.props.points[0].settlement + ", "
                            + props.props.points[0].region + ", "
                            + props.props.points[0].country}
                        </p>

                        <p>
                            To: {props.props.points[props.props.points.length - 1].address + ", "
                            + props.props.points[props.props.points.length - 1].settlement + ", "
                            + props.props.points[props.props.points.length - 1].region + ", "
                            + props.props.points[props.props.points.length - 1].country}
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
                                            {props.props.model}
                                        </p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={tooltipMessages.REGISTR_NUMBER}
                                >
                                    <div className="dataField">
                                        <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE}/>
                                        <p>{props.props.registrationNumber}</p>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    placement="top"
                                    title={tooltipMessages.LOAD_CAPACITY}
                                >
                                    <div className="dataField">
                                        <GiWeight size={DEFAULT_ICON_SIZE}/>
                                        {props.totalWeigth > props.props.loadCapacity ?
                                            <p style={{color: "red"}}>{props.totalWeigth + " kg"}</p> :
                                            <p>{props.totalWeigth + " kg"}</p>}
                                        <p>{" / " + props.props.loadCapacity + " kg"}</p>
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="dateDistance">
                                <div className="leftSide">
                                    <div className="dataField">
                                        <div className="dates">
                                            <Tooltip
                                                placement="top"
                                                title={tooltipMessages.START_DATE + ": "
                                                    + `${moment(props.props.startDate).format('L')}` + " "
                                                    + `${moment(props.props.startDate).format('LT')}`}
                                            >
                                                <div className="date">
                                                    <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.props.startDate).format('LLL') + " "}</p>
                                                </div>
                                            </Tooltip>

                                            <Tooltip
                                                placement="top"
                                                title={tooltipMessages.EXPIRATION_DATE + ": "
                                                    + `${moment(props.props.expirationDate).format('L')}` + " "
                                                    + `${moment(props.props.expirationDate).format('LT')}`}
                                            >
                                                <div className="date">
                                                    <AiOutlineArrowRight size={DEFAULT_ICON_SIZE}/>
                                                    <p>{moment(props.props.expirationDate).format('LLL')}</p>
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
                                    {props.props.description}
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
