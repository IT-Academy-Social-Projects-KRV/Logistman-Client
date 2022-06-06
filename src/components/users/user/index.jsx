import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import user_icon from "../../../assets/images/user.png";
import email_icon from "../../../assets/images/email_icon.svg";
import EditUserInfoModal from "../../editUserInfoModal/index.jsx";

function User(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Card className="userCard">
            <div className="userInformation">
                <div className="leftSide">
                    <img src={user_icon} className="userIcon" />
                    <p>{props.info.name} {props.info.surname}</p>
                </div>

                <div className="centerSide">
                    <img src={email_icon} className="emailIcon" />
                    <p>{props.info.email}</p>
                </div>

                <div className="rightSide">
                    <Button
                        className="detailsButton"
                        type="primary"
                        onClick={() => setIsModalOpen(true)}>
                        Details
                    </Button>
                </div>
            </div>
            {isModalOpen && <EditUserInfoModal
                myClose={() => setIsModalOpen(false)}
                data={props.info}
                updateUserInfo={() => props.updateInfo()}
            />}
        </Card>
    )
}

export default User;
