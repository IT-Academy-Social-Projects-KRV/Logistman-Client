import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { getUserCars } from "../../services/carService";
import Header from "../navigation/header";

function UserCarsPage() {

    // for table rendering

    const columns = [
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model'
        },
        {
            title: 'Load capacity',
            dataIndex: 'loadCapacity',
            key: 'loadCapacity'
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Registration number',
            dataIndex: 'registrationNumber',
            key: 'registrationNumber'
        }
    ];

    const additionalInfoColumns = [
        {
            key: '1',
            title: 'VIN',
            dataIndex: 'vin'
        },
        {
            key: '2',
            title: 'Technical passport',
            dataIndex: 'technicalPassport'
        }
    ];

    const tableProps = {
        expandedRowRender: record => (
            <Table
                className="expandedRowTable"
                columns={additionalInfoColumns}
                dataSource={record.additionalInfo}
                pagination={false}
            />
        )
    }

    //

    const [cars, setCars] = useState([]);

    useEffect(async () => {
        var cars = await getUserCars();

        var carKey = 1; // this is so that additional information is expanded only for the selected row, not all

        cars.map((car, index) => {
            car.key = carKey;
            carKey = carKey + 1;

            car.additionalInfo = [ // form an array with additional information for the corresponding table
                {
                    key: 1,
                    vin: car.vin,
                    technicalPassport: car.technicalPassport
                }
            ]
        })

        setCars(cars);
    }, []);

    return (
        <div className="userCarsBody">
            <Header />

            <Table
                className="carsTable"
                {...tableProps}
                dataSource={cars}
                columns={columns}
                showSorterTooltip={true}
                pagination={false}
            />;
        </div>
    );
}

export default UserCarsPage;
