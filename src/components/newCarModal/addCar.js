import React from "react";
import {Modal, Form, Input, InputNumber, Select, Button} from 'antd';
import {addCar} from "../../services/carService";
import {errorMessage} from "../../services/alert.service";
import { carErrorMessages } from "../../constants/messages/car";
import {getCarCategories} from "../../services/carCategoryService";

// change the type of file to .jsx

/* now the class is using instead of function
 because it wasn't working with function,
 but it will be rewritten later
 */
class NewCarModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    close = () => {
        const {
            closeModal
        } = this.props;

        closeModal();
    };

    async componentDidMount() {
        let carCategories = await getCarCategories();
        carCategories.map(category => {
            category["value"] = category["name"];
            category["label"] = category["name"];
            return category;
        });
        this.setState({categories: carCategories});
    }

    onFinish = (values) => { //invokes after submit button pressed
        addCar(values);
        this.close();
    };

    onFinishFailed = () => {
        errorMessage(
            carErrorMessages.CAR_ADDING_FAILED,
            carErrorMessages.CAR_ADDING_NOT_ALLOWED
        );
    };

    render() {
        return (
            <Modal title="Add Car"
                   style={{top: 20}}
                   visible={true}
                   onCancel={() => this.close()}
                   okButtonProps={{style: {display: 'none'}}} //hides default modal`s button
            >

                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item name="model"
                               label={"Model: "}
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[A-Z]"),
                                       message:
                                       carErrorMessages.CANNOT_START_WITH_SPACE_MESSAGE
                                   },
                                   {
                                       type: "string",
                                       pattern: new RegExp("^([A-Za-z\\d ]?)*$"),
                                       message:
                                       carErrorMessages.NOT_VALID_MODEL_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input /*addonBefore="Model:"*/ placeholder="Model"/>
                    </Form.Item>
                    <Form.Item name="technicalPassport"
                               label="Technical Passport:"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                                       message:
                                       carErrorMessages.NOT_VALID_TECH_PASSPORT_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input placeholder="Technical Passport"/>
                    </Form.Item>
                    <Form.Item name="registrationNumber"
                               label={"Registration Number: "}
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                                       message:
                                       carErrorMessages.NOT_VALID_CAR_NUMBER_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input placeholder="Registration Number"/>
                    </Form.Item>
                    <Form.Item name="loadCapacity"
                               label={"Load Capacity: "}
                               rules={[
                                   {
                                       pattern: new RegExp("^[^0|\\D]\\d{0,9}(\\.\\d{1,2})?$"),
                                       message:
                                       carErrorMessages.NOT_VALID_LOAD_CAPACITY_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <InputNumber min={0}
                                     addonAfter="kg"
                                     placeholder="Load Capacity"
                        />
                    </Form.Item>
                    <Form.Item name="vin"
                               label={"VIN: "}
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d]*$"),
                                       message:
                                       carErrorMessages.NOT_VALID_VIN_MESSAGE
                                   },
                                   {
                                       pattern: new RegExp("^.{17}$"),
                                       message:
                                       carErrorMessages.NOT_VALID_VIN_LENGTH_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input placeholder="VIN"/>
                    </Form.Item>
                    <Form.Item name="category"
                               label={"Category: "}
                               rules={[
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Select
                            showSearch
                            placeholder="Category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            options = {this.state.categories}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item name="color"
                               label={"Color: "}
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z]*$"),
                                       message:
                                       carErrorMessages.NOT_VALID_COLOR_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input placeholder="Color"/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 18
                        }}>
                        <Button className="submitButton" type="primary" htmlType="submit">
                            Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default NewCarModal;
