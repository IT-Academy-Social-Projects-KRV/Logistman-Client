import React from "react";
import { Card } from "antd";
import {
    FormOutlined,
    SnippetsOutlined,
    ContactsOutlined,
    ColumnWidthOutlined
} from "@ant-design/icons";
import { MdBrush, MdStickyNote2, MdList } from "react-icons/md";
import Text from "antd/es/typography/Text";
import bucket_icon from "../../../assets/images/cars/bucket.svg";
import heavy_icon from "../../../assets/images/cars/heavy.svg";
import apps_icon from "../../../assets/images/cars/apps.svg";
import info_icon from "../../../assets/images/cars/info.svg";
import insurance_icon from "../../../assets/images/cars/insurance.svg";
import passport_icon from "../../../assets/images/cars/passport.svg";

function Car(data) {
    console.log(data);
    return (
        <Card className="carCard">
            <div className="cardHead">
                <Text strong className="carStatus">

                    {data.info.isVerified ?
                        <p id="verified">Verified</p> :
                        <p id="unverified">Unverified</p>}
                </Text>
            </div>

            <div className="information">
                <div className="leftSide">
                    <div className="field-group">
                        <div className="cardField">
                            <img src={info_icon} className="fieldIcon" />
                            <p>Registration number: {data.info.registrationNumber}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={passport_icon} className="fieldIcon" />
                            <p>Technical passport: {data.info.technicalPassport}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={insurance_icon} className="fieldIcon" />
                            <p>VIN: {data.info.vin}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <FormOutlined className="fieldIcon" />
                            <p>Model: {data.info.model}</p>
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="field-group">
                        <div className="field-group">
                            <div className="cardField">
                                <img src={apps_icon} className="fieldIcon" />
                                <p>Category: {data.info.category}</p>
                            </div>
                        </div>

                        <div className="cardField">
                            <img src={heavy_icon} className="fieldIcon" />
                            <p>Load capacity: {data.info.loadCapacity}</p>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="cardField">
                            <img src={bucket_icon} className="fieldIcon" />
                            <p>Color: {data.info.color}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Car;
