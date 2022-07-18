import React, {useState} from "react";
import Text from "antd/es/typography/Text";
import {Button, Card, Collapse, Tag} from "antd";
import {offerRoles} from "../../../constants/offerRoles";
import {EnvironmentOutlined, TagOutlined} from "@ant-design/icons";
import {getPointAddress} from "../../../constants/address";
import {AiOutlineClose, AiOutlineCheck} from "react-icons/ai";
import {confirmGoodsTransfer} from "../../../services/offers";

const {Panel} = Collapse;

function ConfirmOffers(props) {
    const offerCreatedConfirm = (data) => {
        if (data.goodTransferConfirmedByCreator && data.isAnsweredByCreator) {
            return (<p>Creator confirmed</p>);
        } else if (!data.goodTransferConfirmedByCreator && data.isAnsweredByCreator) {
            return (<p>Creator declined</p>);
        }
        return (<p>Creator hasn’t reviewed</p>);
    }

    const driverConfirm = (data) => {
        if (data.goodTransferConfirmedByDriver && data.isAnsweredByDriver) {
            return (
                <div className="confirmLabel">
                    <AiOutlineCheck/>
                    <label>Confirmed</label>
                </div>
            );
        } else if (!data.goodTransferConfirmedByDriver && data.isAnsweredByDriver) {
            return (
                <div className="declineLabel">
                    <AiOutlineClose/>
                    <label>Declined</label>
                </div>
            );
        } else if (props.isNextOffer) {
            return (
                <div className="nextLabel">
                    <label>Next Offer</label>
                </div>);
        }
        return (
            <div>
                <Button onClick={async () => {
                    await confirmGoodsTransfer(
                        {
                            offerId: props.offerData.id,
                            tripRole: offerRoles.DRIVER,
                            isConfirmed: true
                        }
                    );
                    console.log("Confirm", {offerId: props.offerData.id, Role: offerRoles.DRIVER, isConfirmed: true});
                    await props.resetOffers();
                }} className="confirm button">Confirm</Button>
                <Button onClick={async () => {
                    await confirmGoodsTransfer(
                        {
                            offerId: props.offerData.id,
                            tripRole: offerRoles.DRIVER,
                            isConfirmed: false
                        }
                    );
                    console.log("Decline", {offerId: props.offerData.id, Role: offerRoles.DRIVER, isConfirmed: false});
                    await props.resetOffers();
                }} className="decline button">Decline</Button>
            </div>
        );
    }

    return (
        <div>
            <Card className="confirmOffers">
                <div className="cardHead">
                    <Tag>{props.offerData.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

                    <Text strong className="offerStatus">
                        {offerCreatedConfirm(props.offerData)}
                    </Text>
                </div>

                <Collapse ghost className="description">
                    <Panel
                        className="description"
                        header="Description"
                        key="offerDescription">
                        <p>
                            {props.offerData.description}
                        </p>
                    </Panel>
                </Collapse>

                <div className="field-group">
                    <div className="cardField">
                        <TagOutlined className="fieldIcon"/>
                        <p className="fieldText category">{props.offerData.goodCategoryName.toUpperCase()}</p>
                    </div>
                </div>

                <div>
                    <div className="cardField">
                        <EnvironmentOutlined className="fieldIcon"/>
                        <p className="fieldText">{getPointAddress(props.offerData.pointInfo)}</p>
                    </div>
                </div>

                <div className="eventPlace">
                    {driverConfirm(props.offerData)}
                </div>
            </Card>
        </div>
    );
}

export default ConfirmOffers;
