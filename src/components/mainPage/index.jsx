import React from "react";
import Header from "../navigation/header";

function MainPage() {

    return (
        <div className="mainPageBody">
            <Header />
            <h2 className="status">What do you want to do?</h2>
            <div className="role-container">
                <div className="role-block">
                    <div className="role block-sender">
                        <span>I can donate some goods</span>
                    </div>
                    <div className="role block-recipient">
                        <span>I need help</span>
                    </div>
                </div>
                <div className="role block-driver">
                    <span>I can deliver goods</span>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
