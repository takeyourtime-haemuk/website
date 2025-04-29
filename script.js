let cart = {
  items: [],
  total: 0
};

const products = {
  'octopus-ragu': {
    name: 'Octopus Ragu Recipe',
    price: 59000,
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
  
  // Update cart count
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.items.length;
  }
} 