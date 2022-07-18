import React, { useEffect, useState } from "react";
import { getUserCars } from "../../services/cars";
import Header from "../navigation/header";
import { Result } from "antd";
import MyCar from './myCar/index';
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
}

function MyCarsPage() {

    const [cars, setCars] = useState();

    const updateCars = async () => {
        setCars(await getUserCars(paginationFilterModel));
    }

    useEffect( () => {
        async function fetchData() {
            setCars(await getUserCars(paginationFilterModel));
        }

        fetchData();
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

            {cars != null ?
                <div className="cars-container">
                    {cars.items.map((car) =>
                        <MyCar
                            info={car}
                            updateCars={() => updateCars()}
                        />
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
                    title="Looks like you haven't created any car yet."
                />
            }
        </div>
    );
}

export default MyCarsPage;
