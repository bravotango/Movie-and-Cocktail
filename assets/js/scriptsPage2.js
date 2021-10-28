// $(document).ready(function(){

//   });

$(document).ready(function () {

function getCocktail(cocktail) {
    var cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`;


    // fetch
    fetch(cocktailURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data)
      });
  } 

      var addedLiquor = "Gin";
      var cocktail = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${addedLiquor}`;


      getCocktail("Bourbon")



});