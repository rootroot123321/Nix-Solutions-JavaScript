import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {SortPopup} from "../components";
import store from "../redux/store";

let container = null;
const sortPopup = (activeSortType, items, onClickSortType) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SortPopup
                    activeSortType={activeSortType}
                    items={items}
                    onClickSortType={onClickSortType}
                />
            </BrowserRouter>
        </Provider>
    );
};
const fakePopup = [
    {name: "цене", type: "price", order: "desc"},
    {name: "алфавиту", type: "name", order: "asc"},
    {name: "популярности", type: "popular", order: "desc"},
    {name: "дате добавления", type: "added", order: "desc"},
    {name: "дате обновления", type: "updated", order: "desc"},
    {name: "качеству", type: "quality", order: "desc"},
    {name: "продаваемости", type: "sell", order: "asc"},
];
const onClickSortType = jest.fn();

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders the sort popup data (unit)", () => {
    act(() => {
        render(sortPopup("price", fakePopup, onClickSortType), container);
    });
    expect(
        container.querySelector("[data-testid=active-label]").textContent
    ).toBe("цене");
    const activeLabel = container.querySelector("[data-testid=active-label]");
    act(() => {
        activeLabel.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    for (let i = 0; i < fakePopup.length; i++) {
        expect(
            container.querySelector(".sort__popup > ul").children[i].textContent
        ).toBe(fakePopup[i].name);
    }
    const label = container.querySelector(".sort__popup > ul").children[3];
    act(() => {
        label.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(onClickSortType).toHaveBeenCalledTimes(1);
    const next = fakePopup.filter((item) => item.name === label.textContent)[0];
    act(() => {
        render(sortPopup(next.type, fakePopup, onClickSortType), container);
    });
    expect(
        container.querySelector("[data-testid=active-label]").textContent
    ).toBe("дате добавления");
});

it("renders the sort popup data (snapshot)", () => {
    act(() => {
        render(sortPopup("name", fakePopup, onClickSortType), container);
    });
    expect(
        pretty(container.querySelector("[data-testid=active-label]").textContent)
    ).toMatchInlineSnapshot(`"алфавиту"`);
    const activeLabel = container.querySelector("[data-testid=active-label]");
    act(() => {
        activeLabel.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    for (let i = 0; i < fakePopup.length; i++) {
        expect(
            pretty(
                container.querySelector(".sort__popup > ul").children[i].textContent
            )
        ).toMatchSnapshot();
    }
    const label = container.querySelector(".sort__popup > ul").children[6];
    act(() => {
        label.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    const next = fakePopup.filter((item) => item.name === label.textContent)[0];
    act(() => {
        render(sortPopup(next.type, fakePopup, onClickSortType), container);
    });
    expect(
        pretty(container.querySelector("[data-testid=active-label]").textContent)
    ).toMatchInlineSnapshot(`"продаваемости"`);
});
