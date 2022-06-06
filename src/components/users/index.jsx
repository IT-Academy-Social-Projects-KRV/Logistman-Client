import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { Result } from "antd";
import User from "./user";
import Header from "../navigation/header";

function ManageUsersPage() {

    const [users, setUsers] = useState([]);

    useEffect(async () => {
        setUsers(await getAllUsers());
    }, []);

    return (
        <div className="usersPageBody">
            <Header />

            <p className="title">Manage users</p>

            {users.length > 0 ?
                <div className="users-container">
                    {users.map((user) =>
                        <User info={user} />
                    )}
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
