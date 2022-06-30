import React from "react";
import {Card, Button, Tooltip} from "antd";
import moment from "moment";
import {FiUser, FiCalendar} from "react-icons/fi";
import {AiOutlineCar, AiOutlineArrowRight, AiOutlineInfoCircle} from "react-icons/ai";
import {GiWeight} from "react-icons/gi";
import {RiPinDistanceLine} from "react-icons/ri";
import {IconContext} from "react-icons";
import {DEFAULT_ICON_SIZE} from "../../../constants/icon";
import {useState} from "react";
import {useEffect} from "react";
import {concatSettlements, concatThroughCities} from "../../../services/trips";

function UserRoute(props) {

    const [allCities, setCities] = useState();
    const [throughCities, setThroughCities] = useState();
    props = props.props;
    useEffect(() => {

        setCities(concatSettlements(props.data.points));
        setThroughCities(concatThroughCities(props.data.points));
    });

    return (
        <IconContext.Provider value={{className: 'icon'}}>

            <div className="tripBody">
                <p className="dataField">
                    <FiUser size={DEFAULT_ICON_SIZE}/>
                    {props.data.user.name + " " + props.data.user.surname}
                </p>

                <div className="addresses">
                    <p>
                        From: {props.data.points[0].address +
                        ", " + props.data.points[0].settlement +
                        ", " + props.data.points[0].region +
                        ", " + props.data.points[0].country}
                    </p>

                    <p>
                        To: {props.data.points[props.data.points.length - 1].address +
                        ", " + props.data.points[props.data.points.length - 1].settlement +
                        ", " + props.data.points[props.data.points.length - 1].region +
                        ", " + props.data.points[props.data.points.length - 1].country}
                    </p>
                </div>

                <p className="addresses">
                    <Tooltip placement="top" title={allCities}>
                        {"Through: " + throughCities}
                    </Tooltip>
                </p>
                <div style={{display: "flex"}}>
                    <div className="innerBody">
                        <div className="rightSide">
                            <p className="dataField">
                                <AiOutlineCar size={DEFAULT_ICON_SIZE}/>
                                {props.data.car.model}
                            </p>

                            <p className="dataField">
                                <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE}/>
                                {props.data.car.registrationNumber}
                            </p>

                            <p className="dataField">
                                <GiWeight size={DEFAULT_ICON_SIZE}/>
                                {props.data.loadCapacity + " kg"}
                            </p>
                        </div>

                        <div className="leftSide">
                            <p className="dataField">
                                <div className="dates">
                                    <div className="date">
                                        <FiCalendar size={DEFAULT_ICON_SIZE}/>
                                        {moment(props.data.startDate).format('LLL') + " "}
                                    </div>

                                    <div className="date">
                                        <AiOutlineArrowRight size={DEFAULT_ICON_SIZE}/>
                                        {moment(props.data.expirationDate).format('LLL')}
                                    </div>
                                </div>
                            </p>

                            <p className="dataField">
                                <RiPinDistanceLine size={DEFAULT_ICON_SIZE}/>
                                {props.data.distance + " km"}
                            </p>
                        </div>
                    </div>

                    <div className="bottom">
                        <p className="description">
                            {props.data.description}
                        </p>
                    </div>
                </div>
            </div>

        </IconContext.Provider>
    )
}

export default UserRoute;
