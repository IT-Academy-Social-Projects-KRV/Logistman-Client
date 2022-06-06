import React from "react";
import { Card, Button } from "antd";
import user_icon from "../../../assets/images/user.png";
import email_icon from "../../../assets/images/email_icon.svg";

function User(data) {
    return (
        <Card className="userCard">
            <div className="userInformation">
                <div className="leftSide">
                    <img src={user_icon} className="userIcon" />
                    <p>{data.info.name} {data.info.surname}</p>
                </div>

                <div className="centerSide">
                    <img src={email_icon} className="emailIcon" />
                    <p>{data.info.email}</p>
                </div>

                <div className="rightSide">
                    <Button
                        className="detailsButton"
                        type="primary">
                        Details
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default User;
