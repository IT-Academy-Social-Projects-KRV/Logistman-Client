import React from "react";
import Header from "../navigation/header";
import { useHistory, Link } from 'react-router-dom';
import { getUserVerifiedCarsAsync } from "../../services/cars";
import { carsErrorMessages } from './../../constants/messages/cars';
import { tripsMessages } from './../../constants/messages/trips';
import { errorMessage } from './../../services/alerts';
import {Link} from "react-router-dom";

function MainPage() {
    let history = useHistory();

    const onCreateTripTileClick = async () => {
        var verifiedCars = await getUserVerifiedCarsAsync();

        if (verifiedCars !== undefined &&
            verifiedCars.length > 0) {
            history.push("/create-route");
        }
        else {
            errorMessage(
                carsErrorMessages.ANY_VERIFIED_CAR,
                tripsMessages.CREATE_TRIP_BLOCKED
            )
        }
    }

    return (
        <div className="mainPageBody">
            <Header />

            <h2 className="status">What do you want to do?</h2>

            <div className="role-container">
                <div className="role-block">
                    <Link className="role-link" to="/create-sender-offer">
                        <div className="role block-sender">
                            <span>I can donate some goods</span>
                        </div>
                    </Link>

                    <Link className="role-link" to="/create-recipient-offer">
                        <div className="role block-recipient">
                            <span>I need help</span>
                        </div>
                    </Link>
                </div>

                <div
                    onClick={() => onCreateTripTileClick()}
                    className="role block-driver"
                >
                    <span>I can deliver goods</span>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
