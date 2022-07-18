import React, {useEffect, useState} from "react";
import Header from "../navigation/header";
import {customPageSizeOptions, paginationDefaultFilter} from "../../constants/pagination";
import {getOffersToConfirm} from "../../services/offers";
import {Pagination, Result} from "antd";
import OfferToConfirm from "./offerToConfirm";

function GoodsDeliveryConfirmationPage() {
    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
    }

    const [offers, setOffers] = useState();

    const updateOffers = async () => {
        setOffers(await getOffersToConfirm(paginationFilterModel));
    }

    useEffect(() => {
        async function fetchData() {
            setOffers(await getOffersToConfirm(paginationFilterModel));
        }

        fetchData();
    }, [paginationFilterModel]);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        await updateOffers();
    };

    return (
        <div className="userOffersBody">
            <Header/>

            <p className="title">Confirm goods delivery</p>

            {offers != null ?
                <div className="offers-container">
                    {offers.items.map((offer, key) =>
                        <OfferToConfirm
                            info={offer}
                            updateOffers={() => updateOffers()}
                        />
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
                    title="Looks like any of your offers aren't taking part in any active trip."
                />
            }
        </div>
    )
}

export default GoodsDeliveryConfirmationPage;
