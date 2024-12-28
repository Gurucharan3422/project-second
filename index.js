
const navBarToggle = document.querySelector('.nav-bar-toggle');
const navBar = document.querySelector('.nav-bar');
console.log(navBarToggle,navBar);
navBarToggle.addEventListener('click', () => {
  navBar.classList.toggle('active');
});






// Function to create a new card and add it to the existing cards
document.getElementById("cardForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("image").value;

  // Create a new card element
  const card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "mb-4");

  card.innerHTML = `
    <div class="card">
      <img src="${imageUrl}" class="card-img-top" alt="Card image">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
      </div>
    </div>
  `;

  // Append the new card to the cards container
  document.getElementById("cardsContainer").appendChild(card);

  // Save to local storage
  saveToLocalStorage(title, description, imageUrl);

  // Reset form
  document.getElementById("cardForm").reset();
});

// Function to save card data to local storage
function saveToLocalStorage(title, description, imageUrl) {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];

  // Push new card data to cards array
  cards.push({ title, description, imageUrl });

  // Store updated cards array in local storage
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Function to load cards from local storage and render them
function loadCards() {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  
  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-lg-4", "col-md-6", "mb-4");

    cardElement.innerHTML = `
      <div class="card">
        <img src="${card.imageUrl}" class="card-img-top" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
        </div>
      </div>
    `;
    
    document.getElementById("cards-container").appendChild(cardElement);
  });
}

// Load existing cards on page load
document.addEventListener("DOMContentLoaded", loadCards);

// carts

// Function to add item to the cart
function addToCart(title, description, imageUrl, price) {
  // Retrieve the existing cart from local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Create a new item object
  const newItem = { title, description, imageUrl, price };

  // Add the new item to the cart
  cartItems.push(newItem);

  // Save the updated cart back to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart display
  displayCartItems();
}

// Function to display cart items
function displayCartItems() {
  // Retrieve cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Get the container where the cart items will be displayed
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = ""; // Clear previous cart items

  // Variables to track total items and total price
  let totalItems = 0;
  let totalPrice = 0;

  // Loop through the cart items and create HTML for each item
  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("col-lg-4", "col-md-6", "mb-4");

    cartItem.innerHTML = `
      <div class="card">
        <img src="${item.imageUrl}" class="card-img-top" alt="Card image">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">Price: $${item.price}</p>
          <button class="btn btn-danger" onclick="removeFromCart('${item.title}')">Remove</button>
        </div>
      </div>
    `;

    // Append each item to the cart container
    cartItemsContainer.appendChild(cartItem);

    // Update total items and total price
    totalItems += 1;
    totalPrice += item.price;
  });

  // Update the summary section
  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(title) {
  // Retrieve the cart from local storage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Filter out the item with the given title
  cartItems = cartItems.filter(item => item.title !== title);

  // Save the updated cart back to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart display
  displayCartItems();
}

// Function to load the cart items on page load
document.addEventListener("DOMContentLoaded", displayCartItems);



