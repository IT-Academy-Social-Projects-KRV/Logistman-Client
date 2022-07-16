import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Pagination, Result } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import { getOffersInvites } from "../../services/invites";
import OfferInvite from './offerInvite/index';

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
};

function OffersInvitesPage() {

    const [invites, setInvites] = useState();

    useEffect(async () => {
        setInvites(await getOffersInvites(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setInvites(await getOffersInvites(paginationFilterModel));
    };

    return (
        <div className="userOffersInvitesBody">
            <Header />

            <p className="title">My offers invites</p>

            {
                invites != null ?
                    <div className="invites-container">
                        {invites.items.map((invite) =>
                            <OfferInvite info={invite} />
                        )}
                        <Pagination
                            onChange={onPaginationChange}
                            total={invites.totalItems}
                            showSizeChanger
                            showTotal={(total) => `Total ${total} items`}
                            pageSizeOptions={customPageSizeOptions}
                            defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE}
                        />
                    </div>
                    :
                    <Result
                        status="404"
                        title="Looks like you haven't had any offers' invites yet."
                    />
            }
        </div>
    );
}

export default OffersInvitesPage;
