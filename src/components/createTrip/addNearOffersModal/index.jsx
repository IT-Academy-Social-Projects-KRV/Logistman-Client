import React, {useEffect, useState} from "react";
import {Button, Modal, Table} from "antd";
import {getOffersNearRout} from "../../../services/offers";
import {offerRoles} from "../../../constants/offerRoles";

function AddNearOfferModal(props) {
    const [offers, setOffers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const offers = props.nearOffers;

            for (let i = 0; i < offers.length; i++) {
                offers[i] = {...offers[i], key: offers[i].pointId};
            }
            //Retrieves all offers except those that have already been selected.
            setOffers(offers.filter((value) => {
                const filter = (element) => element.pointId === value.pointId;

                return !props.offers.some(filter);
            }));
        }

        fetchData();
    }, [])

    const offerColumns = [
        {
            title: 'Settlement',
            dataIndex: 'settlement',
            filterMultiple: false,
            onFilter: (value, record) => record.settlement.indexOf(value) === 0,
            sorter: (a, b) => a.settlement.length - b.settlement.length
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate'
        },
        {
            title: 'Weight',
            dataIndex: 'goodsWeight',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Goods',
            dataIndex: 'goodCategoryName',
            filterMultiple: false,
            onFilter: (value, record) => record.goodCategoryName.indexOf(value) === 0,
            sorter: (a, b) => a.goodCategoryName.length - b.goodCategoryName.length
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
            sorter: (a, b) => a.creatorRoleName.length - b.creatorRoleName.length
        }
    ];

    const close = () => {
        props.myClose();
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onModalClose = (event) => {
        const data = [];
        const selectedOffers = [];

        //Add the offers that have been chosen
        offers.map((item) => {
            const filter = (element) => element === item.pointId;

            if (selectedRowKeys.some(filter)) {
                data.push(item);
                selectedOffers.push(item);
            }
        });

        //Add offers that have already been selected
        props.offers.map((item) => {
            data.push(item);
        });

        props.onModalClose(event, data, selectedOffers);
    }

    return (
        <Modal
            className="offersModal"
            title="Near offers"
            visible={true}
            onCancel={() => close()}
            footer={null}
            width="90%"
        >
            {offers != null ?
                <div>
                    <Table
                        columns={offerColumns}
                        dataSource={offers}
                        pagination={{
                            pageSize: 10,
                            position: ["none", "bottomCenter"]
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
