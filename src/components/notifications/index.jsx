import React, { useEffect, useState } from "react";
import Header from "../navigation/header";
import { Pagination, Result } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";
import { customPageSizeOptions } from "../../constants/pagination";
import {getNotificationsByUser} from "../../services/notifications";
import Notification from "./notification/index";

let paginationFilterModel = {
    pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
    pageSize: paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE
};

function NotificationsPage() {

    const [notifications, setNotifications] = useState();

    useEffect( () => {
        async function fetchData(){
            setNotifications(await getNotificationsByUser(paginationFilterModel));
        }

        fetchData();
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setNotifications(await getNotificationsByUser(paginationFilterModel));
    };

    return (
        <div className="userNotificationsBody">
            <Header />

            <p className="title">My notifications</p>

            {
                notifications != null ?
                    <div className="notifications-container">
                        {notifications.items.map((invite) =>
                            <Notification info={invite} />
                        )}
                        <Pagination
                            onChange={onPaginationChange}
                            total={notifications.totalItems}
                            showSizeChanger
                            showTotal={(total) => `Total ${total} items`}
                            pageSizeOptions={customPageSizeOptions}
                            defaultPageSize={paginationDefaultFilter.DEFAULT_SMALL_PAGE_SIZE}
                        />
                    </div>
                    :
                    <Result
                        status="404"
                        title="Looks like you don`t have any notifications yet."
                    />
            }
        </div>
    );
}

export default NotificationsPage
