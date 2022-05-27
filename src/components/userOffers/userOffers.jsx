import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { getUserOffers } from "../../services/offers";
import Offer from "./offer/offer";
import { Result } from "antd";

function UserOffersPage() {

    const [offers, setOffers] = useState([]);

    useEffect(async () => {
        setOffers(await getUserOffers());
    }, []);

    return (
        <div className="userOffersBody">
            <Header />

            <p className="title">My offers</p>

            {offers.length > 0 ?
                <div className="offers-container">
                    {offers.map((offer) =>
                        <Offer info={offer} />
                    )}
                </div>
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
