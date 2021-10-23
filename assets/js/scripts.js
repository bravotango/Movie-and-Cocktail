//~~~drinks are pulled from cocktail api slap and turned into cocktail object~~~

//input movie name

//click the button
//sammy

//slaps movie api and saves input to local storage
//David
//pulls genre, poster, rating

// with the genre we pull from cocktail object with suggested drinks

//create <aside> HTML with movie title, poster, rating and suggested drink with image

$(document).ready(function () {
  function movieSearch() {
    const movieTitle = $("#userQuery").val();
    getMovie(movieTitle);
    console.log("me");
  }

  function getMovie(movie) {
    const omdbApiKey = "dc038d01";
    let requestMovieURL = `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${movie}`;
    console.log(movie);
    // fetch
    fetch(requestMovieURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var genre = data.Genre;
        var moviePlot = data.Plot;
        var posterLink = data.Poster;
        var runTime = data.Runtime;
        var title = data.Title;
        console.log(data);
        var liEl = $("<li class ='movieTitle'>");
        liEl.text(title);
        $("#searchList").append(liEl);

        var movieHTML = $(`
          <h3> ${title}</h3>
          <img src='${posterLink}'>
           <span><h5>Synopsis:</h5><p> ${moviePlot}</p></span>
          <p>Genre: ${genre}</p>
          <p>Runtime: ${runTime}</p>
        `);
        $("#movies").empty();
        $("#movies").append(movieHTML);
      });
  }

  $(document).on("click", ".movieTitle", function () {
    $(this).text();
    getMovie($(this).text());
  });

  function getCocktail(cocktail) {
    console.log(cocktail);
    // fetch
  }
  getMovie("The Big Lebowski");
  getCocktail("White Russian");
  $("#searchBtn").on("click", movieSearch);
  function getDrink(requestDrinkUrl) {
    //var requestDrinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
    // fetch
    fetch(requestDrinkUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  var requestDrinkUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  var addedLiquor = "";
  getDrink(requestDrinkUrl);
});
