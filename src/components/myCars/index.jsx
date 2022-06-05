import React, { useEffect, useState } from "react";
import { getUserCars } from "../../services/cars";
import Header from "../navigation/header";
import { Result } from "antd";
import MyCar from './myCar/index';
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/paginationDefaultFilter";
import { customPageSizeOptions } from "../../constants/paginationDefaultFilter";

function MyCarsPage() {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
    }

    const [cars, setCars] = useState([]);

    useEffect(async () => {
        setCars(await getUserCars(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setCars(await getUserCars(paginationFilterModel));
    };

    return (
        <div className="userCarsBody">
            <Header />

            <p className="title">My cars</p>

            {cars.length != 0 ?
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
                        defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE} />
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

export default MyCarsPage;
