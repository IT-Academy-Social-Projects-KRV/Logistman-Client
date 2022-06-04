import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { getUserOffers } from "../../services/offers";
import { Result } from "antd";
import MyOffer from './myOffer/index';
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/paginationDefaultFilter";

function MyOffersPage() {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_PAGE_SIZE
    }

    const [offers, setOffers] = useState([]);

    useEffect(async () => {
        setOffers(await getUserOffers(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setOffers(await getUserOffers(paginationFilterModel));
    };
    
    if(offers == null)
    {
        return <Result
            status="404"
            title="Looks like you haven't created any offer yet."
        />
    }
        return (
            <div className="userOffersBody">
                <Header />
    
                <p className="title">My offers</p>
    
                {offers.length != 0 ?
                    <div className="offers-container">
                        {offers.items.map((offer) =>
                            <MyOffer info={offer} />
                        )}
                        <Pagination 
                            onChange={onPaginationChange} 
                            total={offers.totalItems} 
                            showSizeChanger 
                            showTotal={(total) => `Total ${total} items`}/>
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
