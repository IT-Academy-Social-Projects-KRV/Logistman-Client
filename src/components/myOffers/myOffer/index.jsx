import React from "react";
import { Card, Tag } from "antd";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    TagOutlined
} from "@ant-design/icons";
import moment from 'moment';
import Text from "antd/es/typography/Text";
import { offerRoles } from '../../../constants/offerRoles';

function MyOffer(data) {

    return (
        <Card className="offerCard">
            <div className="cardHead">
                <p className="creationDate">{moment(data.info.creationDate).format('LLL')}</p>
                <Text strong className="offerStatus">

                    {!data.info.isClosed ?
                        <p id="opened">Opened</p> :
                        <p id="closed">Closed</p>
                    }
                </Text>
            </div>

            <Tag>{data.info.creatorRoleName === offerRoles.SENDER ? "Donate" : "Need"}</Tag>

            <p className="description">{data.info.description}</p>

            <div className="field-group">
                <div className="cardField">
                    <TagOutlined className="fieldIcon" />
                    <p className="fieldText category">{data.info.goodCategoryName}</p>
                </div>
            </div>

            <div>
                <div className="cardField">
                    <EnvironmentOutlined className="fieldIcon" />
                    <p className="fieldText">{data.info.address}</p>
                </div>
            </div>

            <div className="cardField">
                <CalendarOutlined className="fieldIcon" />

                <div>
                    <div>
                        <p className="fieldText">Active since:
                            <span id="date">
                                {moment(data.info.startDate).format("DD.MM.YYYY hh:mm")}
                            </span>
                        </p>

                        <p className="fieldText">Expires at:
                            <span id="date">
                                {moment(data.info.expirationDate).format("DD.MM.YYYY hh:mm")}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default MyOffer;
