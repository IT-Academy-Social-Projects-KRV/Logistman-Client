import React, { useEffect, useState } from "react";
import { getUserProfileInfo } from '../../services/userService';
import Header from '../navigation/header';
import { Input, Layout } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function UserProfilePage() {

    const [userData, setUserData] = useState({});
    const [fullName, setFullName] = useState("Undefined");

    useEffect(async () => {
        setUserData(await getUserProfileInfo());
        setFullName(userData.name + ' ' + userData.surname);
    }, []);

    return (
        <Layout className="profilePageBody" >
            <Header />

            <Layout id="infoBlock">
                <div className="info">
                    <div className="infoName">
                        <p> Full name </p>
                    </div>
                    <div className="infoInput">
                        <Input value={userData.fullName} />
                    </div>
                </div>

                <div className="info">
                    <div className="infoName">
                        <p> Name </p>
                    </div>
                    <div className="infoInput">
                        <Input value={userData.name} />
                    </div>
                </div>

                <div className="info">
                    <div className="infoName">
                        <p> Surname </p>
                    </div>
                    <div className="infoInput">
                        <Input value={userData.surname} />
                    </div>
                </div>

                <div className="info">
                    <div className="infoName">
                        <p> Email </p>
                    </div>
                    <div className="infoInput">
                        <Input value={fullName.email} />
                    </div>
                </div>

                <div className="info">
                    <div className="infoName">
                        <p> Is your email confirmed </p>
                    </div>
                    <div className="infoInput">
                        {userData.isEmailConfirmed ?
                            <CheckOutlined /> :
                            <CloseOutlined />
                        }
                    </div>
                </div>
            </Layout>

        </Layout >
    );
}

export default UserProfilePage;
