/* Desenvolva sua lógica aqui ... */

import { products, categories } from "./productsData.js";

const createCards = (array, value = 200) => {
  const cardsContainer = document.querySelector(".cards__container");

  cardsContainer.innerHTML = "";

  array.forEach(({ title, price, band, year, img }) => {
    if (price <= value) {
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
    }
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

  let filteredProducts = products;
  let filteredValue = 200;

  const buttons = document.querySelectorAll(".filter__btn");
  const input = document.querySelector(".filter__range");
  const itemPrice = document.querySelector(".filter__priceParagraph");

  input.addEventListener("input", () => {
    const inputValue = Number(input.value).toFixed(2)
    itemPrice.innerText = `Até R$ ${inputValue}`;
    filteredValue = inputValue;
    createCards(filteredProducts, filteredValue);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const indexButton = categorias.indexOf(button.innerText);
      categorias.forEach((i) => {
        const indexCategory = categorias.indexOf(i);
        if (indexButton === 0 && indexCategory === 0) {
          filteredProducts = products
          createCards(products);
        } else if (indexCategory === indexButton) {
          filteredProducts = produtos.filter(
            (product) => product.category === indexCategory
          );
          createCards(filteredProducts, filteredValue);
        }
      });
    });
  });
};

const handleDarkMode = () => {
  const button = document.querySelector(".header__btn");
  const html = document.querySelector("html");

  button.addEventListener("click", () => {
    html.classList.toggle("dark__mode");
    if (html.classList.contains("dark__mode")) {
      localStorage.setItem("darkMode", true);
      iconDarkMode.src = "../src/assets/img/sun.svg";
    } else {
      localStorage.setItem("darkMode", false);
      iconDarkMode.src = "../src/assets/img/moon.svg";
    }
  });
  const darkModeBoolean = JSON.parse(localStorage.getItem("darkMode"));
  const iconDarkMode = document.createElement("img");
  iconDarkMode.alt = "Dark mode on/off";
  iconDarkMode.classList.add("filter__btnImg");
  button.appendChild(iconDarkMode);

  if (darkModeBoolean) {
    iconDarkMode.src = "../src/assets/img/sun.svg";
    html.classList.add("dark__mode");
    localStorage.setItem("darkMode", true);
  } else {
    iconDarkMode.src = "../src/assets/img/moon.svg";
    localStorage.setItem("darkMode", false);
  }
};

createCards(products);
createButtons(categories);
filterByCategory(categories, products);
handleDarkMode();
