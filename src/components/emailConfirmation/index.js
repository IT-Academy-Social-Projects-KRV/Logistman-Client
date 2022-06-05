import React, {useEffect, useState} from 'react';
import {confirmEmail, confirmEmailAsync} from "../../services/authentication";

function ConfirmEmail(){
    let isConfirm = true;
    const [isConfirmData, setIsConfirmData] = useState(false);

    useEffect( async () => {
        let data = window.location.pathname.split('/');
        let tokenParts = data.slice(2, -1);

        let token = tokenParts.join('/');
        let email = data[data.length - 1];

        isConfirm = await confirmEmailAsync(email, token).then((result) =>{
            return result;
        })

        setIsConfirmData(isConfirm)
    });

    if(isConfirmData){
        return(
            <div className="authBody">
            <div className="center">

                <p className="title">Logistman</p>

                <h2 className="h2ConfirmEmail" >Your email has been </h2>

                <h1 className="confirm" >confirmed</h1>


            </div>
        </div>);
    }
    else {
        return(
            <div className="authBody">

            <div className="center">
                <p className="title">Logistman</p>

                <h2 className="h2ConfirmEmail" >
                    Your email
                    <span className="notConfirm"> hasn't </span>
                    been
                </h2>

                <h1 className="h2ConfirmEmail">confirmed</h1>

            </div>
        </div>);
    }

}

export default ConfirmEmail;
