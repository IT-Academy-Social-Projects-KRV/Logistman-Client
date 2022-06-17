import React, { useState } from "react";
import {Card, Tooltip} from "antd";
import user_icon from "../../../assets/images/user.png";
import email_icon from "../../../assets/images/email_icon.svg";
import EditUserInfoModal from "../../editUserInfoModal/index.jsx";
import {CarFilled, EditOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router-dom';


function User(props) {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const moveToUserCars = () => {
        history.push({
            pathname: `/user-cars`,
            state: props.info
        });
    };

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
                    <Tooltip color="#224957" title="Edit" placement="bottomRight" mouseEnterDelay={0.5}>
                        <EditOutlined
                            className="detailsButton"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </Tooltip>
                    <Tooltip color="#224957" title="View cars" placement="bottomRight" mouseEnterDelay={0.5}>
                        <CarFilled
                            className="detailsButton"
                            onClick={() => moveToUserCars()}
                        />
                    </Tooltip>
                </div>
            </div>
            {isModalOpen && <EditUserInfoModal
                myClose={() => setIsModalOpen(false)}
                data={props.info}
                updateUserInfo={() => props.updateUserInfo()}
            />}
        </Card>
    )
}

export default User;
