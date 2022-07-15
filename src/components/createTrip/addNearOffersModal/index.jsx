import React, {useEffect, useState} from "react";
import {Button, Modal, Table} from "antd";
import {getOffersNearRout} from "../../../services/offers";
import {offerRoles} from "../../../constants/offerRoles";

function AddNearOfferModal(props) {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const offers = await getOffersNearRout(props.tripId);
            for (let i = 0; i < offers.length; i++) {
                offers[i] = {...offers[i], key: offers[i].pointId};
            }
            //Retrieves all offers except those that have already been selected.
            setOffers(offers.filter((value) => {
                const even = (element) => element.pointId === value.pointId
                return !props.offers.some(even);
            }));
        }

        fetchData();
    }, [])

    function swapDaysAndMonths(date) {
        if (!Date.parse(date)) {
            const splitCreationDate = date.split('.');
            const day = splitCreationDate[0];

            splitCreationDate[0] = splitCreationDate[1];
            splitCreationDate[1] = day;

            const finalDate = splitCreationDate.join('.');

            if (!Date.parse(finalDate)) {
                return finalDate;
            } else {
                return date;
            }
        }
        return date;
    }

    const offerColumns = [
        {
            title: 'Settlement',
            dataIndex: 'settlement',
            filterMultiple: false,
            onFilter: (value, record) => record.settlement.indexOf(value) === 0,
            sorter: (a, b) => a.settlement.length - b.settlement.length,
        },
        {
            title: 'Start Date',
            dataIndex: 'creationDate',
            sorter: (a, b) => Date.parse(swapDaysAndMonths(a.creationDate)) - Date.parse(swapDaysAndMonths(b.creationDate))
        },
        {
            title: 'Weight',
            dataIndex: 'goodsWeight',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Goods',
            dataIndex: 'goodCategoryName',
            filterMultiple: false,
            onFilter: (value, record) => record.goodCategoryName.indexOf(value) === 0,
            sorter: (a, b) => a.goodCategoryName.length - b.goodCategoryName.length,

        },
        {
            title: 'Role',
            dataIndex: 'creatorRoleName',
            filters:
                [
                    {
                        text: offerRoles.RECIPIENT,
                        value: offerRoles.RECIPIENT
                    },
                    {
                        text: offerRoles.SENDER,
                        value: offerRoles.SENDER
                    }
                ],
            filterMultiple: false,
            onFilter: (value, record) => record.creatorRoleName.indexOf(value) === 0,
            sorter: (a, b) => a.creatorRoleName.length - b.creatorRoleName.length,
        }
    ];

    const close = () => {
        props.myClose();
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function onModalClose(event) {
        const data = [];
        const selectedOffers = []
        //Add the offers that have been chosen
        offers.map((item) => {
            const even = (element) => element === item.pointId
            if (selectedRowKeys.some(even)) {
                data.push(item);
                selectedOffers.push(item);
            }
        })
        //Add offers that have already been selected
        props.offers.map((item) => {
            data.push(item);
        })
        props.onModalClose(event, data, selectedOffers);
    }

    return (
        <Modal
            title="Near offers"
            visible={true}
            onCancel={() => close()}
            cancelButtonProps={{style: {display: 'none'}}}
            okButtonProps={{style: {display: 'none'}}}
            footer={null}
            width="90%"
            style={{height: "90%"}}
        >
            {offers != null ?
                <div>
                    <Table
                        columns={offerColumns}
                        dataSource={offers}
                        pagination={{
                            pageSize: 10,
                        }}
                        scroll={{
                            y: 240,
                        }}
                        rowSelection={rowSelection}
                    />
                </div>
                :
                <div>
                    <Table
                        columns={offerColumns}
                        dataSource={undefined}
                    />
                </div>
            }
            <Button onClick={(e) => {
                onModalClose(e);
            }}>Add offers</Button>
        </Modal>
    );
}

export default AddNearOfferModal;
