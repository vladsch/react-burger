import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from '../../services/actions/ingredientsActions';
import styles from './app.module.css';
import loaderImage from "../../images/loader.svg";
import Modal from "../modal/modal";


export default function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.ingredients.ingredientsProgress);
    const [error, setError] = useState(false);

    useEffect(()=>{
        dispatch(getIngredients((data) => {
            if (!data) {
                setError(true);
            }
        }));
    }, [dispatch]);

    return (
        <>
            {isLoading ? (
                <div className={styles.mask}>
                    <img className={styles.loader} src={loaderImage} alt="Загрузка..." />
                </div>
            ) : (
                <div>
                    <AppHeader />
                    <DndProvider backend={HTML5Backend}>
                        <Main />
                    </DndProvider>
                </div>
            )}

            {error && (
                <Modal title={'Ошибка'} onClose={() => setError(null)}>
                    <div>
                        <p className='text text_type_main-large pb-20 pt-20'>
                            Не удалось получить данные с сервера!
                        </p>
                    </div>
                </Modal>
            )}
        </>
    );
};