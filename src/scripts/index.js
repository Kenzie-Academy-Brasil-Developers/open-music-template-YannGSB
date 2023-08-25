/* Desenvolva sua lógica aqui ... */

import { products, categories } from "./productsData.js";

const createCards = (array) => {
  const cardsContainer = document.querySelector(".cards__container");

  cardsContainer.innerHTML = "";

  array.forEach(({ title, price, band, year, img }) => {
    const container = document.createElement("div");
    container.classList.add("cards__renderedCardContainer");
    cardsContainer.appendChild(container);

    const image = document.createElement("img");
    image.classList.add("cards__img");
    image.src = img;
    image.alt = `Capa do album "${title}"`;
    container.appendChild(image);

    const paraInfo = document.createElement("p");
    paraInfo.classList.add("cards__bandInfo");
    container.appendChild(paraInfo);

    const spanName = document.createElement("span");
    spanName.classList.add("cards__spanName");
    spanName.innerText = band;
    paraInfo.appendChild(spanName);

    const spanYear = document.createElement("span");
    spanYear.classList.add("cards__spanYear");
    spanYear.innerText = year;
    paraInfo.appendChild(spanYear);

    const bandTitle = document.createElement("h2");
    bandTitle.classList.add("cards__albumTitle");
    bandTitle.innerText = title;
    container.appendChild(bandTitle);

    const spanPrice = document.createElement("span");
    spanPrice.classList.add("cards__priceSpan");
    container.appendChild(spanPrice);

    const paraPrice = document.createElement("p");
    paraPrice.classList.add("cards__albumPrice");
    paraPrice.innerText = `R$ ${price}.00`;
    spanPrice.appendChild(paraPrice);

    const purchaseBtn = document.createElement("button");
    purchaseBtn.classList.add("cards__purchaseBtn");
    purchaseBtn.innerText = "Comprar";
    purchaseBtn.type = "button";
    spanPrice.appendChild(purchaseBtn);
  });
};

const createButtons = (array) => {
  const buttonsContainer = document.querySelector(".filter__btnContainer");

  buttonsContainer.innerHTML = "";

  array.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.classList.add("filter__item");
    buttonsContainer.appendChild(listItem);

    const filterBtn = document.createElement("button");
    filterBtn.type = "button";
    filterBtn.classList.add("filter__btn");
    filterBtn.innerText = element;
    listItem.appendChild(filterBtn);
  });
};

const filterByCategory = (categorias, produtos) => {
  const buttons = document.querySelectorAll(".filter__btn");

  const input = document.querySelector(".filter__range");
  const itemPrice = document.querySelector(".filter__priceParagraph");

  input.addEventListener("input", () => {
    const arrPrice = produtos.price;
    itemPrice.innerText = `Até R$ ${input.value}`;

    const filteredByPrice = produtos.filter(
      (produto) => produto.price <= input.value
    );
    createCards(filteredByPrice);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const indexButton = categorias.indexOf(button.innerText);
      categorias.forEach((i) => {
        const indexCategory = categorias.indexOf(i);
        if (indexButton === 0 && indexCategory === 0) {
          createCards(products);
        } else if (indexCategory === indexButton) {
          const product = produtos.filter(
            (product) => product.category === indexCategory
          );
          createCards(product);
        }
      });
    });
  });
};

createCards(products);
createButtons(categories);
filterByCategory(categories, products);
