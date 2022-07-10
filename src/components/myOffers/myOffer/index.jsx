import React from "react";
import { Card, Tag, Button, Form } from "antd";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    TagOutlined
} from "@ant-design/icons";
import moment from 'moment';
import Text from "antd/es/typography/Text";
import { offerRoles } from '../../../constants/offerRoles';
import { confirmDeleteMessage } from '../../../services/alerts';
import { deleteOfferById } from "../../../services/offers";

function MyOffer(data) {
    const updateOffers = () => {
        data.updateOffers();
    }

    const onFinish = (values) => {
        confirmDeleteMessage().then((result) => {
            if(result) {
                deleteOfferById(values.id).then(() => {
                    updateOffers();
                });
            }
        });
    }

    return (
        <Card className="offerCard">
            <div className="cardHead">
                <p className="creationDate">{moment(data.info.creationDate).format('LL HH:mm')}</p>
                <Text strong className="offerStatus">

                    {!data.info.isClosed ?
                        <p id="opened">Opened</p> :
                        <p id="closed">Closed</p>
                    }
                </Text>
            </div>

            <Form onFinish={() => onFinish(data.info)}>
                <Tag>{data.info.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

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
                                    {moment(data.info.startDate).format("DD.MM.YYYY HH:mm")}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="buttonsBlock">
                    <Button
                        type="danger"
                        htmlType={"submit"}
                    >
                        Delete
                    </Button>
                </div>
            </Form>
        </Card>
    );
}

export default MyOffer;
