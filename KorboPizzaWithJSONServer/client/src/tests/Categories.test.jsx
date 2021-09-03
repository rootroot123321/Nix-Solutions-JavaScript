import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import { Categories } from "../components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";

let container = null;
const categoriesRender = (activeCategory, onSelectCategory, categories) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Categories
          activeCategory={activeCategory}
          onClickCategory={onSelectCategory}
          items={categories}
        />
      </BrowserRouter>
    </Provider>
  );
};
const fakeCategories = ["Острые", "Колбасные", "Грибные", "Сырные", "Закрытые"];
const onClickCategory = jest.fn();

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the categories data (unit)", () => {
  act(() => {
    render(categoriesRender(0, onClickCategory, fakeCategories), container);
  });
  let activeCategory = container.querySelector(".active");
  expect(activeCategory.textContent).toBe("Острые");
  const categories = container.querySelector(".categories > ul").children;
  for (let i = 0; i < fakeCategories.length; i++) {
    expect(categories[i + 1].textContent).toBe(fakeCategories[i]);
  }
  act(() => {
    categories[3].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onClickCategory).toHaveBeenCalledTimes(1);
  act(() => {
    render(categoriesRender(2, onClickCategory, fakeCategories), container);
  });
  expect(container.querySelector(".active").textContent).toBe("Грибные");
});

it("renders the categories data (snapshot)", () => {
  act(() => {
    render(categoriesRender(4, onClickCategory, fakeCategories), container);
  });
  let activeCategory = container.querySelector(".active");
  expect(pretty(activeCategory.textContent)).toMatchInlineSnapshot(
    `"Закрытые"`
  );
  const categories = container.querySelector(".categories > ul").children;
  for (let i = 0; i < fakeCategories.length; i++) {
    expect(pretty(categories[i + 1].textContent)).toMatchSnapshot();
  }
  act(() => {
    categories[3].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    render(categoriesRender(4, onClickCategory, fakeCategories), container);
  });
  expect(
    pretty(container.querySelector(".active").textContent)
  ).toMatchInlineSnapshot(`"Закрытые"`);
});
