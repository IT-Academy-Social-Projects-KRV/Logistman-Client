import React, {useState, useEffect} from 'react';
import Header from "../navigation/header";
import {useLocation} from "react-router-dom";
import AddOfferToTrip from "./offersPointTrip";
import UserRoute from "./infoTrip";
import {getTripById} from "../../services/trips";
import {Result} from "antd";
import TripMap from "./Map";

function ManageTripPage() {
    const location = useLocation();
    const userData = location.state;

    const [dataTrip, setDataTrip] = useState();
    const [allPoints,setAllPoints] = useState();
    const [totalWeight, setTotalWeight] = useState(0);
    const [dataForCreatTrip, setDataForCreatTrip] = useState();
    const [distance, setDistance] = useState();

    useEffect(() => {
        async function fetchData() {
            const data = await getTripById(userData.data.id);

            for (let i = 0; i < data.points.length; i++) {
                data.points[i] = {...data.points[i], key: data.points[i].pointId};
            }

            data.points.sort((a, b) => a.order - b.order);
            setDataTrip(data);
        }

        fetchData();
    }, []);

    const getWeight = weight => {setTotalWeight(weight);}
    const getDataForCreatTrip = data => {setDataForCreatTrip(data);}
    const getPointsOffers = pointsOffers => {setAllPoints(pointsOffers);}
    const getDistance = distance => {setDistance(distance);}

    return (
        <>
            <Header/>

            <div className="createTripBody">
                <p className="title">Manage trip</p>
                {dataTrip != null ?
                    <div className="meanBody">
                        <div className="infoComponent">
                            {userData != null ?
                                <UserRoute
                                    dataTrip={dataTrip}
                                    totalWeigth={totalWeight}
                                    creatTripData={dataForCreatTrip}
                                    distance={distance}
                                />
                                :
                                <p>Trip not found</p>
                            }
                            <div className="mapComponent">
                                <TripMap
                                points={allPoints}
                                tripId={dataTrip.id}
                                getDistance={getDistance}
                                />
                            </div>
                        </div>

                        <div className="component-block">
                            <AddOfferToTrip
                                tripId={dataTrip.id}
                                points={dataTrip.points}
                                totalWeight={getWeight}
                                creatTrip={getDataForCreatTrip}
                                expirationDateTrip={dataTrip.expirationDate}
                                getPointsOffers={getPointsOffers}
                            />
                        </div>
                    </div>
                    :
                    <Result
                        status="404"
                        title="There is no route information."
                    />
                }

            </div>

        </>
    );
}

export default ManageTripPage;
