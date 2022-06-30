import React, {useEffect} from 'react';
import {Table} from 'antd';
import update from 'immutability-helper';
import {useCallback, useRef, useState} from 'react';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {getOffersNearRout} from "../../../services/offers";
import {paginationDefaultFilter} from "../../../constants/pagination";

const offerColumns = [
    {
        title: 'Settlement',
        dataIndex: 'settlement'
    },
    {
        title: 'Creation Date',
        dataIndex: 'creationDate'
    },
    {
        title: 'Weight',
        dataIndex: 'goodsWeight'
    },
    {
        title: 'Goods',
        dataIndex: 'goodCategoryName',
    },
    {
        title: 'Role',
        dataIndex: 'creatorRoleName',
    },
];

const offerData = [];

for (let i = 0; i < 100; i++) {
    offerData.push({
        key: i,
        expirationDate: `Edward King ${i}`,
        weight: 32,
        goods: `good no. ${i}`,
    });
}

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({index, moveRow, className, style, ...restProps}) => {
    const ref = useRef(null);
    const [{isOver, dropClassName}, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const {index: dragIndex} = monitor.getItem() || {};

            if (dragIndex === index) {
                return {};
            }

            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        type,
        item: {
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{
                cursor: 'move',
                ...style,
            }}
            {...restProps}
        />
    );
};

const columns = [
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Settlement',
        dataIndex: 'settlement',
        key: 'settlement',
    },
    {
        title: 'Region',
        dataIndex: 'region',
        key: 'region',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Postcode',
        dataIndex: 'postcode',
        key: 'postcode',
    }
];

const AddOfferToTrip = () => {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
    }

    const [offers, setOffers] = useState();
    useEffect(() => {
        async function fetchData() {
            setOffers(await getOffersNearRout(paginationFilterModel, 1));
        }

        fetchData();
        console.log(offers);

    }, [])

    const [data, setData] = useState([
        {
            key: '1',
            address: 'вулиця Східна, 32',
            settlement: 'Дніпро',
            region: 'Дніпропетровська область',
            country: 'Україна',
            postcode: '49000'
        },
        {
            key: '2',
            address: 'вулиця Садова, 1',
            settlement: 'Нікольське',
            region: 'Донецька область',
            country: 'Україна',
            postcode: '87000'
        },
        {
            key: '3',
            address: 'вулиця Чкалова, 20',
            settlement: 'Кропивницький',
            region: 'Кіровоградська область',
            country: 'Україна',
            postcode: '25000'
        },
    ]);
    const components = {
        body: {
            row: DraggableBodyRow,
        },
    };
    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = data[dragIndex];
            setData(
                update(data, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                }),
            );
        },
        [data],
    );

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="pointsComponent">
                <Table
                    columns={columns}
                    dataSource={data}
                    components={components}
                    onRow={(_, index) => {
                        const attr = {
                            index,
                            moveRow,
                        };
                        return attr;
                    }}
                    pagination={{
                        pageSize: 10,
                    }}
                    scroll={{
                        y: 240,
                    }}
                /><
            /div>

            {offers != null ?
                <div className="offerComponent">
                    <Table
                        columns={offerColumns}
                        dataSource={offers.items}
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
                <div className="offerComponent">
                    <Table
                        columns={offerColumns}
                        dataSource={undefined}
                    />
                </div>
            }
        </DndProvider>);
};

export default AddOfferToTrip;