import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';
import { addCar } from "../../services/cars";
import { errorMessage } from "../../services/alerts";
import { carsMessages } from "../../constants/messages/cars";
import { getCarCategories } from "../../services/carCategories";
import InputRules from "../../constants/inputRules";
import { generalMessages } from '../../constants/messages/general';

function AddNewCarModal(props) {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
        async function fetchData() {
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
        }
        fetchData();
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
            carsMessages.ADD_CAR_FAILED,
            generalMessages.CORRECT_ALL_COMMENTS
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
                            carsMessages.CAPITAL_LETTER_FIRST
                        ),
                        InputRules.carModel(),
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                    ]}
                >
                    <Input placeholder="Model" />
                </Form.Item>

                <Form.Item name="technicalPassport"
                    label="Technical passport: "
                    rules={[
                        InputRules.technicalPassport(),
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                    ]}
                >
                    <Input placeholder="Technical passport" />
                </Form.Item>

                <Form.Item name="registrationNumber"
                    label={"Registration number: "}
                    rules={[
                        InputRules.registrationNumber(),
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                    ]}
                >
                    <Input placeholder="Registration number" />
                </Form.Item>

                <Form.Item name="loadCapacity"
                    label={"Load capacity: "}
                    rules={[
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
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
                        InputRules.vin(),
                        InputRules.length(
                            17,
                            carsMessages.NOT_VALID_VIN_LENGTH
                        ),
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
                    ]}
                >
                    <Input placeholder="VIN" />
                </Form.Item>

                <Form.Item name="category"
                    label={"Category: "}
                    rules={[
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)

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
                        InputRules.latinLetters(
                            carsMessages.NOT_VALID_COLOR
                        ),
                        InputRules.required(generalMessages.FIELD_MUST_NOT_BE_EMPTY)
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
