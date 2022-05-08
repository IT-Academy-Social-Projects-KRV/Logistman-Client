import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { inputValidationErrors } from "../../../constants/messages/inputValidationErrors";
import { login } from "../../../services/authentication";
import { AlertService } from './../../../services/alert.service';

function Login() {
    let history = useHistory();

    const onFinish = (values) => {
        login(values, history);
    };

    const onFinishFailed = () => {
        AlertService.errorMessage("Log in is blocked!", "First, correct all comments!")
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
                            {
                                type: "email",
                                message: inputValidationErrors.NOT_VALID_EMAIL_MESSAGE
                            },
                            {
                                required: true,
                                message: inputValidationErrors.EMPTY_EMAIL_MESSAGE
                            }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className="passwordForm"
                        rules={[
                            {
                                type: "string",
                                pattern:
                                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%^&*(){}:;<>,.?+_=|'~\\-])[A-Za-z0-9!@$%^&*(){}:;<>,.?+_=|'~\\-]{7,51}$"),
                            message:
                            inputValidationErrors.NOT_VALID_PASSWORD_MESSAGE
                            },
                            {
                                required: true,
                                message: inputValidationErrors.EMPTY_PASSWORD_MESSAGE
                            }
                            ]}
                            >
                            <Input.Password
                                className="passwordInput"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <div className="helperForm">
                            <Checkbox className="checkboxForm">
                                Remember me
                            </Checkbox>
                        <Link to="/forgotPassword">Forgot password</Link>
                    </div>

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
                    <Link to="/offer">Моє лихо</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
