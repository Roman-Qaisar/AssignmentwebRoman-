/* ShopEasy store logic: plain JavaScript only. */
const STORAGE_KEY = "shopeasy-cart-v1";

// Sample catalogue kept in store.js as required by the assignment.
let products = [{"id":1,"name":"NovaBook Air 14","price":899.0,"category":"computers","rating":4.7,"inStock":true,"image":"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=88","description":"Lightweight laptop for work and study."},{"id":2,"name":"Pulse Wireless Headphones","price":79.99,"category":"audio","rating":4.5,"inStock":true,"image":"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=88","description":"Comfortable over-ear sound with rich bass."},{"id":3,"name":"PixelPro Smartphone","price":649.0,"category":"phones","rating":4.6,"inStock":true,"image":"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=88","description":"A bright display and an excellent everyday camera."},{"id":4,"name":"Orbit Smart Watch","price":129.5,"category":"wearables","rating":4.2,"inStock":true,"image":"https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=88","description":"Track activity and stay connected on the go."},{"id":5,"name":"UltraView 27-inch Monitor","price":249.0,"category":"computers","rating":4.8,"inStock":true,"image":"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=88","description":"Sharp detail for productivity and entertainment."},{"id":6,"name":"BoomBox Mini Speaker","price":45.0,"category":"audio","rating":4.1,"inStock":true,"image":"https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=900&q=88","description":"Portable sound for your desk or weekend."},{"id":7,"name":"GamePad Wireless Controller","price":59.99,"category":"gaming","rating":4.4,"inStock":true,"image":"https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=900&q=88","description":"Responsive controls for your favourite games."},{"id":8,"name":"SnapShot Digital Camera","price":499.0,"category":"cameras","rating":4.3,"inStock":true,"image":"https://images.unsplash.com/photo-1510125659524-7ea5d7f8b4d1?auto=format&fit=crop&w=900&q=88","description":"Capture memorable moments in crisp detail."},{"id":9,"name":"KeyPro Mechanical Keyboard","price":89.0,"category":"computers","rating":4.6,"inStock":true,"image":"https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=88","description":"Tactile keys and a clean, compact layout."},{"id":10,"name":"PowerGo 20K Power Bank","price":34.99,"category":"accessories","rating":4.0,"inStock":true,"image":"https://images.unsplash.com/photo-1609592806596-b43bada0f7e3?auto=format&fit=crop&w=900&q=88","description":"Extra battery power when you need it most."},{"id":11,"name":"AirDots Pro Earbuds","price":69.0,"category":"audio","rating":4.4,"inStock":false,"image":"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=88","description":"Compact wireless earbuds with a snug fit."},{"id":12,"name":"USB-C Multiport Hub","price":29.99,"category":"accessories","rating":4.2,"inStock":true,"image":"https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=900&q=88","description":"Add useful ports to your laptop setup."},{"id":13,"name":"SlateTab 11 Tablet","price":329.0,"category":"phones","rating":4.5,"inStock":true,"image":"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85","description":"A crisp, lightweight tablet for reading, streaming and everyday tasks."},{"id":14,"name":"Studio Wireless Gaming Headset","price":89.99,"category":"gaming","rating":4.6,"inStock":true,"image":"https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=85","description":"Comfortable over-ear audio for long gaming sessions and calls."},{"id":15,"name":"ClearView HD Webcam","price":54.5,"category":"cameras","rating":4.3,"inStock":true,"image":"https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=900&q=85","description":"A compact webcam for online classes, meetings and streaming."},{"id":16,"name":"SwiftGlide Wireless Mouse","price":34.99,"category":"computers","rating":4.4,"inStock":true,"image":"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85","description":"A precise, comfortable mouse for work and everyday browsing."},{"id":17,"name":"SoundPod Bluetooth Speaker","price":69.0,"category":"audio","rating":4.5,"inStock":true,"image":"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85","description":"Room-filling sound in a compact speaker made for your desk."},{"id":18,"name":"TurboVault 1TB Portable SSD","price":109.99,"category":"accessories","rating":4.7,"inStock":true,"image":"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=85","description":"Fast portable storage for backups, projects and media libraries."},{"id":19,"name":"ActiveLoop Fitness Band","price":59.99,"category":"wearables","rating":4.2,"inStock":true,"image":"https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=900&q=85","description":"Track daily movement and keep your activity goals in view."},{"id":20,"name":"PlayCore Console Controller","price":64.99,"category":"gaming","rating":4.6,"inStock":true,"image":"https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=900&q=85","description":"Responsive wireless controls for casual and competitive play."},{"id":21,"name":"ChargeMate 65W USB-C Adapter","price":39.99,"category":"accessories","rating":4.4,"inStock":true,"image":"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85","description":"A compact fast charger for compatible laptops, tablets and phones."},{"id":22,"name":"Focus DSLR Camera Lens","price":219.0,"category":"cameras","rating":4.5,"inStock":true,"image":"https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=900&q=85","description":"A versatile camera lens for portraits, travel and creative projects."},{"id":23,"name":"LiftPro Aluminium Laptop Stand","price":42.0,"category":"computers","rating":4.6,"inStock":true,"image":"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=85","description":"Raise your laptop for a tidier desk and a more comfortable setup."},{"id":24,"name":"PocketBeam Mini Projector","price":189.0,"category":"accessories","rating":4.3,"inStock":true,"image":"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=85","description":"A compact projector for movie nights, presentations and travel."}]

