import React from "react";
import { Card, Tag, Button } from "antd";
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai";
import { IconContext } from "react-icons"
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import moment from 'moment';
import Text from "antd/es/typography/Text";
import { confirmDeleteMessage } from '../../../services/alerts';
import { deleteById } from "../../../services/offers";
import { offerRoles } from '../../../constants/offerRoles';
import { getPointAddress } from "../../../constants/address";

function MyOffer(data) {
    const updateOffers = () => {
        data.updateOffers();
    }

    const deleteOffer = async (model) => {
        var result = await confirmDeleteMessage();

        if (result) {
            deleteById(model).then(() => {
                updateOffers();
            });
        }
    }

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="offerCard">
                <div className="cardHead">
                    <p className="creationDate">{moment.utc(data.info.creationDate).format('LL HH:mm')}</p>
                    <Text strong className="offerStatus">

                        {!data.info.isClosed ?
                            <p id="opened">Opened</p> :
                            <p id="closed">Closed</p>
                        }
                    </Text>
                </div>

                <Tag>{data.info.creatorRoleName === offerRoles.SENDER.toUpperCase() ? "Donate" : "Need"}</Tag>

                <p className="description">{data.info.description}</p>

                <div className="field-group">
                    <div className="cardField">
                        <AiOutlineTag size={DEFAULT_ICON_SIZE} />
                        <p className="fieldText category">{data.info.goodCategoryName}</p>
                    </div>
                </div>

                <div>
                    <div className="cardField">
                        <AiOutlineEnvironment size={DEFAULT_ICON_SIZE} />
                        <p className="fieldText">{getPointAddress(data.info)}</p>
                    </div>
                </div>

                <div className="cardField">
                    <AiOutlineCalendar size={DEFAULT_ICON_SIZE} />

                    <div>
                        <div>
                            <p className="fieldText">Active since:
                                <span id="date">
                                    {moment.utc(data.info.startDate).format("LL HH:mm")}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {data.info.relatedTripId === null
                    ?
                    <div className="buttonsBlock">
                        <Button
                            type="danger"
                            onClick={() => deleteOffer(data.info.id)}
                        >
                            Delete
                        </Button>
                    </div>
                    :
                    <></>
                }

            </Card>
        </IconContext.Provider>
    );
}

export default MyOffer;
