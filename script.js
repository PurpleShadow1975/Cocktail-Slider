//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector("button").addEventListener("click", getDrink);

function getDrink() {
  let drink = document.querySelector("input").value;

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let cocktailArr = data.drinks;
      // console.log(cocktailArr, cocktailArr.length);

      for (let i = 0; i < cocktailArr.length; i++) {
        let li = document.createElement("li");
        li.className = `li${i}`;
        document.querySelector("ul").appendChild(li);

        let div1 = document.createElement("div");
        div1.className = "box";
        li.appendChild(div1);

        let div2 = document.createElement("div");
        div2.className = "slide-img";
        div1.appendChild(div2);

        let img = document.createElement("img");
        img.id = "cocktailImage, cocktailImage";
        img.src = data.drinks[i].strDrinkThumb;
        div2.appendChild(img);

        let div3 = document.createElement("div");
        div3.className = "detail-box";
        div1.appendChild(div3);

        let div4 = document.createElement("div");
        div4.className = "type";
        div3.appendChild(div4);

        let h2 = document.createElement("h2");
        h2.innerText = data.drinks[i].strDrink;
        div4.appendChild(h2);

        // We will make the h2 a link that opens if you click on it.
        // let span = document.createElement("span");
        // span.innerText = data.drinks[i].strInstructions;
        // div4.appendChild(span);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// Todo

// need to clear previous search out
// need to make the top part responsive (search bar and h1)
// make the h2 a link with details that opens below
// cocktail names with more than one word search
// perhaps have option between alcoholic/non-alcoholic
// what if cocktail doesn't have an image?
// not too keen on the arrow buttons

// JavaScript Document
$(document).ready(function () {
  $("#autoWidth").lightSlider({
    autoWidth: true,
    loop: true,
    onSliderLoad: function () {
      $("#autoWidth").removeClass("cS-hidden");
    },
  });
});
