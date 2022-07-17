import React, { useEffect, useState } from "react";
import {getTripOfferByUser} from "../../services/trips";
import Header from "../navigation/header";

function ConfirmGoodsDeliveryForDriver() {
    const[data,setData] = useState();

    useEffect(() => {
       async function fetchData(){
           setData(await getTripOfferByUser());
       }

        fetchData();
    },[])

    console.log("data", data);

    return(
        <div>
            <Header />
        </div>
    );
}

export default ConfirmGoodsDeliveryForDriver;
