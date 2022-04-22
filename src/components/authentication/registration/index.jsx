import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { register } from "../../../services/authentication";
import { Link } from "react-router-dom";
import { inputValidationErrors } from "../../../constants/messages/inputValidationErrors";
import styles from "../styles.module.css";
import { AlertService } from './../../../services/alert.service';

function Registration() {
    let history = useHistory();

    const onFinish = (values) => {
        register(values, history);
    };

    const onFinishFailed = () => {
        AlertService.errorMessage("Registration is blocked!", "First, correct all comments!")
    };

    return (
        <div className={styles.authBody}>
            <div className={styles.center}>
                <p className={styles.title}>Logistman</p>
                <p>Sign up and start managing your offers!</p>

                <Form
                    className={styles.form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item
                        className={styles.textForm}
                        name="name"
                        rules={[
                            {
                                type: "string",
                                pattern: new RegExp("^[A-Z][a-z]+$"),
                                message: inputValidationErrors.NOT_VALID_NAME_MESSAGE
                            },
                            {
                                type: "string",
                                min: 2,
                                max: 50,
                                message: "The name must be between 1 and 50 letters!"
                            },
                            {
                                required: true,
                                message: inputValidationErrors.EMPTY_NAME_MESSAGE
                            }
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        className={styles.textForm}
                        name="surname"
                        rules={[
                            {
                                type: "string",
                                pattern: new RegExp("^[A-Z][a-z]+$"),
                                message: inputValidationErrors.NOT_VALID_SURNAME_MESSAGE
                            },
                            {
                                type: "string",
                                min: 2,
                                max: 50,
                                message: "The name must be between 1 and 50 letters!"
                            },
                            {
                                required: true,
                                message: inputValidationErrors.EMPTY_SURNAME_MESSAGE
                            }
                        ]}
                    >
                        <Input placeholder="Surname" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        className={styles.textForm}
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
                        className={styles.passwordForm}
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
                            },
                        ]}
                    >
                        <Input.Password
                            className={styles.passwordInput}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmedPassword"
                        className={styles.passwordForm}
                        rules={[
                            {
                                required: true,
                                message: inputValidationErrors.CONFIRM_PASSWORD,
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
                                            inputValidationErrors.PASSWORD_DONT_MATCH
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            className={styles.passwordInput}
                            placeholder="Confirm password"
                        />
                    </Form.Item>

                    <Form.Item className={styles.submitItem}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.submitButton}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.linksDiv}>
                    <Link to="/home">Home</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Registration;
