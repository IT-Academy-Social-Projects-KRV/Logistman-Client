import React, { useEffect } from "react";
import styles from '../styles.module.css';
import { Form, Input, Button } from 'antd';
import { register } from '../../../services/authentication';
import { Link } from 'react-router-dom';

function Registration() {

    useEffect(() => {
        document.title = "Logistman";
    });

    const onFinish = (values) => {
        register(values);
    };

    const onFinishFailed = () => {
        //trigger the error alert (?)
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
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item
                        className={styles.textForm}
                        name="name"
                        rules={[
                            {
                                type: 'string',
                                pattern: new RegExp(/^[A-Z][a-z]{1,51}$/),
                                message: 'The input is not valid name!'
                            },
                            {
                                required: true,
                                message: 'Please input your name!'
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
                                type: 'string',
                                pattern: new RegExp(/^[A-Z][a-z]{1,51}$/),
                                message: 'The input is not valid surname!',
                            },
                            {
                                required: true,
                                message: 'Please input your surname!'
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
                                type: 'email',
                                message: 'The input is not valid e-mail!',
                                maxLength: 3
                            },
                            {
                                required: true,
                                message: 'Please input your e-mail!'
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
                                type: 'string',
                                pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,51}$/),
                                message: 'The input is not valid password!'
                            },
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password className={styles.passwordInput} placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmedPassword"
                        className={styles.passwordForm}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error
                                            (
                                                'The two passwords that you entered do not match!'
                                            )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password className={styles.passwordInput} placeholder="Confirm password" />
                    </Form.Item>


                    <Form.Item className={styles.submitItem}>
                        <Button type="primary" htmlType="submit" className={styles.submitButton}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>

                <div className={styles.linksDiv}>
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Registration;
