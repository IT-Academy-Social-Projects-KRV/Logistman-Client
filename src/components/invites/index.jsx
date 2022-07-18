import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Pagination, Result } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import Invite from "./invite";
import { getInvites } from "../../services/invites";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_LARGE_PAGE_SIZE
}

function InvitesPage() {

    const [invites, setInvites] = useState();

    useEffect(async () => {
        setInvites(await getInvites(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setInvites(await getInvites(paginationFilterModel));
    };

    return (
        <div className="userInvitesBody">
            <Header />

            <p className="title">My invites</p>

            {invites != null ?
                <div className="invites-container">
                    {invites.items.map((invite) =>
                        <Invite data={invite} />
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

export default InvitesPage;
