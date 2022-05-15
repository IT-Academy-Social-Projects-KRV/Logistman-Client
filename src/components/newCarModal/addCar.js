import React from "react";
import {Modal, Form, Input, InputNumber, Select, Button, AutoComplete} from 'antd';
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
        var carCategories = await getCarCategories();
        // var _categories;
        for(let category in carCategories){
            category.value = category.name;
            category.label = category.name;
        }
        // _carCategories.map((category, index) => {
        //     category.value = category.name;
        //     category.label = category.name;
        //     return category;
        // });
        // this.setState({categories: carCategories});
        console.log(carCategories);
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
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    scrollToFirstError
                >
                    <Form.Item name="model"
                               rules={[
                                   {
                                       type: "string",
                                       pattern: new RegExp("^[a-zA-Z\\d ]*$"),
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
                        <Input addonBefore="Model:" placeholder="Model"/>
                    </Form.Item>
                    <Form.Item name="technicalPassport"
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
                        <Input addonBefore="Technical Passport:" placeholder="Technical Passport"/>
                    </Form.Item>
                    <Form.Item name="registrationNumber"
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
                        <Input addonBefore="Registration Number:" placeholder="Registration Number"/>
                    </Form.Item>
                    <Form.Item name="loadCapacity"
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
                        <Input addonBefore="VIN:" placeholder="VIN"/>
                    </Form.Item>
                    <Form.Item name="categoryName"
                               rules={[
                                   {
                                       required: true,
                                       message:
                                       carErrorMessages.EMPTY_FIELD_MESSAGE
                                   },
                               ]}
                    >
                        {/*<AutoComplete*/}
                        {/*    addonBefore="Category:"*/}
                        {/*    options = {getCarCategories}*/}
                        {/*></AutoComplete>*/}
                        <Select
                            // addonBefore="Category:"
                            showSearch
                            placeholder="Category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            // options = {this.state.categories}
                        >
                            {/*{this.state.categories.map((category, index) =>*/}
                            {/*    <Select.Option value={category}>{category}</Select.Option>*/}
                            {/*)}*/}
                            {/*
                            Categories are hardcoded,
                            because there are no endpoint for getting them from server now.
                            */}
                            {/*<Select.Option value={2}>B</Select.Option>*/}
                            {/*<Select.Option value={3}>C</Select.Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item name="color"
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
