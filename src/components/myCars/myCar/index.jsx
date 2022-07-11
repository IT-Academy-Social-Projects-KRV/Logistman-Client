import React, {useState} from "react";
import {Button, Card, Form} from "antd";
import {FormOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import bucket_icon from "../../../assets/images/cars/bucket.svg";
import heavy_icon from "../../../assets/images/cars/heavy.svg";
import apps_icon from "../../../assets/images/cars/apps.svg";
import info_icon from "../../../assets/images/cars/info.svg";
import insurance_icon from "../../../assets/images/cars/insurance.svg";
import passport_icon from "../../../assets/images/cars/passport.svg";
import {store} from "../../../store";
import {unverifyCar, verifyCar, deleteById} from "../../../services/cars";
import {confirmDeleteMessage} from '../../../services/alerts';

function MyCar(data) {
    const [isCarVerified, setIsCarVerified] = useState(data.info.isVerified);
    let role = store.getState().authReducer.role;

    const verify = async () => {
        await verifyCar(data.info.vin);
        setIsCarVerified(true);
    }

    const unverify = async () => {
        await unverifyCar(data.info.vin);
        setIsCarVerified(false);
    }

    const updateCars = () => {
        data.updateCars();
    }

    const deleteCar = (id) => {
        confirmDeleteMessage().then((result) => {
            if (result) {
                deleteById(id).then(() => {
                    updateCars();
                });
            }
        });
    }

    return (
        <Card className="carCard">
            <div className="cardHead">
                <Text strong className="carStatus">

                    {isCarVerified ?
                        <p id="verified">Verified</p> :
                        <p id="unverified">Unverified</p>
                    }
                </Text>
            </div>

            <div className="information">
                <div className="leftSide">
                    <div className="field-group">
                        <div className="cardField">
                            <img src={info_icon} className="fieldIcon"/>
                            <p>Registration number: {data.info.registrationNumber}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={passport_icon} className="fieldIcon"/>
                            <p>Technical passport: {data.info.technicalPassport}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={insurance_icon} className="fieldIcon"/>
                            <p>VIN: {data.info.vin}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <FormOutlined className="fieldIcon"/>
                            <p>Model: {data.info.model}</p>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="field-group">
                        <div className="field-group">
                            <div className="cardField">
                                <img src={apps_icon} className="fieldIcon"/>
                                <p>Category: {data.info.category}</p>
                            </div>
                        </div>

                        <div className="cardField">
                            <img src={heavy_icon} className="fieldIcon"/>
                            <p>Load capacity: {data.info.loadCapacity} kg</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={bucket_icon} className="fieldIcon"/>
                            <p>Color: {data.info.color}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttonsBlock">
                {role === "Logist" ?
                    <div className="buttons-group">
                        {isCarVerified ?
                            <Button
                                onClick={() => unverify()}
                            >
                                Unverify
                            </Button> :
                            <Button
                                onClick={() => verify()
                                }>
                                Verify
                            </Button>
                        }
                    </div>
                    :
                    <></>
                }
                <Button
                    type="danger"
                    onClick={() => deleteCar(data.info.id)}
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
}

export default MyCar;
