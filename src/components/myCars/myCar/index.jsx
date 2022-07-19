import React, { useState } from "react";
import { Button, Card } from "antd";
import Text from "antd/es/typography/Text";
import { IoColorPaletteOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { GiWeight } from "react-icons/gi";
import { AiOutlineAppstore, AiOutlineEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { BsCardHeading } from "react-icons/bs";
import { store } from "../../../store";
import { unverifyCar, verifyCar, deleteById } from "../../../services/cars";
import { confirmDeleteMessage } from '../../../services/alerts';
import { IconContext } from "react-icons";
import { DEFAULT_ICON_SIZE } from "../../../constants/icon";

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

    const deleteCar = async (model) => {
        var result = await confirmDeleteMessage();

        if (result) {
            deleteById(model).then(() => {
                updateCars();
            });
        }
    }

    return (
        <IconContext.Provider value={{ className: 'icon' }}>
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
                                <AiOutlineInfoCircle size={DEFAULT_ICON_SIZE} />
                                <p>Registration number: {data.info.registrationNumber}</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <BsCardHeading size={DEFAULT_ICON_SIZE} />
                                <p>Technical passport: {data.info.technicalPassport}</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <IoShieldCheckmarkOutline size={DEFAULT_ICON_SIZE} />
                                <p>VIN: {data.info.vin}</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <AiOutlineEdit size={DEFAULT_ICON_SIZE} />
                                <p>Model: {data.info.model}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rightSide">
                        <div className="field-group">
                            <div className="field-group">
                                <div className="cardField">
                                    <AiOutlineAppstore size={DEFAULT_ICON_SIZE} />
                                    <p>Category: {data.info.category}</p>
                                </div>
                            </div>

                            <div className="cardField">
                                <GiWeight size={DEFAULT_ICON_SIZE} />
                                <p>Load capacity: {Math.round(data.info.loadCapacity)} kg</p>
                            </div>
                        </div>

                        <div className="field-group">
                            <div className="cardField">
                                <IoColorPaletteOutline size={DEFAULT_ICON_SIZE} />
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
                        <Button
                            type="danger"
                            onClick={() => deleteCar(data.info.id)}
                        >
                            Delete
                        </Button>
                    }
                </div>
            </Card>
        </IconContext.Provider>
    );
}

export default MyCar;
