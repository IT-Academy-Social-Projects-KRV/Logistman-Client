import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { errorMessages } from "../../../constants/errorMessages";
import { inputRegexes } from "../../../constants/inputRegexes";
import { login } from "../../../services/authentication";
import styles from "../styles.module.css";

function Login() {
    let history = useHistory();

    const onFinish = (values) => {
        login(values, history);
    };

    function onChange(e) {
        console.log(`remember me = ${e.target.checked}`);
    }

    return (
        <div className={styles.body}>
            <div className={styles.center}>
                <p className={styles.title}>Logistman</p>
                <p>Sign in and start managing your offers!</p>

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
                        name="email"
                        className={styles.textForm}
                        rules={[
                            {
                                type: "email",
                                message: errorMessages.NOT_VALID_EMAIL_MESSAGE,
                            },
                            {
                                required: true,
                                message: errorMessages.EMPTY_EMAIL_MESSAGE,
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
                                    errorMessages.NOT_VALID_PASSWORD_MESSAGE,
                            },
                            {
                                required: true,
                                message: errorMessages.EMPTY_PASSWORD_MESSAGE,
                            },
                        ]}
                    >
                        <Input.Password
                            className={styles.passwordInput}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <div className={styles.helperForm}>
                        <Checkbox className={styles.checkboxForm} onChange={onChange}>Remember me</Checkbox>
                        <Link to="/forgotPassword">Forgot password</Link>
                    </div>

                    <Form.Item className={styles.submitItem}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.submitButton}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.linksDiv}>
                    <Link to="/">Home</Link>
                    <Link to="/registration">Registration</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
