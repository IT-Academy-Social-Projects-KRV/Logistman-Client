import Header from "../navigation/header";
import React, { useEffect, useState } from "react";
import { getUserOffers } from "../../services/offersService";

import Offer from "./offerComponent/offer";
import {Result} from "antd";

function UserOffersPage() {

    const [offers, setOffers] = useState([]);

    useEffect(async () => {
        let _offers = await getUserOffers();
        setOffers(_offers);
    }, []);

    return (
        <div className="userOffersBody">
            <Header />
            <p className="title">My Offers</p>
            {offers.length > 0 ?
                <>
                <div className="offers-container">
                    {offers.map((offer) =>
                        < Offer info={offer}/>
                    )}
                </div>
                </>
                :
                <Result
                    status="404"
                    title="Looks like you haven't created any offer yet."
                />
            }
        </div>
    );
}
export default UserOffersPage;
