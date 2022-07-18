import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { AiOutlineMail, AiOutlineCar, AiOutlineEdit } from "react-icons/ai";
import user_icon from "../../../assets/images/user.png";
import EditUserInfoModal from "../../editUserInfoModal/index.jsx";
import { useHistory } from 'react-router-dom';
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";

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
        <IconContext.Provider value={{ className: 'icon' }}>
            <Card className="userCard">
                <div className="userInformation">
                    <div className="leftSide">
                        <img src={user_icon} className="userIcon" />
                        <p>{props.info.name} {props.info.surname}</p>
                    </div>

                    <div className="centerSide">
                        <AiOutlineMail size={DEFAULT_ICON_SIZE} />
                        <p>{props.info.email}</p>
                    </div>

                    <div className="rightSide">
                        <Tooltip color="#224957" title="Edit" placement="bottomRight" mouseEnterDelay={0.5}>
                            <AiOutlineEdit
                                size={DEFAULT_ICON_SIZE}
                                onClick={() => setIsModalOpen(true)}
                            />
                        </Tooltip>
                        <Tooltip color="#224957" title="View cars" placement="bottomRight" mouseEnterDelay={0.5}>
                            <AiOutlineCar
                                size={DEFAULT_ICON_SIZE}
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
        </IconContext.Provider>
    )
}

export default User;
