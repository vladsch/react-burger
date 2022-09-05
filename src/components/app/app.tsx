import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from '../../services/actions/ingredientsActions';
import { getUser } from '../../services/actions/authActions';
import Modal from "../modal/modal";
import {Route, Switch, useLocation, useHistory} from "react-router-dom";
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
import {useAppDispatch, useAppSelector} from "../../services/store";
import { History, LocationState } from "history";
import {ILocationState} from "../../definitions/ILocationState";
import OrderTapeCardDetails from "../order-tape-card-details/order-tape-card-details";
import OrderPage from "../../pages/order";


export default function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(store => store.ingredients.isLoaded);
    const checked = useAppSelector(store => store.auth.checked);

    const history: History<LocationState> = useHistory();
    const location: LocationState & ILocationState = useLocation();
    const page = location.state?.page;
    const to = page || location;
    const onModalClose = () => history.goBack();

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
                                <LoginPage />
                            </Route>

                            <Route path="/register" exact>
                                <RegisterPage />
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
                                <RestorePasswordPage />
                            </Route>
                            <Route path="/forgot-password/reset" exact>
                                <ResetPasswordPage />
                            </Route>

                            <Route path="/ingredients/:id" exact>
                                <IngredientPage />
                            </Route>

                            <Route path="/feed" exact>
                                <FeedPage />
                            </Route>

                            <Route path="/feed/:id" exact>
                                <OrderPage />
                            </Route>

                            <Route path="/profile/orders/:id" exact>
                                <ProtectedRoute>
                                    <OrderPage />
                                </ProtectedRoute>
                            </Route>

                            <Route path="*">
                                <NotFoundPage />
                            </Route>
                        </Switch>
                        {page && (
                            <Switch>
                                <Route path="/ingredients/:id" exact>
                                    <Modal onClose={onModalClose} title={'Детали ингредиента'}>
                                        <IngredientDetails />
                                    </Modal>
                                </Route>
                                <Route path="/feed/:id" exact>
                                    <Modal onClose={onModalClose}>
                                        <OrderTapeCardDetails />
                                    </Modal>
                                </Route>
                                <Route path="/profile/orders/:id" exact>
                                    <ProtectedRoute>
                                        <Modal onClose={onModalClose}>
                                            <OrderTapeCardDetails />
                                        </Modal>
                                    </ProtectedRoute>
                                </Route>
                            </Switch>
                        )}
                    </DndProvider>
                </>
            )}
        </>
    );
};