import NewCarModal from "./addCar";
import {closeModal, openModal} from "../../reduxActions/general";
import {connect} from "react-redux";

const mapState = () => {
    return {};
}
const mapDispatchToProps = {
    closeModal,
    openModal
}

export default connect(mapState, mapDispatchToProps)(NewCarModal);
