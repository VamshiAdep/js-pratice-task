const roles = {
  user: 'user',
  admin: 'admin',
  superAdmin: 'superAdmin'
};


function getUserRole() {
  return localStorage.getItem('userRole') || roles.user;
}


function setUserRole(role) {
  localStorage.setItem('userRole', role);
  updateCartUI();
}

function updateCartUI() {
  const role = getUserRole();
  const adminElements = document.querySelectorAll('.admin-only');
  const superAdminElements = document.querySelectorAll('.super-admin-only');

  adminElements.forEach(el => {
    el.style.display = (role === roles.admin || role === roles.superAdmin) ? 'block' : 'none';
  });

  superAdminElements.forEach(el => {
    el.style.display = (role === roles.superAdmin) ? 'block' : 'none';
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCartUI();
  updateRoleBasedUI()
})

class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.total = 0;
    this.updateTotal();
  }

  addItem(name, price, quantity) {
    const existingItem = this.items.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }

    this.updateTotal();
    this.saveCart();
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
    this.updateTotal();
    this.saveCart();
  }

  updateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
}

const cart = new ShoppingCart();

function addItem() {
  const name = document.getElementById("item-name").value.trim();
  const price = parseInt(document.getElementById("item-price").value);
  const quantity = parseInt(document.getElementById("item-quantity").value, 10);

  if (name && !isNaN(price) && price > 0 && !isNaN(quantity) && quantity > 0) {
    cart.addItem(name, price, quantity);
    updateCartUI();
  } else {
    alert("Please enter valid name, price, and quantity.");
  }
}

function removeItem(name) {
  cart.removeItem(name);
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartItemsContainer.innerHTML = "";
  cart.items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
      <span>${item.quantity}</span>
      <button onclick="removeItem('${item.name}')">Remove</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  totalElement.textContent = `Total: $${cart.total.toFixed(2)}`;
  updateRoleBasedUI();
}



function updateRoleBasedUI() {
  const role = getUserRole();
  const adminElements = document.querySelectorAll('.admin-only');
  const superAdminElements = document.querySelectorAll('.super-admin-only');

  adminElements.forEach(el => {
    el.style.display = (role === roles.admin || role === roles.superAdmin) ? 'block' : 'none';
  });

  superAdminElements.forEach(el => {
    el.style.display = (role === roles.superAdmin) ? 'block' : 'none';
  });
}

