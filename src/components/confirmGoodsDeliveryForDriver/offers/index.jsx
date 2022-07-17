import React, {useState} from "react";
import moment from "moment";
import Text from "antd/es/typography/Text";
import {Card, Tag} from "antd";
import {offerRoles} from "../../../constants/offerRoles";
import {CalendarOutlined, EnvironmentOutlined, TagOutlined} from "@ant-design/icons";
import {getPointAddress} from "../../../constants/address";

function ConfirmOffers(props) {
    const [data, setData] = useState();

    return (
        <div>
            <Card className="confirmOffers">
                <div className="cardHead">
                    <Text strong className="offerStatus">
                        <p>Role</p>
                    </Text>
                </div>

                <Tag>{data.info.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

                <p className="description">{data.info.description}</p>

                <div className="field-group">
                    <div className="cardField">
                        <TagOutlined className="fieldIcon"/>
                        <p className="fieldText category">{data.info.goodCategoryName}</p>
                    </div>
                </div>

                <div>
                    <div className="cardField">
                        <EnvironmentOutlined className="fieldIcon"/>
                        <p className="fieldText">{getPointAddress(data.info)}</p>
                    </div>
                </div>

                <div className="cardField">
                    <CalendarOutlined className="fieldIcon"/>

                    <div>
                        <div>
                            <p className="fieldText">Active since:
                                <span id="date">
                                {moment(data.info.startDate).format("DD.MM.YYYY HH:mm")}
                            </span>
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ConfirmOffers;
