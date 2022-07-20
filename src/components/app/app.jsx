import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from '../../services/actions/ingredientsActions';
import { getUser } from '../../services/actions/authActions';
import Modal from "../modal/modal";
import {Route, Switch, useLocation, useHistory, Routes} from "react-router-dom";
import PreLoader from "../preloader/preloader";
import HomePage from "../../pages/home";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientPage from "../../pages/ingredient";
import NotFoundPage from "../../pages/notFound";
import LoginPage from "../../pages/login";
import ProfilePage from "../../pages/profile";
import ProtectedRoute from "../ProtectedRoute";
import RegisterPage from "../../pages/register";
import RestorePasswordPage from "../../pages/restorePassword";
import ResetPasswordPage from "../../pages/resetPassword";
import ProfileOrdersPage from "../../pages/profileOrders";
import FeedPage from "../../pages/feed";


export default function App() {
    const dispatch = useDispatch();
    const isLoaded = useSelector(store => store.ingredients.isLoaded);
    const checked = useSelector(store => store.auth.checked);

    const location = useLocation();
    const history = useHistory();
    const page = location.state?.page;
    const to = page || location;
    const onModalClose = () => history.push(location.state.page);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            {!isLoaded || !checked ? (
                <PreLoader />
            ) : (
                <>
                    <AppHeader />
                    <DndProvider backend={HTML5Backend}>
                        <Switch location={to}>
                            <Route path="/" exact>
                                <HomePage />
                            </Route>

                            <Route path="/login" exact>
                                <ProtectedRoute authorizedOnly={false} redirectPath={location.state || "/"}>
                                    <LoginPage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="/register" exact>
                                <ProtectedRoute authorizedOnly={false} redirectPath="/profile">
                                    <RegisterPage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="/profile" exact>
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="/profile/orders" exact>
                                <ProtectedRoute>
                                    <ProfileOrdersPage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="/forgot-password" exact>
                                <ProtectedRoute authorizedOnly={false} redirectPath="/profile">
                                    <RestorePasswordPage />
                                </ProtectedRoute>
                            </Route>
                            <Route path="/forgot-password/reset" exact>
                                <ProtectedRoute authorizedOnly={false}  redirectPath="/profile">
                                    <ResetPasswordPage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="/ingredients/:id" exact>
                                <IngredientPage />
                            </Route>

                            <Route path="/feed" exact>
                                <FeedPage />
                            </Route>

                            <Route path="*">
                                <NotFoundPage />
                            </Route>
                        </Switch>
                        {page && (
                            <Route path="/ingredients/:id" exact>
                                <Modal onClose={onModalClose}>
                                    <IngredientDetails />
                                </Modal>
                            </Route>
                        )}
                    </DndProvider>
                </>
            )}
        </>
    );
};