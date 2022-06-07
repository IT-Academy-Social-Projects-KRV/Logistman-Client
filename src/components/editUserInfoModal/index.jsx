import React from "react";
import { Modal, Form, Input, Button, Space } from "antd";
import { confirmMessage, errorMessage } from "../../services/alerts";
import { userErrorMessages } from "../../constants/messages/user";
import { generalErrorMessages } from "../../constants/messages/general";
import { inputValidationErrorMessages } from "../../constants/messages//inputValidationErrors";
import InputRules from "../../constants/inputRules";
import { logistEditUserInfo } from '../../services/users';

function EditUserInfoModal(props) {
    const userData = props.data;

    const close = () => {
        props.myClose();
    };

    const updateUserInfo = () => {
        props.updateUserInfo();
    }

    const onFinish = (values) => {
        confirmMessage().then((result) => {
            if (result) {

                if (userData.name !== values.name ||
                    userData.surname !== values.surname ||
                    userData.email !== values.email) {

                    logistEditUserInfo(values, userData.email).then((result) => {
                        if (result) {
                            close();
                            updateUserInfo();
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

    const onFinishFailed = () => {
        errorMessage(
            userErrorMessages.EDIT_USER_PROFILE_FAILED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    if (userData === undefined) {
        return <>Loading...</>;
    }
    return (
        <Modal title="Edit user info"
            visible={true}
            onCancel={() => close()}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            footer={null}
        >
            <Form
                labelCol={{
                    span: 5
                }}
                wrapperCol={{
                    span: 32
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <Form.Item name="name"
                    label={"Name: "}
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
                            inputValidationErrorMessages.EMPTY_USER_NAME
                        )
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="surname"
                    label={"Surname: "}
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
                            inputValidationErrorMessages.EMPTY_USER_SURNAME
                        )
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="email"
                    label={"Email: "}
                    initialValue={userData?.email}
                    rules={[
                        InputRules.specificType(
                            "email",
                            inputValidationErrorMessages.NOT_VALID_EMAIL
                        ),
                        InputRules.required(
                            inputValidationErrorMessages.EMPTY_USER_EMAIL
                        )
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        htmlType={"submit"}
                        type="primary"
                    >
                        Save
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        onClick={() => close()}
                    >
                        Close
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditUserInfoModal;
