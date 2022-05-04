import Header from "../navigation/header";
import { GetUserName } from "../../services/userService";

function MainPage() {
    GetUserName();

    return (
        <div className="mainPageBody">
            <Header />
            <h2 className="status">Just select your role!</h2>
            <div className="role-container">
                <div className="role-block">
                    <div className="role block-sender">Sender</div>
                    <div className="role block-recipiante">Recipiant</div>
                </div>
                <div className="role block-driver">Driver</div>
            </div>
        </div>
    );
}

export default MainPage;
