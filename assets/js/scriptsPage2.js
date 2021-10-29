// $(document).ready(function(){

//   });

$(document).ready(function () {
  getCocktail("Bourbon");

  function getCocktail() {
    const drinkId = grabParameterFromQueryString("drinkID");
    var cocktailDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    console.log(cocktailDetails);
    // fetch
    fetch(cocktailDetails)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
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
    const value = startOfValue.slice(0, endOfValue);
    console.log(value);
    return value;
  }

  const drinkId = grabParameterFromQueryString("drinkId");
  const foo = grabParameterFromQueryString("foo");
  const blah = grabParameterFromQueryString("blah");

  console.log(drinkId, foo, blah);
});
