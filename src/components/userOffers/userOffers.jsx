import Header from "../navigation/header";
import React, { useEffect, useState } from "react";
import { getUserOffers } from "../../services/offersService";

import Offer from "./offerComponent/offer";

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
            <div className="offers-container">
                {offers.map((offer) =>
                    < Offer info={offer} />
                )}
            </div>
        </div>
    );
}
export default UserOffersPage;
