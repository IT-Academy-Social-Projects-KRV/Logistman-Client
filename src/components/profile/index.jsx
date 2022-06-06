import React, { useEffect, useState } from "react";
import { editUserInfo, getUserProfileInfo } from '../../services/users';
import Header from '../navigation/header';
import { Button, Form, Input, Layout } from 'antd';
import { CheckOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { confirmMessage, errorMessage } from "../../services/alerts";
import { generalErrorMessages } from "../../constants/messages/general";
import { inputValidationErrorMessages } from "../../constants/messages/inputValidationErrors";
import { userErrorMessages } from "../../constants/messages/user";
import InputRules from "../../constants/inputRules";
import AddNewCarModal from './../addNewCarModal/index';
import { userRoles } from "../../constants/userRoles";
import { store } from "../../store";

function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [temporaryFullName, setTemporaryFullName] = useState({});
    const [userData, setUserData] = useState(undefined);
    let role = store.getState().authReducer.role;

    useEffect(async () => {
        if (userData === undefined) {
            let result = await getUserProfileInfo();

            setUserData(result);
            setTemporaryFullName({
                name: result.name,
                surname: result.surname
            });
        }
    });

    const onFinishFailed = () => {
        errorMessage(
            userErrorMessages.EDIT_USER_PROFILE_BLOCKED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    const onFinish = (values) => {
        confirmMessage().then((result) => {
            if (result) {

                if (userData.name !== values.name ||
                    userData.surname !== values.surname ||
                    userData.email !== values.email) {

                    editUserInfo(values).then((result) => {
                        if (result) {
                            setUserData(values);
                        }
                    });
                } else {
                    errorMessage(
                        userErrorMessages.EDIT_USER_PROFILE_NOT_CHANGE,
                        generalErrorMessages.CHANGE_SOMETHING_TO_SAVE
                    );
                }
            }
        });
    };

    const onNameChange = (e) => {
        setTemporaryFullName({
            ...temporaryFullName,
            name: e.target.value
        });
    };

    const onSurnameChange = (e) => {
        setTemporaryFullName({
            ...temporaryFullName,
            surname: e.target.value

        });
    };

    if (userData === undefined) {
        return <>Loading...</>;
    }
    return (
        <Layout className="profilePageBody">
            <Header />

            <Layout id="infoBlock">
                <div className="info">
                    <div className="infoName">
                        <p>Full name</p>
                    </div>

                    <div>
                        <p>{temporaryFullName?.name + ' ' + temporaryFullName?.surname}</p>
                    </div>
                </div>

                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className="info">
                        <div className="infoName">
                            <p>Name</p>
                        </div>

                        <div className="inputBlock">
                            <Form.Item className="formItem" name="name"
                                initialValue={userData?.name}
                                rules={[
                                    InputRules.latinLetters(
                                        inputValidationErrorMessages.NOT_VALID_NAME
                                    ),
                                    InputRules.lengthRange(
                                        2,
                                        50,
                                        userErrorMessages.USER_NAME_LENGTH_RANGE
                                    ),
                                    InputRules.required(
                                        inputValidationErrorMessages.EMPTY_NAME
                                    )
                                ]}
                            >
                                <Input onChange={(e) => {
                                    onNameChange(e)
                                }} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p>Surname</p>
                        </div>

                        <div className="inputBlock">

                            <Form.Item className="formItem" name="surname"
                                initialValue={userData?.surname}
                                rules={[
                                    InputRules.latinLetters(
                                        inputValidationErrorMessages.NOT_VALID_SURNAME
                                    ),
                                    InputRules.lengthRange(
                                        2,
                                        50,
                                        userErrorMessages.USER_NAME_LENGTH_RANGE
                                    ),
                                    InputRules.required(
                                        inputValidationErrorMessages.EMPTY_SURNAME
                                    )
                                ]}
                            >
                                <Input onChange={(e) => {
                                    onSurnameChange(e)
                                }} />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p>Email</p>
                        </div>

                        <div className="inputBlock">

                            <Form.Item className="formItem" name="email"
                                initialValue={userData?.email}
                                rules={[
                                    InputRules.specificType(
                                        "email",
                                        inputValidationErrorMessages.NOT_VALID_EMAIL
                                    ),
                                    InputRules.required(
                                        inputValidationErrorMessages.EMPTY_EMAIL
                                    )
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p>Is your email confirmed</p>
                        </div>

                        <div className="infoInput">
                            {userData?.emailConfirmed ?
                                <CheckOutlined /> :
                                <CloseOutlined />
                            }
                        </div>
                    </div>

                    <div className="blockButton">

                        {role == userRoles.USER ?
                            <Button type="primary"
                                className="addItemButton"
                                icon={<PlusCircleOutlined />}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Add car
                            </Button>
                            : 
                            <></>
                        }

                        <Button
                            htmlType={"submit"}
                            type="primary"
                        >
                            Save
                        </Button>

                        {isModalOpen && <AddNewCarModal
                            myClose={() => setIsModalOpen(false)} />}
                    </div>
                </Form>
            </Layout>
        </Layout>
    );
}

export default ProfilePage;
