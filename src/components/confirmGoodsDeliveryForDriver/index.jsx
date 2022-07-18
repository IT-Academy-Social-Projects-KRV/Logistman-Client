import React, {useEffect, useState} from "react";
import {getTripInfo} from "../../services/trips";
import Header from "../navigation/header";
import TripInfo from "./infoTrip";

function ConfirmGoodsDeliveryForDriver() {
    const [tripInfo, setTripInfo] = useState();

    useEffect(() => {
        async function fetchData() {
            setTripInfo(await getTripInfo(1));
        }

        fetchData();
    }, [])

    console.log("data", tripInfo);

    return (
        <div>
            <Header/>

            <div className="confirmGoodsDeliveryForDriverPage">
                <h1 className="titel">Active Trip</h1>

                <div className="confirmTripOfferBody">
                    <TripInfo tripInfo={tripInfo}/>
                </div>
            </div>
        </div>
    );
}

export default ConfirmGoodsDeliveryForDriver;
