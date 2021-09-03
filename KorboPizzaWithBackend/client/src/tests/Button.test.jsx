import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Button} from "../components";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "../redux/store";

let container = null;

const buttonRender = (onClick, type, className, outline, children) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Button
                    onClick={onClick}
                    type={type}
                    className={className}
                    outline={outline}
                >
                    {children}
                </Button>
            </BrowserRouter>
        </Provider>
    );
};

const onClick = jest.fn();

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders the button (unit)", () => {
    act(() => {
        render(buttonRender(onClick, "submit", "button--circle", true), container);
    });
    let button = container.querySelector("button");
    expect(button.textContent).toBe("");
    expect(button.className).toEqual("button button--circle button--outline");
    expect(button.getAttribute("type")).toEqual("submit");
    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    act(() => {
        render(
            buttonRender(onClick, null, "button--black", false, "Test Button"),
            container
        );
    });
    button = container.querySelector("button");
    expect(button.textContent).toBe("Test Button");
    expect(button.className).toEqual("button button--black");
    expect(button.getAttribute("type")).toEqual(null);
});

it("renders the button (snapshot)", () => {
    act(() => {
        render(buttonRender(onClick, "submit", "button--submit", false), container);
    });
    let button = container.querySelector("button");
    expect(pretty(button.textContent)).toMatchInlineSnapshot(`""`);
    expect(pretty(button.className)).toMatchInlineSnapshot(
        `"button button--submit"`
    );
    expect(pretty(button.getAttribute("type"))).toMatchInlineSnapshot(`"submit"`);
    act(() => {
        render(
            buttonRender(onClick, null, "button--circle", true, "Second Button"),
            container
        );
    });
    button = container.querySelector("button");
    expect(pretty(button.textContent)).toMatchInlineSnapshot(`"Second Button"`);
    expect(pretty(button.className)).toMatchInlineSnapshot(
        `"button button--circle button--outline"`
    );
    expect(pretty(button.getAttribute("type"))).toMatchInlineSnapshot(`""`);
});
