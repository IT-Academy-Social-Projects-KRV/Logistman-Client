import { Button, Card, Tag } from "antd";
import { CalendarOutlined, EnvironmentOutlined, TagOutlined } from "@ant-design/icons";
import React from "react";
import moment from 'moment';
import Text from "antd/es/typography/Text";

function Offer(data) {
    return (
        <div>
            <Card className="offerCard">
                <div>
                    <div className="cardHead">
                        <p className="creationDate">{moment(data.info.creationDate).format('LLL')}</p>
                        <Text strong className="offerStatus">
                            {!data.info.isClosed ?
                                <p id="opened">Opened</p> :
                                <p id="closed">Closed</p>}
                        </Text>
                    </div>
                </div>
                <Tag>{data.info.creatorRoleName === "SENDER" ? "Give" : "Need"}</Tag>
                <p>{data.info.description}</p>
                <div>
                    <TagOutlined className="cardField fieldIcon" />
                    <p className="cardField fieldText">{data.info.goodCategoryName}</p>
                </div>
                <div>
                    <EnvironmentOutlined className="cardField fieldIcon" />
                    <p className="cardField fieldText">{data.info.address}</p>
                </div>
                <div className="fieldDate">
                    <CalendarOutlined className="cardField fieldIcon" />
                    <div className="cardField fieldText">
                        <div>
                            <p>Active since: {moment(data.info.startDate).format("DD.MM.YYYY hh:mm")}</p>
                            <p>Expires at: {moment(data.info.expirationDate).format("DD.MM.YYYY hh:mm")}</p>
                        </div>
                    </div>
                </div>
                <Button type="primary"
                        className="viewButton"
                >
                    View Offer
                </Button>
            </Card>
        </div>
    );
}

export default Offer;
