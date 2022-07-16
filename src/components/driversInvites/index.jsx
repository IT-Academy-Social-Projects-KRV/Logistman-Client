import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Pagination, Result } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import DriversInvite from "./driversInvite";
import { getDriversInvites } from "../../services/invites";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_LARGE_PAGE_SIZE
}

function DriversInvitesPage() {

    const [invites, setInvites] = useState();

    useEffect(async () => {
        setInvites(await getDriversInvites(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setInvites(await getDriversInvites(paginationFilterModel));
    };

    return (
        <div className="userDriversInvitesBody">
            <Header />

            <p className="title">My drivers invites</p>

            {invites != null ?
                <div className="invites-container">
                    {invites.items.map((invite) =>
                        <DriversInvite data={invite} />
                    )}

                    <Pagination
                        onChange={onPaginationChange}
                        total={invites.totalPages}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                        pageSizeOptions={customPageSizeOptions}
                        defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE}
                    />
                </div>
                :
                <Result
                    status="404"
                    title="Looks like you haven't created any offer yet."
                />
            }
        </div>
    );
}

export default DriversInvitesPage;
