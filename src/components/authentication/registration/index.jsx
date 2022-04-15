import React from 'react';
import styles from '../styles.module.css';
import { Form, Input, Button } from 'antd';
import { register } from '../../../services/authentication';
import { Link } from 'react-router-dom';

function Registration() {

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

                <Form //needs to add data validation 
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    className={styles.form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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

                <div className={styles.linkDiv}>
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
