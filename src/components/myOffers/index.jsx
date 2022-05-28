import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { getUserOffers } from "../../services/offers";
import { Result } from "antd";
import MyOffer from './myOffer/index';

function MyOffersPage() {

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
                        <MyOffer info={offer} />
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

export default MyOffersPage;
