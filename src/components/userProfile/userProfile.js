import React from "react";
import {editUserInfo, getUserProfileInfo} from '../../services/userService';
import Header from '../navigation/header';
import {Button, Form, Input, Layout} from 'antd';
import {CheckOutlined, CloseOutlined, PlusCircleOutlined} from '@ant-design/icons';
import NewCarModal from "../newCarModal/index";
import {confirmMessage, errorMessage} from "../../services/alert.service";
import {generalErrorMessages} from "../../constants/messages/general";
import {inputValidationErrors} from "../../constants/messages/inputValidationErrors";
import {userErrorMessages} from "../../constants/messages/user";

/* now the class is using instead of function
 because it wasn't working with function,
 but it will be rewritten later
 */
class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: this.props.isModalOpen
        };
    };

    componentDidMount = async () => {
        const userData = await getUserProfileInfo();
        this.setState({userData: userData});
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        return {
            isModalOpen: nextProps.isModalOpen
        };
    };

    onFinishFailed = () => {
        errorMessage(
            userErrorMessages.EDIT_USER_PROFILE_BLOCKED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    onFinish = (values) => {
        confirmMessage().then((res) => {
            if (res) {
                var userData = this.state.userData;
                if (userData.name !== values.name ||
                    userData.surname !== values.surname ||
                    userData.email !== values.email) {
                    editUserInfo(values);
                    this.setState({userData: values});
                }
            }
        });
    };

    openModal_ = () => {
        const {
            openModal
        } = this.props;
        openModal();
    };

    onNameChange = (e) => {
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                name: e.target.value
            }
        }));
    };

    onSurnameChange = (e) => {
        this.setState(prevState => ({
            userData: {
                ...prevState.userData,
                surname: e.target.value
            }
        }));
    };

    render() {
        const {userData, isModalOpen} = this.state;

        if (!userData) {
            return <div>Loading</div>
        }

        return (
            <Layout className="profilePageBody">
                <Header/>

                <Layout id="infoBlock">
                    <div className="info">
                        <div className="infoName">
                            <p> Full name </p>
                        </div>

                        <div>
                            <p>{userData.name + ' ' + userData.surname}</p>
                        </div>
                    </div>

                    <Form
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <div className="info">
                            <div className="infoName">
                                <p> Name </p>
                            </div>

                            <div className="inputBlock">
                                <Form.Item className="formItem" name="name"
                                           initialValue={userData.name}
                                           rules={[
                                               {
                                                   type: "string",
                                                   pattern: new RegExp("^[A-Z][a-z]+$"),
                                                   message:
                                                   inputValidationErrors.NOT_VALID_NAME_MESSAGE,
                                               },
                                               {
                                                   type: "string",
                                                   min: 2,
                                                   max: 50,
                                                   message:
                                                       "The name must be between 1 and 50 letters!",
                                               },
                                               {
                                                   required: true,
                                                   message:
                                                   inputValidationErrors.EMPTY_NAME_MESSAGE,
                                               },
                                           ]}
                                >
                                    <Input onChange={(e) => {
                                        this.onNameChange(e)
                                    }}/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="info">
                            <div className="infoName">
                                <p> Surname </p>
                            </div>

                            <div className="inputBlock">

                                <Form.Item className="formItem" name="surname"
                                           initialValue={userData.surname}
                                           rules={[
                                               {
                                                   type: "string",
                                                   pattern: new RegExp("^[A-Z][a-z]+$"),
                                                   message:
                                                   inputValidationErrors.NOT_VALID_SURNAME_MESSAGE,
                                               },
                                               {
                                                   type: "string",
                                                   min: 2,
                                                   max: 50,
                                                   message:
                                                       "The name must be between 1 and 50 letters!",
                                               },
                                               {
                                                   required: true,
                                                   message:
                                                   inputValidationErrors.EMPTY_SURNAME_MESSAGE,
                                               },
                                           ]}
                                >
                                    <Input onChange={(e) => {
                                        this.onSurnameChange(e)
                                    }}/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="info">
                            <div className="infoName">
                                <p> Email </p>
                            </div>

                            <div className="inputBlock">

                                <Form.Item className="formItem" name="email"
                                           initialValue={userData.email}
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
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="info">
                            <div className="infoName">
                                <p> Is your email confirmed </p>
                            </div>

                            <div className="infoInput">
                                {userData.isEmailConfirmed ?
                                    <CheckOutlined/> :
                                    <CloseOutlined/>
                                }
                            </div>
                        </div>

                        <div className="blockButton">
                            <Button type="primary"
                                    className="addItemButton"
                                    icon={<PlusCircleOutlined/>}
                                    onClick={() => this.openModal_()}>
                                Add car
                            </Button>

                            <Button
                                htmlType={"submit"}
                                type="primary"
                            >
                                Save
                            </Button>
                            {isModalOpen && <NewCarModal/>}
                        </div>
                    </Form>
                </Layout>
            </Layout>
        );
    }
}

export default UserProfilePage;
