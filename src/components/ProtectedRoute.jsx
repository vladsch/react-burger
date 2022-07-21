import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({
    children
}) {
    const auth = useSelector((store) => store.auth);
    const location = useLocation();

    if (!auth.isAuthorized) {
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }

    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
};
export default ProtectedRoute;
