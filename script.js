let cart = {
  items: [],
  total: 0
};

const products = {
  'octopus-ragu': {
    name: 'Octopus Ragu Recipe',
    price: 45000,
    ingredients: [
      {
        name: '통영산 돌문어 3kg 1마리',
        price: 35000
      },
      {
        name: 'Hunts 토마토 페이스트 300g X 2개',
        price: 6000
      },
      {
        name: 'Dececo 리가토니 면',
        price: 4000
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