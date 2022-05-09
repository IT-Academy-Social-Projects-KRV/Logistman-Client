import React from "react";
import {Modal, Form, Input, InputNumber, Select, Button} from 'antd';
import {addCarMessages} from "../../constants/messages/addCarMessages";
import {addCar} from "../../services/carService";

/* now the class is using instead of function
 because it wasn't working with function,
 but it will be rewritten later
 */
class NewCarModal extends React.Component {
    close = () => {
        const {
            closeModal
        } = this.props;

        closeModal();
    };

    onFinish = (values) => { //invokes after submit button pressed
        addCar(values);
        this.close();
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
                    onFinish={this.onFinish}
                    scrollToFirstError
                >
                    <Form.Item name="model"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                                       message:
                                       addCarMessages.NOT_VALID_MODEL_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input addonBefore="Model:" placeholder="Model"/>
                    </Form.Item>
                    <Form.Item name="technicalPassport"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                                       message:
                                       addCarMessages.NOT_VALID_TECH_PASSPORT_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input addonBefore="Technical Passport:" placeholder="Technical Passport"/>
                    </Form.Item>
                    <Form.Item name="registrationNumber"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                                       message:
                                       addCarMessages.NOT_VALID_CAR_NUMBER_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input addonBefore="Registration Number:" placeholder="Registration Number"/>
                    </Form.Item>
                    <Form.Item name="loadCapacity"
                               rules={[
                                   {
                                       pattern: new RegExp("^[^0|\\D]\\d{0,9}(\\.\\d{1,2})?$"),
                                       message:
                                       addCarMessages.NOT_VALID_LOAD_CAPACITY_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <InputNumber min={0}
                                     addonBefore="Load Capacity:"
                                     addonAfter="kg"
                                     placeholder="Load Capacity"
                        />
                    </Form.Item>
                    <Form.Item name="vin"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d]*$"),
                                       message:
                                       addCarMessages.NOT_VALID_VIN_MESSAGE
                                   },
                                   {
                                       pattern: new RegExp(".{17}"),
                                       message:
                                       addCarMessages.NOT_VALID_VIN_LENGTH_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input addonBefore="VIN:" placeholder="VIN"/>
                    </Form.Item>
                    <Form.Item name="category">
                        <Select
                            addonBefore="Category:"
                            showSearch
                            placeholder="Category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {/*
                            Categories are hardcoded,
                            because there are no endpoint for getting them from server now.
                            */}
                            <Select.Option value={1}>A</Select.Option>
                            <Select.Option value={2}>B</Select.Option>
                            <Select.Option value={3}>C</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="color"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z]*$"),
                                       message:
                                       addCarMessages.NOT_VALID_COLOR_MESSAGE
                                   },
                                   {
                                       required: true,
                                       message:
                                       addCarMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        <Input addonBefore="Color:" placeholder="Color"/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="submitButton" type="primary" htmlType="submit">
                            Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default NewCarModal;
