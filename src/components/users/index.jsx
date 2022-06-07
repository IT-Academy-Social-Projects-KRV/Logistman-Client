import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { Result } from "antd";
import User from "./user";
import Header from "../navigation/header";
import { Pagination } from 'antd';
import { paginationDefaultFilter } from "../../constants/pagination";

function ManageUsersPage() {

    let paginationFilterModel = {
        pageNumber: paginationDefaultFilter.DEFAULT_PAGE_NUMBER,
        pageSize: paginationDefaultFilter.DEFAULT_LARGE_PAGE_SIZE
    }

    const [users, setUsers] = useState();

    const updateUserInfo = async () => {
        setUsers(await getAllUsers());
    }

    useEffect(async () => {
        setUsers(await getAllUsers(paginationFilterModel));
    }, []);

    const onPaginationChange = async (page, pageSize) => {
        paginationFilterModel.pageNumber = page;
        paginationFilterModel.pageSize = pageSize;

        setUsers(await getAllUsers(paginationFilterModel));
    };

    return (
        <div className="usersPageBody">
            <Header />

            <p className="title">Manage users</p>

            {users != null ?
                <div className="users-container">
                    {users.items.map((user) =>
                        <User info={user} updateInfo={() => updateUserInfo()} />
                    )}
                    <Pagination
                        onChange={onPaginationChange}
                        total={users.totalItems}
                        showSizeChanger
                        showTotal={(total) => `Total ${total} items`}
                    />
                </div>
                :
                <Result
                    status="404"
                    title="There are no registered users yet!"
                />
            }
        </div>
    );
}

export default ManageUsersPage;
