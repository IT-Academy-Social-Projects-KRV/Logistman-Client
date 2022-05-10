import { Link } from "react-router-dom";
import Header from "../navigation/header";

function MainPage() {
    return (
        <div className="mainPageBody">
            <Header />
            <h2 className="status">What do you want to do?</h2>
            <div className="role-container">
                <div className="role-block">
                    <div className="role block-sender">
                        <Link className="role-link" to="/offer">
                            I can donate some goods
                        </Link>
                    </div>
                    <div className="role block-recipiant">
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
