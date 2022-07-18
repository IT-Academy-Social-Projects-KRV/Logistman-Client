import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Result } from "antd";
import { Pagination } from 'antd';
import { getAllRoutesByUser } from "../../services/trips";
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import MyRoute from "./myRoute";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
}

function MyRoutesPage() {

    const [routes, setRoutes] = useState();

    const updateRoutes = async() => {
        setRoutes(await getAllRoutesByUser(paginationFilterModel));
    }

    useEffect( () => {
        async function fetchData(){
            setRoutes(await getAllRoutesByUser(paginationFilterModel));
        }

        fetchData();
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setRoutes(await getAllRoutesByUser(paginationFilterModel));
    };

    return (
        <div className="myRoutesPageBody">
            <Header />

            <p className="title">My routes</p>

            {routes != null ?
                <div className="my-routes-container">
                    {routes.items.map((route) =>
                        <MyRoute
                            data={route}
                            updateRoute={() => updateRoutes()}
                        />
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
                    title="There are no routes created."
                />
            }
        </div>
    )
}

export default MyRoutesPage;
