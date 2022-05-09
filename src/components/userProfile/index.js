import React from "react";
import {getUserProfileInfo} from '../../services/userService';
import Header from '../navigation/header';
import {Button, Input, Layout} from 'antd';
import {CheckOutlined, CloseOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {openModal} from "../../reduxActions/general";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NewCarModal from "../newCarModal/index";

/* now the class is using instead of function
 because it wasn't working with function,
 but it will be rewritten later
 */
class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: this.props.isModalOpen,
            userData: {
                name: "",
                surname: ""
            }
        };
    }

    async componentDidMount() {
        var userData = await getUserProfileInfo();
        if (userData !== undefined) {
            this.setState({
                userData: userData
            });
        }
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        return {
            isModalOpen: nextProps.isModalOpen
        };
    }

    openModal_ = () => {
        const {
            openModal
        } = this.props;
        openModal();
    }

    render() {
        const {userData, isModalOpen} = this.state;
        return (
            <Layout className="profilePageBody">
                <Header/>

                <Layout id="infoBlock">
                    <div className="info">
                        <div className="infoName">
                            <p> Full name </p>
                        </div>
                        <div className="infoInput">
                            <Input value={userData.name + ' ' + userData.surname}/>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Name </p>
                        </div>
                        <div className="infoInput">
                            <Input value={userData.name}/>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Surname </p>
                        </div>
                        <div className="infoInput">
                            <Input value={userData.surname}/>
                        </div>
                    </div>

                    <div className="info">
                        <div className="infoName">
                            <p> Email </p>
                        </div>
                        <div className="infoInput">
                            <Input value={userData.email}/>
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
                    <div>
                        <Button type="primary"
                                className="addItemButton"
                                icon={<PlusCircleOutlined/>}
                                onClick={() => this.openModal_()}>
                            Add car
                        </Button>
                        {isModalOpen && <NewCarModal/>}
                    </div>
                </Layout>
            </Layout>
        );
    };
}

const mapState = (stateRedux) => {
    return {
        isModalOpen: stateRedux.generalReducer.isModalOpen
    };
}
const mapDispatchToProps = {
    openModal
}

export default withRouter(connect(mapState, mapDispatchToProps)(UserProfilePage));
