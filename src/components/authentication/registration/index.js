import React from 'react';
import styles from '../styles.module.css';
import { Form, Input, Button } from 'antd';

function Registration() {

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
                    className={styles.form}
                >
                    <Form.Item
                        className={styles.textInput}
                        name="name"
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        className={styles.textInput}
                        name="surname"
                    >
                        <Input placeholder="Surname" />
                    </Form.Item>

                    <Form.Item
                        className={styles.textInput}
                        name="email"
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className={styles.passwordInput}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmedPassword"
                        className={styles.passwordInput}
                    >
                        <Input.Password placeholder="Confirm password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" className={styles.submitButton}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Registration;
