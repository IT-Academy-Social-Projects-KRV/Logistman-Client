import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";
import { Result, Button } from 'antd';

const PrivateRoute = props => {
    const { isAuthUser, role, allowedRoles } = props;

    if (isAuthUser && allowedRoles.includes(role)) {
        return props.children;
    }
    if (isAuthUser && !allowedRoles.includes(role)) {
        return (
            <Result
                status="403"
                title="403"
                subTitle="You are not allowed to see this page."
            />
        );
        //return <Route component={() => <Redirect to="/login" />} />;
    }
    if (!isAuthUser) {
        return <Route component={() => <Redirect to="/login" />} />;
    }

    return <Route {...props} />;
};

const mapStateToProps = (stateRedux) => ({
    isAuthUser: stateRedux.authReducer.isAuthUser,
    role: stateRedux.authReducer.role
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
