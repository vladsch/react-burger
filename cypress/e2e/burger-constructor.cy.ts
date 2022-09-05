/// <reference types="cypress" />

import {INGREDIENT_TYPE} from "../../src/definitions/enums/IngredientType";

describe('drag and drop ingredients', () => {
    before(() => {
        cy.visit('http://localhost:3000');
        cy.get('.burger-ingredient', {
            timeout: 5000
        }).should('be.visible');
    })

    function dragIngredientToConstructor(type: INGREDIENT_TYPE) {
        const elements = cy.get(`.burger-ingredient-${type}`);

        elements.first()
            .trigger('dragstart');
        cy.get('.constructor-ingredients')
            .first()
            .trigger('drop');
    }

    it('should drag bun from list and drop to constructor', () => {
        dragIngredientToConstructor(INGREDIENT_TYPE.BUN);

        cy.get(`.constructor-ingredients .constructor-ingredient-${INGREDIENT_TYPE.BUN}`)
            .should('have.length', 2);
        cy.get('.constructor-ingredients .constructor-ingredient')
            .should('have.length', 2);
    });

    it('should drag sauce from list and drop to constructor', () => {
        dragIngredientToConstructor(INGREDIENT_TYPE.SAUCE);

        cy.get(`.constructor-ingredients .constructor-ingredient-${INGREDIENT_TYPE.SAUCE}`)
            .should('have.length', 1);

        cy.get('.constructor-ingredients .constructor-ingredient')
            .should('have.length', 3);
    });

    it('should be login', function () {
        cy.contains('Оформить заказ').click();
        cy.get('.input_type_email .input__icon').click();
        cy.get('.input_type_email input').type('ex@example.com');
        cy.get('input[type=password]').click().type('123456789');
        cy.contains('Войти').click();
    });

    it('should be order', function () {
        cy.get('button').contains('Войти').click();
        cy.wait(4000);
        cy.contains('Оформить заказ').click();
        cy.get('.modal-window').should("exist");
        cy.contains('Оформляем заказ...');
        cy.intercept("POST", "https://norma.nomoreparties.space/api/orders").as('makeOrder');
        cy.wait('@makeOrder');

        cy.contains("идентификатор заказа");
        cy.contains("Ваш заказ начали готовить");
        cy.contains("Дождитесь готовности на орбитальной станции");

        cy.get('.close-modal-button').click();
        cy.get('.modal-window').should("not.exist");
    });
});

describe("modal windows with ingredient details work correctly", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should open modal window with ingredient details", function () {
        cy.get('.burger-ingredient-bun').first().click();
        cy.contains('Детали ингредиента');
    });

    it("should close modal window with ingredient details", function () {
        cy.get('.close-modal-button').first().click();
        cy.contains('Детали ингредиента').should("not.exist");
    });
});

describe("app should works with routes", function () {
    it("should open Feed page", function () {
        cy.get("a").contains("Лента заказов").click();
        cy.contains("Готовы");
        cy.contains("В работе");
        cy.contains("Выполнено за все время");
        cy.contains("Выполнено за сегодня");
    });
});