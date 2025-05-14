let cart = {
  items: [],
  total: 0
};

const products = {
  'octopus-ragu': {
    name: 'Octopus Ragu Recipe',
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

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('haemukCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('haemukCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

function addToCart(productId) {
  const product = products[productId];
  if (!product) return;

  // Add only ingredients to cart
  cart.items = cart.items.concat(product.ingredients);
  
  // Calculate total from ingredients only
  cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
  
  // Update cart count
  updateCartCount();
  
  // Save cart
  saveCart();
  
  // Navigate to cart page
  window.location.href = '/cart.html';
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
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
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

function checkout() {
  // Implement checkout functionality here
  alert('Checkout functionality will be implemented soon!');
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  
  // Add click handler to cart icon
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      window.location.href = '/cart.html';
    });
  }
});

// Tab functionality
function openTab(tabName) {
  // Hide all tab content
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Show the selected tab content
  document.getElementById(tabName).classList.add('active');
  
  // Add active class to the clicked button
  document.querySelector(`button[onclick="openTab('${tabName}')"]`).classList.add('active');

  // Update URL hash without scrolling
  history.pushState(null, '', `#${tabName}`);
}

// Handle initial tab based on URL hash
function handleInitialTab() {
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    openTab(hash);
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  // Handle initial tab
  handleInitialTab();

  // Add animation to features on scroll
  const features = document.querySelectorAll('.feature-item');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = 'all 0.6s ease-out';
    observer.observe(feature);
  });

  // Handle back/forward browser navigation
  window.addEventListener('popstate', handleInitialTab);
}); 