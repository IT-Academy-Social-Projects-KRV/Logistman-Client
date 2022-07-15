import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Result } from "antd";
import { Pagination } from 'antd';
import { getAllRoutesByUser } from "../../services/trips";
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import MyRoute from "./myRoute";

function MyRoutesPage() {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
    }

    const [routes, setRoutes] = useState();

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
                        <MyRoute data={route} />
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
    )
}

export default MyRoutesPage;
