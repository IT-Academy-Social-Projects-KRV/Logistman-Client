import React, {useEffect} from 'react';
import {Table, Collapse, Popconfirm, message} from 'antd';
import {useState} from 'react';
import AddNearOfferModal from "../addNearOffersModal";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import {MenuOutlined} from '@ant-design/icons';
import {CaretRightOutlined, CaretDownOutlined} from "@ant-design/icons";
import {offerRoles} from "../../../constants/offerRoles";
import moment from "moment";
import {errorMessage} from "../../../services/alerts";
import {tripsMessages} from "../../../constants/messages/trips";

const {Panel} = Collapse;
const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

const DragHandle = SortableHandle(() => (
    <MenuOutlined
        style={{
            cursor: 'grab',
            color: '#999',
        }}
    />
));

const AddOfferToTrip = (props) => {
    const pointColumns = [
        {
            title: 'Sort',
            dataIndex: 'sort',
            key: 'sort',
            render: (_, record) =>
                (
                    record.offerId != null ?
                        <DragHandle/>
                        :
                        <p></p>
                )
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Settlement',
            dataIndex: 'settlement',
            key: 'settlement'
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region'
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country'
        },
        {
            title: 'Postcode',
            dataIndex: 'postcode',
            key: 'postcode'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                record.offerId != null ?
                    <Popconfirm title="Sure to delete?" onConfirm={() => {
                        if (record.offerId != null) {
                            handlePointDelete(record.key);
                            handleOfferDelete(record.key);
                            handleDecreaseTotalWeight(record);
                        }
                    }}>
                        <a>Delete</a>
                    </Popconfirm>
                    :
                    <a onClick={() => {
                        setPointPosition(record);
                        setIsModalOpen(true);
                    }}>Add offer</a>
            )
        }
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const [pointPosition, setPointPosition] = useState();
    const [points, setPoints] = useState(props.points);
    const [totalWeight, setTotalWeight] = useState(0);

    useEffect(() => {
        setDataOffers();
        setDataTotalWeight();

        props.creatTrip(setDataForCreatOffer());
        props.getPointsOffers(points);
    }, [])

    const setDataOffers = () => {
        setOffers(points.filter((item) => item.offerId != null));
    }

    const setDataTotalWeight = () => {
        const weight = points.reduce((sum, item) => {
            if (item.creatorRoleName === offerRoles.SENDER) {
                return sum + item.goodsWeight;
            } else {

                return sum;
            }
        }, 0);

        props.totalWeight(weight);
        setTotalWeight(weight);
    }

    const setDataForCreatOffer = (data) => {
        const creatTripPoints = {
            pointsTrip: []
        };
        let dataPoints = [];

        data != null ?
            dataPoints = data
            :
            dataPoints = points

        for (let i = 0; i < dataPoints.length; i++) {
            creatTripPoints.pointsTrip.push({
                id: dataPoints[i].pointId,
                offerId: dataPoints[i].offerId,
                order: i + 1
            });
        }

        return creatTripPoints;
    }

    const handleDecreaseTotalWeight = (record) => {
        if (record.creatorRoleName === offerRoles.SENDER) {
            const deleteWeight = totalWeight - record.goodsWeight;

            props.totalWeight(deleteWeight);
            setTotalWeight(deleteWeight);
        }
    }

    const handlePointDelete = (key) => {
        const dataSource = points;
        const filteredPoints = dataSource.filter(item => item.key !== key);

        setPoints(filteredPoints);
        props.creatTrip(setDataForCreatOffer(filteredPoints));
    }

    const handleOfferDelete = (key) => {
        const dataSource = offers;
        setOffers(dataSource.filter(item => item.key !== key));
    }

    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const handlerIncrementTotalWeight = (selectedOffers) => {
        let weight = selectedOffers.reduce((sum, item) => {
            if (item.creatorRoleName === offerRoles.SENDER) {

                return sum + item.goodsWeight;
            } else {

                return sum;
            }
        }, 0);

        props.totalWeight(weight + totalWeight);
        setTotalWeight(weight + totalWeight);
    }

    const handlerSetPointsOffers = (selectedOffers, data) => {
        let finalPoints = [];
        const pointIndex = points.indexOf(pointPosition);
        const beforePoints = points.slice(0, pointIndex);
        const afterPoints = points.slice(pointIndex);

        finalPoints = beforePoints.concat(selectedOffers);
        finalPoints = finalPoints.concat(afterPoints);

        if (isCorectPositionOffer(finalPoints)) {

            return;
        }

        setPoints(finalPoints);
        setOffers(data);
        setDataBack(finalPoints);
    }

    const handleCloseModal = (event, data, selectedOffers) => {
        handlerSetPointsOffers(selectedOffers, data);
        handlerIncrementTotalWeight(selectedOffers);

        setIsModalOpen(false);
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        if (oldIndex !== newIndex) {
            const newPoint = arrayMoveImmutable(
                points.slice(),
                oldIndex,
                newIndex)
                .filter((el) => !!el);

            if (isCorectPositionOffer(newPoint)) {

                return;
            }

            setPoints(newPoint);
            setDataBack(newPoint);
        }
    }

    const isCorectPositionOffer = (data) => {
        const isCorectPosinion = data[0].offerId != null ||
            data[data.length - 1].offerId != null;

        if (isCorectPosinion) {
            message.warning(tripsMessages.TEXT_OFFER_POSITION);

            return isCorectPosinion;
        }

        return isCorectPosinion;
    }

    const setDataBack = (data) => {
        props.creatTrip(setDataForCreatOffer(data));
        props.getPointsOffers(data);
    }

    const draggableContainer = (props) => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const draggableBodyRow = ({className, style, ...restProps}) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = points.findIndex((x) => x.key === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    }

    return (
        <div className="pointsComponent">
            <p>Points</p>

            <Table
                className="tablePoints"
                columns={pointColumns}
                dataSource={points}
                rowKey="key"
                expandable={{
                    expandedRowRender: (record) => (
                        record.offerId != null ?
                            <div className="expandedRow">
                                <div className="offerInfo">
                                    <p>Start Date: {record.startDate}</p>
                                    <p>Goods Weight: {record.goodsWeight} kg</p>
                                    <p>Good Category: {record.goodCategoryName}</p>
                                    <p>Role: {record.creatorRoleName}</p>
                                </div>

                                <Collapse ghost>
                                    <Panel className="description" header="Description" key="1">
                                        <p>
                                            {record.description}
                                        </p>
                                    </Panel>
                                </Collapse>
                            </div>
                            :
                            <></>
                    ),
                    expandIcon: ({expanded, onExpand, record}) =>
                        expanded ? (
                            record.offerId != null ?
                                <CaretDownOutlined onClick={e => {
                                    forceUpdate();
                                    return onExpand(record, e)
                                }}/>
                                :
                                <></>
                        ) : (
                            record.offerId != null ?
                                <CaretRightOutlined onClick={e => onExpand(record, e)}/>
                                :
                                <></>
                        )
                }}
                components={{
                    body: {
                        wrapper: draggableContainer,
                        row: draggableBodyRow,
                    },
                }}
                pagination={{
                    pageSize: 10,
                    position: ["none", "bottomCenter"]
                }}
            />
            {isModalOpen &&
                <AddNearOfferModal
                    tripId={props.tripId}
                    offers={offers}
                    myClose={() => setIsModalOpen(false)}
                    onModalClose={handleCloseModal}
                />}
        </div>
    );
}

export default AddOfferToTrip;