// Restore the saved cart safely; invalid or unavailable storage starts with an empty cart.
let cart = (() => {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
})();

// Return a copy of the product list in the product grid.
function displayProducts(list) {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;
  grid.textContent = "";
  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${escapeHTML(product.image || "")}" alt="${escapeHTML(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='images/product-placeholder.svg';">
        ${product.inStock ? '<span class="stock-badge">In stock</span>' : '<span class="stock-badge out-of-stock">Out of stock</span>'}
      </div>
      <div class="product-card-content">
        <p class="product-category">${escapeHTML(product.category)}</p>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="product-description">${escapeHTML(product.description || "")}</p>
        <div class="product-card-bottom"><strong class="product-price">${formatMoney(product.price)}</strong><span class="rating" aria-label="Rating ${Number(product.rating).toFixed(1)} out of 5">★ ${Number(product.rating).toFixed(1)}</span></div>
        <button class="button button-primary add-button" type="button" data-action="add" data-id="${product.id}" ${product.inStock ? "" : "disabled"}>${product.inStock ? "Add to Cart" : "Out of stock"}</button>
      </div>`;
    grid.appendChild(card);
  });
}

// Escape text before placing product values into an HTML template.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

// Format sample prices consistently as Pakistani rupees.
function formatMoney(amount) {
  return "Rs " + Number(amount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Return products whose names contain the search text, ignoring capital letters.
function searchProducts(list, text) {
  const query = String(text || "").trim().toLowerCase();
  return list.filter((product) => product.name.toLowerCase().includes(query));
}

// Return products from the selected category, or all products when category is "all".
function filterByCategory(list, category) {
  if (category === "all") return [...list];
  return list.filter((product) => product.category === category);
}

// Return a sorted copy of the list by price without changing the original array.
function sortProducts(list, order) {
  const copy = [...list];
  if (order === "low") return copy.sort((a, b) => a.price - b.price);
  if (order === "high") return copy.sort((a, b) => b.price - a.price);
  return copy;
}

// Find a product by ID or return the required not-found message.
function getProductById(list, id) {
  return list.find((product) => Number(product.id) === Number(id)) || "Product not found";
}

// Add one item to the cart or increase its quantity, then save the cart.
function addToCart(id) {
  const product = getProductById(products, id);
  if (product === "Product not found" || !product.inStock) return false;
  const existing = cart.find((item) => Number(item.id) === Number(id));
  if (existing) {
    cart = cart.map((item) => Number(item.id) === Number(id) ? { ...item, quantity: item.quantity + 1 } : item);
  } else {
    cart = [...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
  }
  saveCart();
  return true;
}

// Return a new cart array without the selected product and save it.
function removeFromCart(id) {
  cart = cart.filter((item) => Number(item.id) !== Number(id));
  saveCart();
  return cart;
}

// Change quantity by the supplied amount and remove items that reach zero.
function updateQuantity(id, change) {
  cart = cart
    .map((item) => Number(item.id) === Number(id) ? { ...item, quantity: item.quantity + Number(change) } : item)
    .filter((item) => item.quantity > 0);
  saveCart();
  return cart;
}

// Return the sum of price multiplied by quantity for all cart items.
function getCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
}

// Add any number of prices, then subtract the given discount percentage.
function calculateBill(discount, ...prices) {
  const subtotal = prices.reduce((sum, price) => sum + Number(price), 0);
  return subtotal * (1 - Number(discount) / 100);
}

// Validate all checkout fields, show red field messages, and return true only if valid.
function validateCheckout() {
  const form = document.querySelector("#checkoutForm");
  if (!form) return false;
  let isValid = true;
  const fields = [...form.querySelectorAll("input, select, textarea")];
  fields.forEach((field) => {
    const errorElement = document.getElementById(field.id + "Error");
    let message = "";
    if (field.validity.valueMissing) message = "This field is required.";
    else if (field.validity.typeMismatch) message = "Please enter a valid " + (field.type === "email" ? "email address." : "value.");
    else if (field.validity.tooShort) message = "Please enter at least " + field.minLength + " characters.";
    else if (field.validity.patternMismatch) message = field.id === "phone" ? "Use 7–20 digits, spaces, or + ( ) - characters." : "Please enter a valid name using letters and common punctuation.";
    if (errorElement) errorElement.textContent = message;
    field.classList.toggle("invalid", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (message) isValid = false;
  });
  return isValid;
}

// Save cart state to localStorage and update cart indicators on the page.
function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    // The cart still works for this page view if browser storage is disabled.
  }
  updateCartCount();
}

// Update the visible cart quantity indicator in the navigation.
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
  document.querySelectorAll(".cart-count").forEach((element) => { element.textContent = count; });
}

// Render the cart table and grand total.
function renderCart() {
  const body = document.querySelector("#cartBody");
  if (!body) return;
  body.textContent = "";
  if (cart.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="5">Your cart is empty. <a href="products.html">Browse products</a>.</td>';
    body.appendChild(row);
  } else {
    cart.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="cart-product">${escapeHTML(item.name)}</td>
        <td>${formatMoney(item.price)}</td>
        <td><div class="quantity-controls" aria-label="Quantity for ${escapeHTML(item.name)}">
          <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Decrease ${escapeHTML(item.name)} quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" data-id="${item.id}" aria-label="Increase ${escapeHTML(item.name)} quantity">+</button>
        </div></td>
        <td>${formatMoney(item.price * item.quantity)}</td>
        <td><button type="button" class="remove-button" data-action="remove" data-id="${item.id}">Remove</button></td>`;
      body.appendChild(row);
    });
  }
  const total = document.querySelector("#grandTotal");
  if (total) total.textContent = formatMoney(getCartTotal(cart));
  updateCartCount();
}

