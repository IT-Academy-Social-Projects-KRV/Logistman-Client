import React from "react";
import { Card, Tag } from "antd";
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons"
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import moment from 'moment';
import { offerRoles } from '../../../constants/offerRoles';
import { GiWeight } from "react-icons/gi";
import { getPointAddress } from '../../../constants/address';

function Notification(data) {

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="notificationCard">
                <h3>My offer:</h3>

                <Card className="innerCard offerCard">
                    <Tag>{data.info.offerInfo.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

                    <p className="description">{data.info.offerInfo.description}</p>

                    <div className="information">
                        <div className="field-group">
                            <div className="cardField">
                                <AiOutlineTag size={DEFAULT_ICON_SIZE} />
                                <p className="fieldText category">{data.info.offerInfo.goodCategoryName}</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <AiOutlineEnvironment size={DEFAULT_ICON_SIZE} />
                                <p className="fieldText">{getPointAddress(data.info.offerInfo)}</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <GiWeight size={DEFAULT_ICON_SIZE} />
                                <p className="down-field fieldText">Load capacity: {Math.round(data.info.offerInfo.goodsWeight)} kg</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <h3>Trip:</h3>

                <Card className="innerCard">
                    <div className="field-group">
                        <div className="cardField">
                            <AiOutlineUser size={DEFAULT_ICON_SIZE} />
                            <p className="fieldText">
                                {data.info.tripInfo.creatorFullName.name} {data.info.tripInfo.creatorFullName.surname}
                            </p>
                        </div>
                    </div>

                    <div className="cardField">
                        <AiOutlineCalendar size={DEFAULT_ICON_SIZE} />

                        <div>
                            <div>
                                <p className="fieldText">Departure date:
                                    <span className="fieldText date">
                                        {moment(data.info.tripInfo.departureDate).format('LL HH:mm')}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="down-field description">{data.info.tripInfo.description}</p>
                </Card>
            </Card>
        </IconContext.Provider>
    );
}

export default Notification;
