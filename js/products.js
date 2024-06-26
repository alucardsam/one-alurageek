import { API } from "./API.js";

const listProducts = document.querySelector("[data-list]");
const form = document.querySelector("[data-form]");

async function loadProducts() {
  try {
    const productsByAPI = await API.loadProducts();
    productsByAPI.forEach(product => {
      listProducts.appendChild(createCard(product.id, product.name, product.price, product.image))
    });
    const btnDelete = document.querySelectorAll("img.btn-delete");
    btnDelete.forEach(btn => btn.addEventListener("click", async e => {
      e.preventDefault();
      const idProduct = btn.dataset.id;
      try {
        await API.deleteProduct(idProduct);
      } catch (e) {
        alert(e);
      }
    }));
  } catch (error) {
    listProducts.innerHTML = (error? `<h2>${error}</h2>`: `<h2>No se han agregado productos</h2>`);
  }
}

loadProducts();

function createCard(id, name, price, image) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML =
    `<img src="${image}" />
    <div class="card-container--info">
      <p>${name}</p>
      <div class="card-container--value">
        <p>$ ${price}</p>
        <img src="assets/trashIcon.png" class="btn-delete" data-id="${id}">
      </div>
    </div>`;
  return card;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const name = e.target.elements["name"].value;
  const price = e.target.elements["price"].value;
  const image = e.target.elements["image"].value;
  try {
    await API.createProduct(name, price, image);
  } catch (e) {
    alert(e);
  }
});

