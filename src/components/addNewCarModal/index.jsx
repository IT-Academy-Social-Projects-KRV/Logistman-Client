import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import { addCar } from "../../services/cars";
import { errorMessage } from "../../services/alerts";
import { carsErrorMessages } from "../../constants/messages/cars";
import { getCarCategories } from "../../services/carCategories";
import InputRules from "../../constants/inputRules";
import { generalErrorMessages } from '../../constants/messages/general';

function AddNewCarModal(props) {
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        let carCategories = await getCarCategories();
        
        if (carCategories !== undefined &&
            carCategories.length > 0) {
            carCategories.map(category => {
                category.value = category.name;
                category.label = category.name;
            });

            setCategories(carCategories);
        }
        else {
            props.myClose();
        }
    }, []);

    const close = () => {
        props.myClose();
    };

    const onFinish = (values) => {
        addCar(values);
        this.close();
    };

    const onFinishFailed = () => {
        errorMessage(
            carsErrorMessages.ADD_CAR_FAILED,
            generalErrorMessages.CORRECT_ALL_COMMENTS
        );
    };

    return (
        <Modal title="Add a car"
            visible={true}
            onCancel={() => close()}
            okButtonProps={{ style: { display: 'none' } }} //hides default modal`s button
        >
            <Form
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 14
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
            >
                <Form.Item name="model"
                    label={"Model: "}
                    rules={[
                        InputRules.capitalLetterFirst(
                            carsErrorMessages.CAPITAL_LETTER_FIRST
                        ),
                        {
                            pattern: new RegExp("^([A-Za-z\\d ]?)*$"),
                            message:
                                carsErrorMessages.NOT_VALID_MODEL
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <Input placeholder="Model" />
                </Form.Item>

                <Form.Item name="technicalPassport"
                    label="Technical passport: "
                    rules={[
                        {
                            pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                            message:
                                carsErrorMessages.NOT_VALID_TECH_PASSPORT
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <Input placeholder="Technical passport" />
                </Form.Item>

                <Form.Item name="registrationNumber"
                    label={"Registration number: "}
                    rules={[
                        {
                            type: "string",
                            pattern: new RegExp("^[a-zA-Z\\d ]*$"),
                            message:
                                carsErrorMessages.NOT_VALID_REGISTRATION_NUMBER
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <Input placeholder="Registration number" />
                </Form.Item>

                <Form.Item name="loadCapacity"
                    label={"Load capacity: "}
                    rules={[
                        {
                            pattern: new RegExp("^[^0|\\D]\\d{0,9}(\\.\\d{1,2})?$"),
                            message:
                                carsErrorMessages.NOT_VALID_LOAD_CAPACITY
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <InputNumber min={0}
                        addonAfter="kg"
                        placeholder="Load capacity"
                    />
                </Form.Item>

                <Form.Item name="vin"
                    label={"VIN: "}
                    rules={[
                        {
                            pattern: new RegExp("^[a-zA-Z\\d]*$"),
                            message:
                                carsErrorMessages.NOT_VALID_VIN
                        },
                        {
                            pattern: new RegExp("^.{17}$"),
                            message:
                                carsErrorMessages.NOT_VALID_VIN_LENGTH
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <Input placeholder="VIN" />
                </Form.Item>

                <Form.Item name="category"
                    label={"Category: "}
                    rules={[
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)

                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Category"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        options={categories}
                    >
                    </Select>
                </Form.Item>

                <Form.Item name="color"
                    label={"Color: "}
                    rules={[
                        {
                            pattern: new RegExp("^[a-zA-Z]*$"),
                            message: carsErrorMessages.NOT_VALID_COLOR
                        },
                        InputRules.required(carsErrorMessages.EMPTY_FIELD)
                    ]}
                >
                    <Input placeholder="Color" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 18
                    }}>
                    <Button className="submitButton" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddNewCarModal;
