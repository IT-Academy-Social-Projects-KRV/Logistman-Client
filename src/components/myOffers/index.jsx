import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { getUserOffers } from "../../services/offers";
import { Result } from "antd";
import MyOffer from './myOffer/index';
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";

function MyOffersPage() {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
    }

    const [offers, setOffers] = useState();

    useEffect(async () => {
        setOffers(await getUserOffers(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setOffers(await getUserOffers(paginationFilterModel));
    };

    return (
        <div className="userOffersBody">
            <Header />

            <p className="title">My offers</p>

            {offers != null ?
                <div className="offers-container">
                    {offers.items.map((offer) =>
                        <MyOffer info={offer} />
                    )}
                    <Pagination
                        onChange={onPaginationChange}
                        total={offers.totalItems}
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

export default MyOffersPage;
