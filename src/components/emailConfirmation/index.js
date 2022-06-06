import React, {useEffect} from 'react';
import {confirmEmailAsync} from "../../services/authentication";

function ConfirmEmail() {

    useEffect(async () => {
        let data = window.location.pathname.split('/');
        let tokenParts = data.slice(2, -1);
        let token = tokenParts.join('/');

        await confirmEmailAsync(token);
    });

    return (
        <div className="authBody">
            <div className="center">

                <p className="title">Logistman</p>

                <h2 className="h2ConfirmEmail">Your email has been </h2>

                <h1 className="confirm">confirmed</h1>

            </div>
        </div>);
}

export default ConfirmEmail;
