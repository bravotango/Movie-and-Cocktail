$(document).ready(function () {
  getCocktail();

  function getCocktail() {
    const drinkId = grabParameterFromQueryString("drinkID");
    var cocktailDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    //console.log(cocktailDetails);
    // fetch
    fetch(cocktailDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayIngredients(data.drinks[0]);
        displayDrinkPic(data.drinks[0]);

        //console.log(data);
      });
  }

  function grabParameterFromQueryString(parameter) {
    const urlParameters = window.location.search;
    if (urlParameters.indexOf(parameter) === -1) {
      return; //not found
    }
    const startOfValue = urlParameters.slice(
      urlParameters.indexOf(parameter) + parameter.length + 1
    );
    const endOfValue =
      startOfValue.indexOf("&") !== -1
        ? startOfValue.indexOf("&")
        : startOfValue.length;
    return (value = startOfValue.slice(0, endOfValue));
  }

  function displayIngredients(ingredients) {
    for (let i = 1; i <= 15; i++) {
      var ingredient = eval(`ingredients.strIngredient${i}`);
      if (!ingredient) {
        return;
      }
      // do your jQuery html magic
      // p
      var liEl = `
      <li>${ingredient}</li>`;
      $("#ingredients").append(liEl);
      console.log(ingredient);
    }
  }
  //display large drink pic on screen
  function displayDrinkPic (drinkPic) {
    var drinkPic = $(`<img src = ${drinkPic.strDrinkThumb}>`)
  $("#drinkPic").append(drinkPic);
  }


});
