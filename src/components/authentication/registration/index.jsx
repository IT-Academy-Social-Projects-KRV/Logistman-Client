import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { register } from "../../../services/authentication";
import { Link } from "react-router-dom";
import { inputValidationErrors } from "../../../constants/errors/inputValidationErrors";
import { inputRegexes } from "../../../constants/inputRegexes";
import styles from "../styles.module.css";

function Registration() {
    let history = useHistory();

    const onFinish = (values) => {
        register(values, history);
    };

    return (
        <div className={styles.body}>
            <div className={styles.center}>
                <p className={styles.title}>Logistman</p>
                <p>Sign up and start managing your offers!</p>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        className={styles.textForm}
                        name="name"
                        rules={[
                            {
                                type: "string",
                                pattern: new RegExp(inputRegexes.NAME),
                                message:
                                    inputValidationErrors.NOT_VALID_NAME_MESSAGE,
                            },
                            {
                                required: true,
                                message:
                                    inputValidationErrors.EMPTY_NAME_MESSAGE,
                            },
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
                                pattern: new RegExp(inputRegexes.SURNAME),
                                message:
                                    inputValidationErrors.NOT_VALID_SURNAME_MESSAGE,
                            },
                            {
                                required: true,
                                message:
                                    inputValidationErrors.EMPTY_SURNAME_MESSAGE,
                            },
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
                                message:
                                    inputValidationErrors.NOT_VALID_EMAIL_MESSAGE,
                            },
                            {
                                required: true,
                                message:
                                    inputValidationErrors.EMPTY_EMAIL_MESSAGE,
                            },
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
                                pattern: new RegExp(inputRegexes.PASSWORD),
                                message:
                                    inputValidationErrors.NOT_VALID_PASSWORD_MESSAGE,
                            },
                            {
                                required: true,
                                message:
                                    inputValidationErrors.EMPTY_PASSWORD_MESSAGE,
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
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Registration;
