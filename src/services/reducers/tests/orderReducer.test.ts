import {orderReducer} from "../orderReducer";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_PROGRESS,
  MAKE_ORDER_SUCCESS,
  REMOVE_INGREDIENT,
  REORDER_INGREDIENT,
} from "../../actions/orderActions";
import {IOrderReducerState} from "../../../definitions/services/reducers/OrderReducer/IOrderReducerState";
import {IOrder} from "../../../definitions/models/IOrder";
import {ORDER_STATUS} from "../../../definitions/enums/OrderStatus";
import {IIngredient} from "../../../definitions/models/IIngredient";
import {INGREDIENT_TYPE} from "../../../definitions/enums/IngredientType";

const initialState: IOrderReducerState = {
  bun: null,
  ingredients: [],
  order: null,
  orderProgress: false,
  orderSuccess: false,
  orderFailed: false,
  totalPrice: 0,
}

test('should return the initial state order reducer', () => {
  expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should handle create order request', () => {
  const resultState: IOrderReducerState = { ...initialState, orderProgress: true };

  expect(orderReducer(initialState, { type: MAKE_ORDER_PROGRESS })).toEqual(resultState);
});

test('should handle create order request success', () => {
  const order:IOrder = {
    _id: '12345678',
    name: 'Классический бургер',
    ingredients: ['1', '2', '3'],
    status: ORDER_STATUS.PENDING,
    number: 123456,
    createdAt: '',
    updatedAt: '',
    total: 1,
    totalToday: 1
  };
  const previousState: IOrderReducerState = {
    ...initialState,
    orderProgress: true,
    orderFailed: true
  };
  const resultState: IOrderReducerState = {
    ...initialState,
    orderProgress: false,
    orderFailed: false,
    orderSuccess: true,
    order: order
  };

  expect(orderReducer(previousState, {
    type: MAKE_ORDER_SUCCESS,
    order: order
  })).toEqual(resultState);
});

test('should handle create order request failed', () => {
  const previousState: IOrderReducerState = {
    ...initialState,
    orderProgress: true
  };
  const resultState: IOrderReducerState = {
    ...initialState,
    orderProgress: false,
    orderFailed: true
  };

  expect(orderReducer(previousState, { type: MAKE_ORDER_FAILED })).toEqual(resultState);
});

test('should handle clear constructor', () => {
  const previousState: IOrderReducerState = {
    ...initialState,
    ingredients: [{} as IIngredient, {} as IIngredient, {} as IIngredient],
    bun: {} as IIngredient
  };

  expect(orderReducer(previousState, { type: CLEAR })).toEqual(initialState);
});

test('should handle add ingredient bun', () => {
  const bun: IIngredient = { _id: '1', type: INGREDIENT_TYPE.BUN } as IIngredient;
  const previousState: IOrderReducerState = {
    ...initialState
  };

  expect(orderReducer(previousState, {
    type: ADD_BUN,
    ingredient: bun
  })).toHaveProperty('bun', bun);
});

test('should handle add ingredient only one any ingredient except bun', () => {
  const ingredient: IIngredient = { _id: '1', type: 'sauce' } as IIngredient;
  const ingredients: Array<IIngredient> = [ingredient];
  const previousState: IOrderReducerState = {
    ...initialState,
    ingredients: ingredients
  };

  expect(orderReducer(previousState, {
    type: ADD_INGREDIENT,
    ingredient: ingredient
  }).ingredients).toContain(ingredient);
});

test('should handle remove constructor ingredient bun', () => {
  const sauce: IIngredient = { _id: "1", type: INGREDIENT_TYPE.SAUCE } as IIngredient;
  const ingredients: Array<IIngredient> = [sauce];
  const previousState: IOrderReducerState = {
    ...initialState,
    ingredients: ingredients
  };

  expect(orderReducer(previousState, {
    type: REMOVE_INGREDIENT,
    index: 0
  }).ingredients).toHaveProperty('length', 0);
});

test('should handle remove constructor ingredient except bun', () => {
  const firstIngredient: IIngredient = { _id: "1", type: INGREDIENT_TYPE.SAUCE } as IIngredient;
  const secondIngredient: IIngredient = { _id: "2", type: INGREDIENT_TYPE.SAUCE } as IIngredient;
  const ingredients: Array<IIngredient> = [firstIngredient, secondIngredient];
  const previousState: IOrderReducerState = { ...initialState, ingredients: ingredients };

  expect(orderReducer(previousState, {
    type: REMOVE_INGREDIENT,
    index: 1
  }).ingredients).toEqual([firstIngredient]);
});

test('should handle move constructor ingredient', () => {
  const firstIngredient: IIngredient = { _id: "1", type: INGREDIENT_TYPE.SAUCE } as IIngredient;
  const secondIngredient: IIngredient = { _id: "2", type: INGREDIENT_TYPE.SAUCE } as IIngredient;
  const thirdIngredient: IIngredient = { _id: "3", type: INGREDIENT_TYPE.SAUCE } as IIngredient;

  const ingredients: Array<IIngredient> = [firstIngredient, secondIngredient, thirdIngredient];
  const previousState: IOrderReducerState = { ...initialState, ingredients: ingredients };
  const resultIngredients: Array<IIngredient> = [thirdIngredient, firstIngredient, secondIngredient];
  const resultState: IOrderReducerState = { ...initialState, ingredients: resultIngredients };

  expect(orderReducer(previousState, {
    type: REORDER_INGREDIENT,
    from: 2,
    to: 0,
  })).toEqual(resultState);
});