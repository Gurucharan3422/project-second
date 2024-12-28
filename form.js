document.getElementById("cardForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Collect form values
    const name = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image_link = document.getElementById("image").value;
  
    // Create an object for the card
    const card = { name, description, image_link };
  
    // Retrieve existing cards from LocalStorage
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
  
    // Add the new card to the stored cards
    storedCards.unshift(card);
  
    // Save updated cards array back to LocalStorage
    localStorage.setItem("cards", JSON.stringify(storedCards));

  
    // Display a success message
    const successMessage = document.createElement("p");
    successMessage.textContent = "Card added successfully!";
    successMessage.style.color = "green";
    document.body.appendChild(successMessage);
  
    
  })