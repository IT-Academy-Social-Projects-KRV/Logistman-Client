import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { inputValidationErrorMessages } from "../../../constants/messages/inputValidationErrors";
import { login } from "../../../services/authentication";
import { errorMessage } from "../../../services/alerts";
import { authenticationMessages } from "../../../constants/messages/authentication";
import { generalMessages } from "../../../constants/messages/general";
import InputRules from "../../../constants/inputRules";
import tokenService from "../../../services/tokens";

function LoginPage() {
    let history = useHistory();

    useEffect(() => {
        tokenService.deleteTokens();
    }, []);

    const onFinish = (values) => {
        login(values, history);
    };

    const onFinishFailed = () => {
        errorMessage(
            authenticationMessages.LOGIN_BLOCKED,
            generalMessages.CORRECT_ALL_COMMENTS
        );
    };

    return (
        <div className="authBody">
            <div className="center">
                <p className="title">Logistman</p>
                <p>Sign in and start managing your offers!</p>

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

                    <Form.Item className="submitItem">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="submitButton"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div className="linksDiv">
                    <Link to="/home">Home</Link>
                    <Link to="/registration">Registration</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
