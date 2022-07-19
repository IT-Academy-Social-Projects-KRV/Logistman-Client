import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { getAllRoutes } from "../../services/trips";
import { Result } from "antd";
import UserRoute from "./route";
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
}

function RoutesPage() {

    const [routes, setRoutes] = useState();

    useEffect( () => {
        async function fetchData(){
            setRoutes(await getAllRoutes(paginationFilterModel));
        }

        fetchData();
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setRoutes(await getAllRoutes(paginationFilterModel));
    };

    return (
        <div className="routeBody">
            <Header />

            <p className="title">Routes</p>

            {routes != null ?
                <div className="routes-container">
                    {routes.items.map((route) =>
                        <UserRoute key={routes.items.indexOf(route) + 1} data={route} />
                    )}

                    <Pagination
                        onChange={onPaginationChange}
                        total={routes.totalItems}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                        pageSizeOptions={customPageSizeOptions}
                        defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE}
                    />
                </div>
                :
                <Result
                    status="404"
                    title="There is no any created routes."
                />
            }
        </div>
    );
}

export default RoutesPage;
