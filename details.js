

// Fetch and Render Products from API

const renderCards = (data) => {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear existing cards
    data.forEach(async (item) => {
      const card = document.createElement("div");
      card.classList.add("card", "col-md-4", "mb-3");
      const isValidImage = await validateImageUrl(item.image_link);
      if (!isValidImage || !item.description) {
        return;
      }
      card.innerHTML = `
      <img src="${
          item.image_link
      }" 
           class="card-img-top" 
           alt="${data.name}">
      </img>
  
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description.slice(0, 100)}...</p>
          <p class="card-price">$${item.price}</p>
          <button class="btn btn-primary add-to-cart">Add to Cart</button>
        </div>
      `;
      container.appendChild(card);
    });
  };
  
  const validateImageUrl = async (url) => {
    try {
      const response = await fetch(url, {method: "head"});
      return response.ok;
    } catch (error) {
      return false;
    }
  };
  // Fetch data from the API

 const apifunc = async() => {
  try{
const data = await   fetch(
  "https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush"
)

const response = await data.json()

localStorage.setItem("cards", JSON.stringify(response))
return response
  }catch(err){

    console.log(err, "errrr")

  }
 }
// Retrieve cards from LocalStorage

// Function to combine API data and LocalStorage data and render cards
async function displayCards() {
  const storedCards = JSON.parse(localStorage.getItem("cards")) || await apifunc();
console.log(storedCards, "inside")
  // Render all combined cards
  renderCards(storedCards);
}

// Call the displayCards function on page load
const search = document.getElementById("search");
search.addEventListener("input", async (e) => {
  console.log("search input changed");
  const searchTerm = e.target.value.toLowerCase();
  const storedCards = JSON.parse(localStorage.getItem("cards")) || [];

  const filteredCards =  getFilteredCards(storedCards, searchTerm);
  renderCards(filteredCards);
});

 function getFilteredCards(cards, searchTerm) {
  return cards.filter((card) => {
    return (
      card.name.toLowerCase().includes(searchTerm) 
     
    );
  });
}


displayCards()



