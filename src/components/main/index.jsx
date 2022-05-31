import React from "react";
import Header from "../navigation/header";
import { useHistory } from 'react-router-dom';
import { getUserVerifiedCars } from "../../services/cars";
import { carsErrorMessages } from './../../constants/messages/cars';
import { tripsErrorMessages } from './../../constants/messages/trips';
import { errorMessage } from './../../services/alerts';

function MainPage() {
    let history = useHistory();

    const onCreateTripTileClick = async () => {
        var verifiedCars = await getUserVerifiedCars();

        if (verifiedCars !== undefined &&
            verifiedCars.length > 0) {
            history.push("/create-trip");
        }
        else {
            errorMessage(
                carsErrorMessages.ANY_VERIFIED_CAR,
                tripsErrorMessages.CREATE_TRIP_BLOCKED
            )
        }
    }

    return (
        <div className="mainPageBody">
            <Header />
            <h2 className="status">What do you want to do?</h2>
            <div className="role-container">
                <div className="role-block">
                    <div className="role block-sender">
                        <span>I can donate some goods</span>
                    </div>
                    <div className="role block-recipient">
                        <span>I need help</span>
                    </div>
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
