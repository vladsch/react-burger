import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import {CONSTS} from '../../utils/consts';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

export default function App() {
    const [ingredients, setIngredients] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [invalidateData, setInvalidateData] = React.useState(0);

    React.useEffect(()=> {
        fetch(CONSTS.INGREDIENTS_URL)
            .then(response => response.json())
            .then(json => {
                if (json && json.success) {
                    setIngredients(json.data);
                }
            })
            .catch(error => {
                setError(error);
            });
    }, [invalidateData]);

    return (
        <div>
            <AppHeader />
            <Main ingredients={ingredients} />

            {error && (
                <Modal title={'Ошибка'} onClose={() => setError(null)}>
                    <div style={{'text-align': 'center'}}>
                        <p className='text text_type_main-large pb-20 pt-20'>
                            Не удалось получить данные с сервера!
                        </p>
                        <Button type='primary' size='large' onClick={() => setInvalidateData(invalidateData + 1)}>
                            Попробовать снова
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};