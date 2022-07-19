import React, {useEffect, useState} from "react";
import {getUserTripInfo} from "../../services/trips";
import Header from "../navigation/header";
import TripInfo from "./infoTrip";
import ConfirmOffers from "./offers";
import {getDriverConfirmGoodsDelivery} from "../../services/offers";
import {Result} from "antd";

function ConfirmGoodsDeliveryForDriver() {
    const [tripInfo, setTripInfo] = useState();
    const [offers, setOffers] = useState();

    useEffect(() => {
        async function fetchData() {
            const data = await getUserTripInfo()
            setTripInfo(data);

            if (data != null) {
                setOffers(await getDriverConfirmGoodsDelivery(data.id));
            }
        }

        fetchData();
    }, [])

    return (
        <div>
            <Header/>

            <div className="confirmGoodsDeliveryForDriverPage">
                <h1 className="title">Active Trip</h1>

                {tripInfo != null ?
                    <div className="confirmTripOfferBody">
                        <TripInfo tripInfo={tripInfo}/>
                        <h2>Offers</h2>
                        <div>
                            { offers != null && offers.length != 0 ?
                                offers.map((item, iter) => {
                                    if (offers.length == 2 &&
                                        offers[0].isAnsweredByDriver == true &&
                                        offers[1].isAnsweredByDriver == false) {

                                        return (
                                            <ConfirmOffers
                                                resetOffers={async () => {
                                                    setOffers(await getDriverConfirmGoodsDelivery(tripInfo.id));
                                                }}
                                                isNextOffer={false}
                                                offerData={item}
                                                key={item.id}/>
                                        );
                                    } else
                                    if (offers.length == 1) {

                                        return (
                                            <ConfirmOffers
                                                resetOffers={async () => {
                                                    setOffers(await getDriverConfirmGoodsDelivery(tripInfo.id));
                                                }}
                                                isNextOffer={false}
                                                offerData={item}
                                                key={item.id}/>
                                        );
                                    } else if (iter == offers.length - 1) {

                                        return (
                                            <ConfirmOffers
                                                isNextOffer={true}
                                                offerData={item}
                                                key={item.id}/>
                                        );
                                    }

                                    return (
                                        <ConfirmOffers
                                            resetOffers={async () => {
                                                setOffers(await getDriverConfirmGoodsDelivery(tripInfo.id));
                                            }}
                                            isNextOffer={false}
                                            offerData={item}
                                            key={item.id}/>
                                    );
                                })
                                :
                                <Result
                                    status="404"
                                    title="There is no offers to confirm."
                                />
                            }
                        </div>
                    </div>
                    :
                    <Result
                        status="404"
                        title="There is no trip information."
                    />
                }
            </div>
        </div>
    );
}

export default ConfirmGoodsDeliveryForDriver;
