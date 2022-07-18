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
            setOffers(await getDriverConfirmGoodsDelivery(data.id));
        }

        fetchData();
    }, [])

    console.log(offers);

    return (
        <div>
            <Header/>

            <div className="confirmGoodsDeliveryForDriverPage">
                <h1 className="titel">Active Trip</h1>

                {tripInfo != null ?
                    <div className="confirmTripOfferBody">
                        <TripInfo tripInfo={tripInfo}/>
                        <h2>Offers</h2>
                        <div>
                            {offers != null ?
                                offers.map((item, iter) => {
                                    console.log(iter, item);
                                    if (iter == 1 && !item.isAnsweredByDriver) {

                                        return (
                                            <ConfirmOffers
                                                resetOffers={async () => {
                                                    setOffers(await getDriverConfirmGoodsDelivery(tripInfo.id));
                                                }}
                                                isNextOffer={false}
                                                offerData={item}
                                                key={item.id}/>
                                        );
                                    } else if (offers.length == 1) {

                                        return (
                                            <ConfirmOffers
                                                resetOffers={async () => {
                                                    setOffers(await getDriverConfirmGoodsDelivery(tripInfo.id));
                                                }}
                                                isNextOffer={false}
                                                offerData={item}
                                                key={item.id}/>
                                        );
                                    } else if (iter == offers.length - 1){

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
                                    title="There is no offers information."
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
