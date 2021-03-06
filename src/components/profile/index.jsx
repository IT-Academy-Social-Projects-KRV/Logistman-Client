import React, {useEffect, useState} from "react";
import {editUserInfo, getUserProfileInfo, deleteUser} from '../../services/users';
import Header from '../navigation/header';
import { Button, Form, Input, Layout } from 'antd';
import { CheckOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { confirmMessage, errorMessage } from "../../services/alerts";
import { generalMessages } from "../../constants/messages/general";
import { inputValidationErrorMessages } from "../../constants/messages/inputValidationErrors";
import { userMessages } from "../../constants/messages/users";
import InputRules from "../../constants/inputRules";
import AddNewCarModal from './../addNewCarModal/index';
import {userRoles} from "../../constants/userRoles";
import {store} from "../../store";
import { confirmDeleteMessage } from "../../services/alerts";

function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [temporaryFullName, setTemporaryFullName] = useState({});
    const [userData, setUserData] = useState(undefined);

    let role = store.getState().authReducer.role;

    useEffect( () => {
        async function fetchData() {
            if (userData === undefined) {
                let result = await getUserProfileInfo();

                setUserData(result);
                setTemporaryFullName({
                    name: result.name,
                    surname: result.surname
                });
            }
        }

        fetchData();
    });

    const deleteProfile = async () => {
        var result = await confirmDeleteMessage();

        if (result) {
            deleteUser();
        }
    }

    const onFinishFailed = () => {
        errorMessage(
            userMessages.EDIT_USER_PROFILE_BLOCKED,
            generalMessages.CORRECT_ALL_COMMENTS
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
                        userMessages.EDIT_USER_PROFILE_NOT_CHANGE,
                        generalMessages.CHANGE_SOMETHING_TO_SAVE
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
            <Header/>

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
                                        userMessages.USER_NAME_LENGTH_RANGE
                                    ),
                                    InputRules.required(
                                        inputValidationErrorMessages.EMPTY_NAME
                                    )
                                ]}
                            >
                                <Input onChange={(e) => {
                                    onNameChange(e)
                                }}/>
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
                                        userMessages.USER_NAME_LENGTH_RANGE
                                    ),
                                    InputRules.required(
                                        inputValidationErrorMessages.EMPTY_SURNAME
                                    )
                                ]}
                            >
                                <Input onChange={(e) => {
                                    onSurnameChange(e)
                                }}/>
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
                                <Input/>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p>Is your email confirmed</p>
                        </div>

                        <div className="infoInput">
                            {userData?.emailConfirmed ?
                                <CheckOutlined/> :
                                <CloseOutlined/>
                            }
                        </div>
                    </div>

                    <div className="blockButton">

                        {role == userRoles.USER ?
                            <Button type="primary"
                                    className="addItemButton"
                                    icon={<PlusCircleOutlined/>}
                                    onClick={() => setIsModalOpen(true)}
                            >
                                Add car
                            </Button>
                            :
                            <></>
                        }

                        <div className="profileButtons">
                            <Button
                                className="submitButton"
                                htmlType="submit"
                                type="primary"
                            >
                                Save
                            </Button>
                            <Button
                                className="deleteButton"
                                type="danger"
                                onClick={() => deleteProfile()}
                            >
                                Delete Account
                            </Button>
                        </div>

                        {isModalOpen && <AddNewCarModal
                            myClose={() => setIsModalOpen(false)}/>}
                    </div>
                </Form>
            </Layout>
        </Layout>
    );
}

export default ProfilePage;
