import React, {useEffect} from 'react';
import {confirmEmailAsync} from "../../services/authentication";

function ConfirmEmailPage() {
    useEffect(async () => {
        let data = window.location.pathname.split('/');
        let tokenParts = data.slice(2, -1);
        let token = tokenParts[0];

        await confirmEmailAsync(token);
    }, []);

    return (
        <div className="authEmail">
            <div className="center">
                <h1 className="title">Logist</h1>

                <h2>Your email has been</h2>

                <h1 className="confirm">confirmed</h1>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;
