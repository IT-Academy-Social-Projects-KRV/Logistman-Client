import React, { useEffect, useState } from "react";
import { getUserCars } from "../../services/cars";
import Header from "../navigation/header";
import Car from './car/car';
import { Result } from "antd";

function UserCarsPage() {

    const [cars, setCars] = useState([]);

    useEffect(async () => {
        setCars(await getUserCars());
    }, []);

    return (
        <div className="userCarsBody">
            <Header />

            <p className="title">My cars</p>

            {cars.length > 0 ?
                <div className="cars-container">
                    {cars.map((car) =>
                        <Car info={car} />
                    )}
                </div>
                :
                <Result
                    status="404"
                    title="Looks like you haven't created any car yet."
                />
            }
        </div>
    );
}

export default UserCarsPage;
