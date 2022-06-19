import React, {useEffect} from 'react';
import Header from "../navigation/header";
import {GoogleMap} from "@react-google-maps/api";

function AddOfferToTripPage() {

    return (
        <>
            <Header/>
            <div className={"createTripBody"}>
                <div><h1>Create Trip</h1></div>
                <div className={"component"}>
                    <GoogleMap
                    >
                    </GoogleMap>
                </div>
                <div className={"component-block"}>
                    <div className={"component"}><p>Offers</p></div>
                    <div className={"component"}><p>InfoTrip</p></div>
                </div>
            </div>
        </>
    );
}

export default AddOfferToTripPage;
