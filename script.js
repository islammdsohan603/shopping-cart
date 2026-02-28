/* =========================
   Product Data
========================= */
const products = [
  { id: 1, name: "Product 1", price: 200, img: "../images/news-1.png" },
  { id: 2, name: "Product 2", price: 900, img: "../images/news-2.png" },
  { id: 3, name: "Product 3", price: 100, img: "../images/news-3.png" },
  { id: 4, name: "Product 4", price: 290, img: "../images/tea-1.png" },
  { id: 1, name: "Product 5", price: 200, img: "../images/tea-2.png" },
  { id: 2, name: "Product 6", price: 900, img: "../images/tea-3.png" },
  { id: 3, name: "Product 7", price: 100, img: "../images/tea-4.png" },
  { id: 4, name: "Product 8", price: 290, img: "../images/fresh-1.png" },
];


/* =========================
   Elements
========================= */
const listProduct = document.getElementById("listProduct");
const cartIcon = document.getElementById("cartIcon");
const cartTab = document.querySelector(".cartTab");
const closeBtn = document.querySelector(".closeBtn");
const listCart = document.querySelector(".listCart");
const totalPriceElement = document.querySelector(".totalPrice");
const countElement = document.querySelector(".countItem");


/* =========================
   Variables
========================= */
let carts = [];
let count = 0;


/* =========================
   Show Products
========================= */
function showProducts() {
  listProduct.innerHTML = "";

  products.forEach(product => {
    let div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow text-center";

    div.innerHTML = `
      <img src="${product.img}" class="mx-auto mb-2">
      <h3 class="font-bold">${product.name}</h3>
      <p class="font-bold">$${product.price}</p>
      <button class="addBtn mt-2 bg-amber-500 px-3 py-1 cursor-pointer rounded">
        Add to Cart
      </button>
    `;

    const btn = div.querySelector(".addBtn");

    btn.addEventListener("click", () => {
      addToCart(product.id);

      // ✅ UI change
      btn.classList.remove("bg-amber-500");
      btn.classList.add("bg-green-500");
      btn.innerText = "Added";
      btn.disabled = true;
    });

    listProduct.appendChild(div);
  });
}


showProducts();


/* =========================
   Add to Cart
========================= */
function addToCart(id) {
  count++;
  countElement.innerHTML = count;

  let position = carts.findIndex(item => item.id === id);

  if (position === -1) {
    carts.push({ id: id, qty: 1 });
  } else {
    carts[position].qty += 1;
  }

  renderCart();
}


/* =========================
   Render Cart
========================= */
function renderCart() {
  listCart.innerHTML = "";
  let total = 0;

  carts.forEach(item => {
    let product = products.find(p => p.id === item.id);
    total += product.price * item.qty;

    let div = document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

    div.innerHTML = `
      <div>
        <p class="font-bold">${product.name}</p>
        <p>$${product.price} × ${item.qty}</p>
      </div>
      <div>
        <button class="minus bg-red-400 px-2">-</button>
        <button class="plus bg-green-400 px-2">+</button>
      </div>
    `;

    // Increase
    div.querySelector(".plus").addEventListener("click", () => {
      item.qty++;
      count++;
      countElement.innerHTML = count;
      renderCart();
    });

    // Decrease
    div.querySelector(".minus").addEventListener("click", () => {
      item.qty--;
      count--;
      countElement.innerHTML = count;

      if (item.qty === 0) {
        carts = carts.filter(c => c.id !== item.id);
      }

      renderCart();
    });

    listCart.appendChild(div);
  });

  totalPriceElement.innerHTML = total;
}


/* =========================
   Cart Open / Close
========================= */
cartIcon.addEventListener("click", () => {
  cartTab.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.add("hidden");
});
