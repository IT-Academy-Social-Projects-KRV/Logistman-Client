import React from "react";
import { Card, Tag } from "antd";
import {
    UserOutlined,
    EnvironmentOutlined,
    TagOutlined,
    CalendarOutlined
} from "@ant-design/icons";
import moment from 'moment';
import { offerRoles } from '../../../constants/offerRoles';
import heavy_icon from "../../../assets/images/cars/heavy.svg";
import { getPointAddress } from '../../../constants/address';

function Notification(data) {
   
    return (
        <Card className="notificationCard">
            <h3>My offer:</h3>

            <Card className="innerCard offerCard">
                <Tag>{data.info.offerInfo.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

                <p className="description">{data.info.offerInfo.description}</p>

                <div className="information">
                    <div className="field-group">
                        <div className="cardField">
                            <TagOutlined className="fieldIcon" />
                            <p className="fieldText category">{data.info.offerInfo.goodCategoryName}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <EnvironmentOutlined className="fieldIcon" />
                            <p className="fieldText">{getPointAddress(data.info.offerInfo)}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={heavy_icon} className="fieldIcon" />
                            <p className="down-field fieldText">Load capacity: {data.info.offerInfo.goodsWeight} kg</p>
                        </div>
                    </div>
                </div>
            </Card>

            <h3>Trip:</h3>

            <Card className="innerCard">
                <div className="field-group">
                    <div className="cardField">
                        <UserOutlined className="fieldIcon" />
                        <p className="fieldText">
                            {data.info.tripInfo.creatorFullName.name} {data.info.tripInfo.creatorFullName.surname}
                        </p>
                    </div>
                </div>

                <div className="cardField">
                    <CalendarOutlined className="fieldIcon" />

                    <div>
                        <div>
                            <p className="fieldText">Departure date:
                                <span className="fieldText date">
                                    {moment(data.info.tripInfo.expirationDate).format('LL HH:mm')}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <p className="down-field description">{data.info.tripInfo.description}</p>
            </Card>
        </Card>
    );
}

export default Notification;
