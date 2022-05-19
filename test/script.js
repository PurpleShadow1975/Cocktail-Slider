// search for cocktail function
document.querySelector(".button").addEventListener("click", getDrink);

// close the modal window function
function closeModal() {
  document.getElementById("cocktail").classList.add("hidden");
  document.getElementById("cocktail2").classList.remove("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector("input").value = "";
}

// fetch the cocktail function
function getDrink() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
      let cocktail = data.drinks[0];
      let cocktail2 = data.drinks[1];
      console.log(cocktail);

      // Show Cocktail window
      document.getElementById("cocktail").classList.remove("hidden");
      document.getElementById("cocktail2").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");

      // Instructions for cocktail
      document.querySelector(".instruction-content").innerText =
        cocktail.strInstructions;
      document.querySelector(".instruction-content2").innerText =
        cocktail2.strInstructions;

      // Set the Cocktail Image
      document.querySelector(
        ".modal"
      ).style.backgroundImage = `url("${cocktail.strDrinkThumb}")`;
      document.querySelector(
        ".modal2"
      ).style.backgroundImage = `url("${cocktail2.strDrinkThumb}")`;

      // Cocktail name as title
      document.getElementById("cocktail-name").innerText = cocktail.strDrink;
      document.getElementById("cocktail-name2").innerText = cocktail2.strDrink;

      // Ingredients and Measures
      let ingredients = [
        cocktail.strIngredient1,
        cocktail.strIngredient2,
        cocktail.strIngredient3,
        cocktail.strIngredient4,
        cocktail.strIngredient5,
        cocktail.strIngredient6,
        cocktail.strIngredient7,
        cocktail.strIngredient8,
        cocktail.strIngredient9,
        cocktail.strIngredient10,
        cocktail.strIngredient11,
        cocktail.strIngredient12,
        cocktail.strIngredient13,
        cocktail.strIngredient14,
        cocktail.strIngredient15,
      ];

      let measures = [
        cocktail.strMeasure1,
        cocktail.strMeasure2,
        cocktail.strMeasure3,
        cocktail.strMeasure4,
        cocktail.strMeasure5,
        cocktail.strMeasure6,
        cocktail.strMeasure7,
        cocktail.strMeasure8,
        cocktail.strMeasure9,
        cocktail.strMeasure10,
        cocktail.strMeasure11,
        cocktail.strMeasure12,
        cocktail.strMeasure13,
        cocktail.strMeasure14,
        cocktail.strMeasure15,
      ];

      // console.log(measures, ingredients);
      for (let i = 1; i < 16; i++) {
        if (measures[i - 1] !== null) {
          console.log(`ingredient--${i}`, measures[i - 1], ingredients[i - 1]);
          document.getElementById(`ingredient--${i}`).innerText =
            measures[i - 1] + ingredients[i - 1];
          document
            .getElementById(`ingredient--${i}`)
            .classList.add("ingredient-display");
        }
      }
    })
    .catch((err) => {
      document.getElementById("cocktail").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
      console.log(`error ${err}`);
    });
}
document.querySelector(".close-modal").addEventListener("click", closeModal);
