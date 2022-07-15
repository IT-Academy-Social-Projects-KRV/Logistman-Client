import { React, useState } from "react";
import Card from "antd/lib/card/Card";
import { IconContext } from "react-icons"
import { Button } from "antd";
import { BsPinMap } from "react-icons/bs";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";
import { GiWeight } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { manageInivite } from "../../../services/invites";

function DriversInvite(props) {
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
                            From:
                            {" " +
                                props.data.pointFromInfo.address +
                                " " +
                                props.data.pointFromInfo.settlement +
                                " " +
                                props.data.pointFromInfo.region +
                                " " +
                                props.data.pointFromInfo.country}
                        </p>

                        <p>
                            To:
                            {" " +
                                props.data.pointToInfo.address +
                                " " +
                                props.data.pointToInfo.settlement +
                                " " +
                                props.data.pointToInfo.region +
                                " " +
                                props.data.pointToInfo.country}
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

                            {offer.creatorRoleName +
                                " " +
                                offer.goodCategoryName +
                                " at " +
                                offer.pointInfo.address +
                                ", " +
                                offer.pointInfo.settlement +
                                ", " +
                                offer.pointInfo.region +
                                ", " +
                                offer.pointInfo.country}
                        </p>
                    )}

                    <p className="dataField">
                        <GiWeight size={DEFAULT_ICON_SIZE} />

                        Total goods weight: {props.data.totalGoodsWeight} kg
                    </p>

                    <p className="dataField">
                        <RiPinDistanceLine size={DEFAULT_ICON_SIZE} />

                        Total route distance: {props.data.totalDistance} km
                    </p>
                </div>
                
                {isAnswered ?
                    <div id="cardBottom">
                        <Button>
                            Details
                        </Button>
                    </div>
                    :
                    <div id="cardBottom">
                        <Button
                            className="acceptButton"
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

                        <Button>
                            Details
                        </Button>
                    </div>
                }
            </Card>
        </IconContext.Provider>
    );
}

export default DriversInvite;
