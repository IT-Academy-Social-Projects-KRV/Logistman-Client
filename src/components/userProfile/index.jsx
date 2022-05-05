import React from "react";
import { getUserProfileInfo } from '../../services/userService';
import Header from '../navigation/header';
import { Input, Layout } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

class UserProfilePage extends React.Component {

    state = {
        profileInfo: {},
        fullName: ""
    }

    async componentDidMount() {
        this.setState({
            profileInfo: await getUserProfileInfo()
        }, () => {
            this.setState({
                fullName: this.state.profileInfo.name + ' ' + this.state.profileInfo.surname
            });
        });
    }

    render() {
        const { profileInfo } = this.state;

        return (
            <Layout className="profilePageBody" >
                <Header />

                <Layout id="infoBlock">
                    <div className="info">
                        <div className="infoName">
                            <p> Full name </p>
                        </div>
                        <div className="infoInput">
                            <Input value={this.state.fullName} />
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Name </p>
                        </div>
                        <div className="infoInput">
                            <Input value={profileInfo.name} />
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Surname </p>
                        </div>
                        <div className="infoInput">
                            <Input value={this.state.profileInfo.surname} />
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Email </p>
                        </div>
                        <div className="infoInput">
                            <Input value={profileInfo.email} />
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Is your email confirmed </p>
                        </div>
                        <div className="infoInput">
                            {profileInfo.isEmailConfirmed ?
                                <CheckOutlined /> :
                                <CloseOutlined />
                            }
                        </div>
                    </div>
                </Layout>

            </Layout >
        );
    }
}

export default UserProfilePage;
