import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { register } from "../../../services/authentication";
import { Link } from "react-router-dom";
import { inputValidationErrorMessages } from "../../../constants/messages/inputValidationErrors";
import { errorMessage } from "../../../services/alerts";
import tokenService from "../../../services/tokens";
import { authenticationErrorMessages } from "../../../constants/messages/authentication";
import { generalErrorMessages } from './../../../constants/messages/general';
import InputRules from "../../../constants/inputRules";

function RegistrationPage() {
    var history = useHistory();

    useEffect(() => {
        tokenService.deleteTokens();
    }, []);

    const onFinish = (values) => {
        register(values, history);
    };

    const onFinishFailed = () => {
        errorMessage(
            authenticationErrorMessages.REGISTRATION_BLOCKED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    return (
        <div className="authBody">
            <div className="center">
                <p className="title">Logistman</p>
                <p>Sign up and start managing your offers!</p>

                <Form
                    className="form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item
                        className="textForm"
                        name="name"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_NAME
                            ),
                            InputRules.latinLetters(
                                inputValidationErrorMessages.NOT_VALID_NAME
                            ),
                            InputRules.lengthRange(
                                2,
                                50,
                                inputValidationErrorMessages.NAME_MUST_BE_BETWEEN_1_AND_50
                            )
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        className="textForm"
                        name="surname"
                        rules={[
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_SURNAME
                            ),
                            InputRules.latinLetters(
                                inputValidationErrorMessages.NOT_VALID_SURNAME
                            ),
                            InputRules.lengthRange(
                                2,
                                50,
                                inputValidationErrorMessages.SURNAME_MUST_BE_BETWEEN_1_AND_50
                            )
                        ]}
                    >
                        <Input placeholder="Surname" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        className="textForm"
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
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className="passwordForm"
                        rules={[
                            InputRules.password(
                                inputValidationErrorMessages.NOT_VALID_PASSWORD
                            ),
                            InputRules.required(
                                inputValidationErrorMessages.EMPTY_PASSWORD
                            )
                        ]}
                    >
                        <Input.Password
                            className="passwordInput"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmedPassword"
                        className="passwordForm"
                        rules={[
                            {
                                required: true,
                                message: inputValidationErrorMessages.CONFIRM_PASSWORD
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            inputValidationErrorMessages.PASSWORD_DONT_MATCH
                                        )
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password
                            className="passwordInput"
                            placeholder="Confirm password"
                        />
                    </Form.Item>

                    <Form.Item className="submitItem">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submitButton"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div className="linksDiv">
                    <Link to="/home">Home</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
