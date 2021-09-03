import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {CartItem} from "../components";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";

let container = null;
const cartItem = (
    id,
    name,
    type,
    size,
    totalPrice,
    totalCount,
    onPlus,
    onMinus,
    onRemove
) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <CartItem
                    id={id}
                    name={name}
                    type={type}
                    size={size}
                    totalPrice={totalPrice}
                    totalCount={totalCount}
                    onPlus={onPlus}
                    onMinus={onMinus}
                    onRemove={onRemove}
                />
            </BrowserRouter>
        </Provider>
    );
};

const onPlus = jest.fn();
const onMinus = jest.fn();
const onRemove = jest.fn();

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders the cart item data (unit)", () => {
    act(() => {
        render(
            cartItem(
                1,
                "Пицца Napoli",
                "толстое",
                40,
                1435,
                3,
                onPlus,
                onMinus,
                onRemove
            ),
            container
        );
    });
    expect(container.querySelector(".cart__item-info > h3").textContent).toBe(
        "Пицца Napoli"
    );
    expect(container.querySelector(".cart__item-info > p").textContent).toBe(
        "толстое тесто, 40 см."
    );
    const buttons = container.querySelectorAll(".cart__item-count > button");
    act(() => {
        for (let i = 0; i < buttons.length; i++) {
            for (let j = 0; j < 10; j++) {
                buttons[i].dispatchEvent(new MouseEvent("click", {bubbles: true}));
            }
        }
    });
    expect(onPlus).toHaveBeenCalledTimes(10);
    expect(onMinus).toHaveBeenCalledTimes(10);
    act(() => {
        container
            .querySelector(".cart__item-remove > button")
            .dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(onRemove).toHaveBeenCalledTimes(1);
});

it("renders the cart item data (snapshot)", () => {
    act(() => {
        render(
            cartItem(
                4,
                "Пицца Прошутто",
                "тонкое",
                24,
                4325,
                6,
                onPlus,
                onMinus,
                onRemove
            ),
            container
        );
    });
    expect(
        pretty(container.querySelector(".cart__item-info > h3").textContent)
    ).toMatchInlineSnapshot(`"Пицца Прошутто"`);
    expect(
        pretty(container.querySelector(".cart__item-info > p").textContent)
    ).toMatchInlineSnapshot(`"тонкое тесто, 24 см."`);
});
