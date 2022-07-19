import {customPageSizeOptions, paginationDefaultFilter} from "../../constants/pagination";
import React, {useEffect, useState} from "react";
import {getUserCarsByEmail} from "../../services/cars";
import Header from "../navigation/header";
import MyCar from "../myCars/myCar";
import {Pagination, Result} from "antd";
import { useLocation } from 'react-router-dom';

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
}

function UserCarsPage() {
    const location = useLocation();
    const userData = location.state;

    const [cars, setCars] = useState();

    useEffect( () => {
        async function fetchData(){
            setCars(await getUserCarsByEmail(paginationFilterModel, userData.email));
        }

        fetchData();
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;
        setCars(await getUserCarsByEmail(paginationFilterModel, userData.email));
    };

    return (
        <div className="userCarsBody">
            <Header />

            <p className="title">{userData.name}'s cars</p>

            {cars != null ?
                <div className="cars-container">
                    {cars.items.map((car) =>
                        <MyCar info={car} />
                    )}
                    <Pagination
                        onChange={onPaginationChange}
                        total={cars.totalItems}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                        pageSizeOptions={customPageSizeOptions}
                        defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE}
                    />
                </div>
                :
                <Result
                    status="404"
                    title="Looks like user hasn't added any car yet."
                />
            }
        </div>
    );
}

export default UserCarsPage;
