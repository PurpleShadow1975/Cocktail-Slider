// search for cocktail function
document.querySelector(".search").addEventListener("click", getDrink);
document.querySelector(".previous").addEventListener("click", previousDrink);
document.querySelector(".next").addEventListener("click", nextDrink);
document.querySelector(".close-modal").addEventListener("click", closeModal);

// close the modal window
function closeModal() {
  document.getElementById("cocktail").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".btn-wrapper").classList.add("hidden");
  document.querySelector("input").value = "";
  document.querySelector("ul").innerHTML = "";
  document.querySelector(".instruction-content").innerText = "";
}

// open the modal window
function openModal() {
  document.getElementById("cocktail").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
}

// need to clear cocktail details before showing the next or previous one.
function clearCocktail() {
  document.getElementById("cocktail-name").innerText = "";
  document.querySelector("ul").innerHTML = "";
  document.querySelector(".instruction-content").innerText = "";
  document.querySelector(".modal").style.backgroundImage = "";
}

let arr = 0;

// next button
function nextDrink(arr) {
  clearCocktail(num);
  displayCocktails(num + 1);
  //TODO What to do when we reach the end of the cocktail list?
}

// previous button
function previousDrink(arr) {
  clearCocktail(num);
  displayCocktails(num - 1);
  //TODO What to do when we reach the beginning of the cocktail list?
}

// not found error
function notFound() {
  document.getElementById("cocktail").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
  document.getElementById("cocktail-name").innerText = "Sorry!";
  document.querySelector(".modal").style.backgroundImage = "";
  document.querySelector(".instruction-content").innerText =
    "We cannot find the cocktail you are looking for.";
}

// fetch the cocktail data
let cocktailArr;
let cocktailArrLength;

function getDrink() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
      cocktailArr = Array.from(data.drinks);
      cocktailArrLength = cocktailArr.length;

      if (cocktailArr !== undefined || cocktailArr !== null) {
        displayCocktails(0);
      }
    })
    .catch((err) => {
      notFound();

      // console.log(`error ${err}`);
    });
}

// populate the modal window with cocktail information
let num;
function displayCocktails(arr) {
  console.log(cocktailArr);
  num = arr;
  console.log(num);

  // If we have more than 1 cocktail we want to be able to loop through
  if (cocktailArrLength > 1) {
    document.querySelector(".btn-wrapper").classList.remove("hidden");
  }

  // Cocktail Name
  document.getElementById("cocktail-name").innerText =
    cocktailArr[num].strDrink;

  // Cocktail Image
  document.querySelector(
    ".modal"
  ).style.backgroundImage = `url("${cocktailArr[num].strDrinkThumb}")`;

  // Instructions for cocktail
  // TODO we still have cases where there is too much text? How to resolve?
  if (cocktailArr[num].strInstructions.length > 300) {
    document.querySelector(".instruction-content").style.fontSize = "1.4rem";
  } else {
    document.querySelector(".instruction-content").style.fontSize = "1.8rem";
  }
  document.querySelector(".instruction-content").innerText =
    cocktailArr[num].strInstructions;

  // Measures and Ingredients
  for (let i = 1; i < 16; i++) {
    let measure = cocktailArr[num]["strMeasure" + i];
    let ingredient = cocktailArr[num]["strIngredient" + i];

    if (
      // if there are more ingredients than measures needs to be checked
      // TODO
      (measure !== null && measure !== "") ||
      (ingredient !== null && ingredient !== "")
    ) {
      let li = document.createElement("li");
      li.id = `ingredient--${i}`;
      // TODO Perhaps an if statement here if measure is empty we just put ingredient in?
      li.innerText = measure + " " + ingredient;
      li.classList.add("ingredient-display");
      document.querySelector("ul").appendChild(li);
    }
  }
  openModal();
}
