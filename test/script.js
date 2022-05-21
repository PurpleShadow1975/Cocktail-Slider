// search for cocktail function
document.getElementById("searchButton").addEventListener("click", getDrink);
document.getElementById("previous").addEventListener("click", previousCocktail);
document.getElementById("next").addEventListener("click", nextCocktail);

// close the modal window function
// N O T   W O R K I N G
function closeModal() {
  document.getElementById("cocktail").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".btn-wrapper").classList.add("hidden");
  document.querySelector("input").value = "";
  document.querySelector("ul").innerHTML = "";
}

let index = 0;

function nextCocktail() {
  console.log("1.", index);
  // console.log(cocktailArr, cocktailArr.length);
  index++;
  console.log("2.", index);

  if (index >= cocktailArr.length) {
    index = 1;
    console.log("3a.", index);
  } else if (index <= 0) {
    index = cocktailArr.length;
    console.log("3b.", index);
  }
  console.log("4.", index);

  document.getElementById(`cocktailId${index}`).classList.toggle("hidden");
  document.getElementById(`cocktailId${index + 1}`).classList.toggle("hidden");
  console.log(`cocktailId${index}`);
  console.log(`cocktailId${index + 1}`);

  // console.log("index", index);
  // console.log(`cocktailId${index}`);
  // console.log(`cocktailId${index + 1}`);

  // document.getElementById(`cocktailId${x}`).classList.add("hidden");
  // document.getElementById(`cocktailId${x + 1}`).classList.remove("hidden");

  // current cocktailId[num] needs to be hidden
  // cocktailId[num + 1] needs to be visible
  // if last cocktailId[num] then we have to go back to [1]
}

function previousCocktail() {
  console.log("Previous button clicked!");
  console.log("1.", index);
  // console.log(cocktailArr, cocktailArr.length);
  index--;
  console.log("2.", index);

  if (index >= cocktailArr.length) {
    index = 1;
    console.log("3a.", index);
  } else if (index < 0) {
    index = cocktailArr.length;
    console.log("3b.", index);
  }
  console.log("4.", index);

  document.getElementById(`cocktailId${index}`).classList.toggle("hidden");
  document.getElementById(`cocktailId${index - 1}`).classList.toggle("hidden");
  console.log(`cocktailId${index}`);
  console.log(`cocktailId${index - 1}`);
  // current cocktailId[num] needs to be hidden
  // cocktailId[num - 1] needs to be visible
  // if first cocktailId[num] then we have to go to [last]
}

let cocktailArr;
// fetch the cocktail function
function getDrink() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
      // Build a modal window for each cocktail in the array and stack it behind the first one (i.e. after the first, the rest needs to be hidden)
      cocktailArr = Array.from(data.drinks);
      let i = 0;
      cocktailArr.forEach((id) => {
        i++;
        const div = document.getElementById("cocktail");
        const clone = div.cloneNode(true);
        clone.id = `cocktailId${i}`;
        document.getElementById("carouselId").appendChild(clone);

        // Set the title of the cocktail, which is child 3 of the parent element
        let parent = document.getElementById(`cocktailId${i}`);
        let children = parent.childNodes;
        children[1].innerText = cocktailArr[i - 1].strDrink;

        //if it is the first clone, we need to remove hidden class
        if (i === 1) {
          document.getElementById(`cocktailId${i}`).classList.remove("hidden");
        }

        // If only one item in array we don't need buttons
        // if (cocktailArr.length === 1) {
        //   document.querySelector(".btn-wrapper").classList.add("hidden");
        // } else {
        //   document.querySelector(".btn-wrapper").classList.remove("hidden");
        // }
      });

      // If there is none....goto error

      // Build the contents of each modal window

      let cocktail = data.drinks[0];

      // Show Cocktail window
      // document.getElementById("cocktail").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
      document.querySelector(".btn-wrapper").classList.remove("hidden");

      // Instructions for cocktail
      document.querySelector(".instruction-content").innerText =
        cocktail.strInstructions;

      // Set the Cocktail Image
      document.querySelector(
        ".modal"
      ).style.backgroundImage = `url("${cocktail.strDrinkThumb}")`;

      // Cocktail name as title
      // document.getElementById("cocktail-name").innerText = cocktail.strDrink;
      // document.querySelector(".cocktail-name").innerText = cocktail.strDrink;

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
        if (measures[i - 1] !== null && measures[i - 1] !== "") {
          // console.log(`ingredient--${i}`, measures[i - 1], ingredients[i - 1]);
          let li = document.createElement("li");
          li.id = `ingredient--${i}`;
          li.innerText = measures[i - 1] + ingredients[i - 1];
          li.classList.add("ingredient-display");
          document.querySelector("ul").appendChild(li);

          // document.getElementById(`ingredient--${i}`).innerText =
          //   measures[i - 1] + ingredients[i - 1];
          // document
          //   .getElementById(`ingredient--${i}`)
          //   .classList.add("ingredient-display");
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
