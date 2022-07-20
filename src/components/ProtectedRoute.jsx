import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({
    children,
    redirectPath = "/login",
    authorizedOnly = true,
}) {
    let auth = useSelector((store) => store.auth);
    const location = useLocation();

    if ((!auth.isAuthorized && authorizedOnly) || (auth.isAuthorized && !authorizedOnly)) {
        return <Redirect to={redirectPath} />;
    }

    return children;
}
ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    //redirectPath: PropTypes.string,
    authorizedOnly: PropTypes.bool
};
export default ProtectedRoute;
