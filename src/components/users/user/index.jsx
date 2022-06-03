import React from "react";
import { Card, Tag } from "antd";
import {
    CalendarOutlined,
    EnvironmentOutlined,
    TagOutlined
} from "@ant-design/icons";
import moment from 'moment';
import Text from "antd/es/typography/Text";
import user_icon from "../../../assets/images/user.png";
import email_icon from "../../../assets/images/email_icon.png";

function User(data) {
    return (
        // <div>
        //     <p>{data.info.name} {data.info.surname} {data.info.email}</p>
        // </div>
        <Card className="userCard">
            {/* <p>{data.info.name} {data.info.surname} {data.info.email}</p> */}
            <div className="userInformation">
                <div className="leftSide">
                    <div className="field-group">
                        <div className="cardField">
                            <img src={user_icon} className="userIcon" />
                            <p>{data.info.name} {data.info.surname}</p>
                        </div>
                    </div>
                </div>

                <div className="centerSide">
                    <div className="field-group">
                        <div className="cardField">
                            <img src={email_icon} className="emailIcon" />
                            <p>{data.info.email}</p>
                        </div>
                    </div>
                </div>
            </div>

        </Card>
    )
}

export default User;
