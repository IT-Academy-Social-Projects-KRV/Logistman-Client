import React from "react";
import {Button, Card, Tag} from "antd";
import {
    CarOutlined,
    EnvironmentOutlined,
    TagOutlined
} from "@ant-design/icons";
import moment from 'moment';
import Text from "antd/es/typography/Text";
import { offerRoles } from '../../../constants/offerRoles';
import { getPointAddress } from "../../../constants/address";
import {confirmGoodsTransfer} from "../../../services/offers";

function OfferToConfirm(data) {
    const updateOffers = () => {
        data.updateOffers();
    }

    const confirmDelivery = async (offer, response) => {
        let model = {
            offerId: offer.id,
            tripRole: offer.creatorRoleName,
            isConfirmed: response
        };
        await confirmGoodsTransfer(model);
        updateOffers()
    }

    return (
        <Card className="offerCard">
            <div className="cardHead">
                <p className="creationDate">{moment(data.info.creationDate).format('LL HH:mm')}</p>
                <Text strong className="offerStatus">

                    {data.info.isAnsweredByCreator ?
                        data.info.isConfirmedByCreator ?
                            data.info.creatorRoleName === offerRoles.SENDER.toUpperCase() ?
                                <p id="opened">Donated</p> :
                                <p id="opened">Received</p>
                            :
                        <p id="failed">Failed</p> :
                        <></>
                    }
                </Text>
            </div>

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
                    <p className="fieldText">{getPointAddress(data.info)}</p>
                </div>
            </div>

            <p></p>

            <div className="cardField">
                <CarOutlined className="fieldIcon" id="carIcon" />
                <div>
                    <div>
                        <p className="fieldText">
                            <span id="driver">{data.info.driverFullName.name} {data.info.driverFullName.surname}</span>
                        </p>
                        <p className="fieldText">{data.info.car.model}</p>
                        <p className="fieldText">{data.info.car.registrationNumber}</p>
                    </div>
                </div>
            </div>

            {!data.info.isAnsweredByCreator ?
                <div className="buttonsBlock">
                    <div className="buttons-group">
                        {data.info.creatorRoleName === offerRoles.SENDER.toUpperCase() ?
                            <Button
                                className="confirmButton"
                                type="primary"
                                onClick={() => confirmDelivery(data.info, true)}
                            >
                                I gave it away!
                            </Button> :
                            <Button
                                className="confirmButton"
                                type="primary"
                                onClick={() => confirmDelivery(data.info, true)}
                            >
                                I got it!
                            </Button>}
                    </div>
                    <Button
                        type="danger"
                        onClick={() => confirmDelivery(data.info, false)}
                    >
                        I didn't
                    </Button>
                </div>
                :
                <></>
            }
        </Card>
    );
}

export default OfferToConfirm;
