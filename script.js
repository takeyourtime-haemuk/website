let cart = {
  items: [],
  total: 0
};

const products = {
  'octopus-ragu': {
    name: 'Octopus Ragu Recipe',
    price: 58620,
    ingredients: [
      {
        name: '통영상 돌문어 (1kg)',
        price: 31180
      },
      {
        name: 'Hunts 토마토 페이스트 (340g) × 2개',
        price: 10160
      },
      {
        name: '샐러리 (1포기)',
        price: 3980
      },
      {
        name: '델파파 유기농 엑스트라 버진 올리브오일 (250ml)',
        price: 13300
      }
    ]
  }
};

function addToCart(productId) {
  const product = products[productId];
  if (!product) return;

  // Add recipe and ingredients to cart
  cart.items = cart.items.concat([product, ...product.ingredients]);
  
  // Calculate total
  cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
  
  // Update cart count and content
  updateCartCount();
  updateCartContent();
  
  // Show cart page
  toggleCart(true);
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.items.length;
  }
}

function updateCartContent() {
  const cartContent = document.getElementById('cartContent');
  if (!cartContent) return;

  if (cart.items.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `;
    return;
  }

  cartContent.innerHTML = `
    <div class="cart-items">
      ${cart.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₩${item.price.toLocaleString()}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <div class="cart-total">
        <span>Total:</span>
        <span>₩${cart.total.toLocaleString()}</span>
      </div>
      <button class="checkout-button" onclick="checkout()">
        Proceed to Checkout
      </button>
    </div>
  `;
}

function toggleCart(show = null) {
  const cartPage = document.getElementById('cartPage');
  if (!cartPage) return;

  if (show === null) {
    cartPage.classList.toggle('active');
  } else {
    cartPage.classList.toggle('active', show);
  }

  updateCartContent();
}

function checkout() {
  // Implement checkout functionality here
  alert('Checkout functionality will be implemented soon!');
} 