// Attach native event listeners once the page elements are available.
function initialiseStoreEvents() {
  // Use one delegated listener on each product-grid parent, including the homepage featured grid.
  ["#productGrid", "#featuredGrid"].forEach((selector) => {
    const productGrid = document.querySelector(selector);
    if (!productGrid) return;
    productGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action='add']");
      if (!button || button.disabled || !productGrid.contains(button)) return;
      if (addToCart(button.dataset.id)) {
        renderCart();
        window.dispatchEvent(new CustomEvent("shopeasy:cart-updated"));
      }
    });
  });

  const cartBody = document.querySelector("#cartBody");
  if (cartBody) {
    cartBody.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const id = button.dataset.id;
      if (button.dataset.action === "increase") updateQuantity(id, 1);
      if (button.dataset.action === "decrease") updateQuantity(id, -1);
      if (button.dataset.action === "remove") removeFromCart(id);
      renderCart();
      window.dispatchEvent(new CustomEvent("shopeasy:cart-updated"));
    });
  }

  const search = document.querySelector("#searchInput");
  const category = document.querySelector("#categoryFilter");
  const sort = document.querySelector("#sortSelect");
  const applyFilters = () => {
    let shown = searchProducts(products, search ? search.value : "");
    shown = filterByCategory(shown, category ? category.value : "all");
    shown = sortProducts(shown, sort ? sort.value : "default");
    displayProducts(shown);
    const emptyState = document.querySelector("#emptyState");
    if (emptyState) emptyState.hidden = shown.length > 0;
    const status = document.querySelector("#catalogueStatus");
    if (status) status.textContent = shown.length + (shown.length === 1 ? " product found" : " products found");
  };
  if (search) search.addEventListener("input", applyFilters);
  if (category) category.addEventListener("change", applyFilters);
  if (sort) sort.addEventListener("change", applyFilters);
  window.applyShopEasyFilters = applyFilters;

  const checkoutForm = document.querySelector("#checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("input", (event) => {
      const field = event.target;
      const errorElement = document.getElementById(field.id + "Error");
      if (errorElement && field.checkValidity()) {
        errorElement.textContent = "";
        field.classList.remove("invalid");
        field.setAttribute("aria-invalid", "false");
      }
    });
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("#checkoutMessage");
      if (validateCheckout()) {
        message.textContent = "Checkout details look good! This is a demo, so no order or payment was submitted.";
        message.className = "checkout-message success-message";
      } else {
        message.textContent = "Please correct the highlighted fields before continuing.";
        message.className = "checkout-message error-message";
        const firstInvalid = checkoutForm.querySelector(".invalid");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("nav-open", !expanded);
    });
  }
}

initialiseStoreEvents();
updateCartCount();
renderCart();
