import React, {useEffect} from 'react';
import {confirmEmailAsync} from "../../services/authentication";

function ConfirmEmailPage() {
    useEffect(() => {
        async function fetchData() {
            let data = window.location.pathname.split('/');
            let tokenParts = data.slice(2, -1);
            let token = tokenParts.join('/');

            await confirmEmailAsync(token);
        }

        fetchData();
    }, []);

    return (
        <div className="authEmail">
            <div className="center">
                <h1 className="title">Logistman</h1>

                <h2>Email confirmation</h2>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;
