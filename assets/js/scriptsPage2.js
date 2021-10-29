// $(document).ready(function(){

//   });

$(document).ready(function () {
  getCocktail();

  function getCocktail() {
    const drinkId = grabParameterFromQueryString("drinkId");
    var cocktailDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    // fetch
    fetch(cocktailDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayIngredients(data.drinks[0]);
        console.log(data);
      });
  }

  function grabParameterFromQueryString(parameter) {
    const urlParameters = window.location.search;
    if (urlParameters.indexOf(parameter) === -1) {
      return; //not found
    }
    const startOfValue = urlParameters.slice(urlParameters.indexOf(parameter) + parameter.length + 1);
    const endOfValue = startOfValue.indexOf("&") !== -1 ? startOfValue.indexOf("&") : startOfValue.length;
    return (value = startOfValue.slice(0, endOfValue));
  }

  function displayIngredients(ingredients) {
    console.log(ingredients.strIngredient1);
  }
});
