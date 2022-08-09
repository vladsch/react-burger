import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import {useAppSelector} from "../services/store";
import {IChildren} from "../definitions/components/IChildren";

function ProtectedRoute({ children }: IChildren) {
    const auth = useAppSelector((store) => store.auth);
    const location = useLocation();

    if (!auth.isAuthorized) {
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }

    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;
