import { React, useState } from "react";
import Card from "antd/lib/card/Card";
import { IconContext } from "react-icons"
import { Button } from "antd";
import { BsPinMap } from "react-icons/bs";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { manageInivite } from "../../../services/invites";
import { getPointAddress } from '../../../constants/address';

function Invite(props) {
    const [isAnswered, setIsAnswered] = useState(props.data.isAnswered);

    const onClick = async (isAccepted) => {
        var answer = await manageInivite({
            inviteId: props.data.id,
            isAccepted: isAccepted
        });

        setIsAnswered(answer);
    }

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="inviteCard">
                <div className="top">
                    <div className="points">
                        <p>
                            From: {getPointAddress(props.data.pointFromInfo)}
                        </p>

                        <p>
                            To: {getPointAddress(props.data.pointToInfo)}
                        </p>
                    </div>

                    {isAnswered ?
                        <p id="answered">Answered</p>
                        :
                        <></>
                    }
                </div>

                <div className="offersInfo">
                    {props.data.offersInfo.map((offer) =>
                        <p className="dataField">
                            <BsPinMap size={DEFAULT_ICON_SIZE} />

                            {
                                offer.creatorRoleName +
                                " " +
                                offer.goodCategoryName +
                                " at " +
                                getPointAddress(offer.pointInfo)
                            }
                        </p>
                    )}

                    <p className="dataField">
                        <GiWeight size={DEFAULT_ICON_SIZE} />

                        Total goods weight: {Math.round(props.data.totalGoodsWeight)} kg
                    </p>

                    <p className="dataField">
                        <RiPinDistanceLine size={DEFAULT_ICON_SIZE} />

                        Total route distance: {props.data.totalDistance} km
                    </p>
                </div>

                {isAnswered ?
                    <div id="cardBottom">
                        <></>   
                    </div>
                    :
                    <div id="cardBottom">
                        <Button
                            className="submitButton"
                            type="primary"
                            onClick={() => onClick(true)}
                        >
                            Accept
                        </Button>

                        <Button
                            type="danger"
                            onClick={() => onClick(false)}
                        >
                            Decline
                        </Button>
                    </div>
                }
            </Card>
        </IconContext.Provider>
    );
}

export default Invite;
