import UserProfilePage from "./userProfile";
import {openModal} from "../../reduxActions/general";
import {connect} from "react-redux";

const mapState = (stateRedux) => {
    return {
        isModalOpen: stateRedux.generalReducer.isModalOpen
    };
}
const mapDispatchToProps = {
    openModal
}

export default connect(mapState, mapDispatchToProps)(UserProfilePage);
