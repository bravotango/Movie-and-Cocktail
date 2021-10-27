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
  displayMovieTitles();

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
        if (data.Response === "False") {
          console.log("We have an error");
          throw new Error(`${data.Error}`);
        }
        //removeSearchValue();
        removeError(); // we have a successful search, remove any errors
        displayMovie(data);

        setLocalStorageMovies(movie);
        displayMovieTitles();
      })
      .catch(function (err) {
        console.log("setting error");
        setError(err);
      });
  }

  function getCocktail(cocktail) {
    var cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`;
    // fetch
    fetch(cocktailURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var drink = data.drinks[0].strDrink;
        var drinkPic = data.drinks[0].strDrinkThumb;

        var drinkHTML = $(`<h4>${drink} <span id="moreDrinkInfo">(click the pic for recipe and more info.)</span></h4>
        <img src = '${drinkPic}' class="responsive">`);

        $("#drinks").empty();
        $("#drinks").append(drinkHTML);
      });
  }

  // getCocktail(cocktail);

  function displayMovie(data) {
    console.log(data);
    var genre = data.Genre;
    var moviePlot = data.Plot;
    var posterLink = data.Poster;
    var runTime = data.Runtime;
    var title = data.Title;
    console.log(data);

    var movieHTML = $(`
        <h3> ${title}</h3>
        <img src='${posterLink}'>
         <span><h5>Synopsis:</h5><p> ${moviePlot}</p></span>
        <p>Genre: ${genre}</p>
        <p>Runtime: ${runTime}</p>
      `);
    $("#movies").empty();
    $("#movies").append(movieHTML);
  }

  // Events
  // On form submit
  $("form#searchMovie").on("submit", function (e) {
    e.preventDefault();
    getMovie(e.target[0].value);
    getCocktail("gin");
  });

  // Movie title clicked
  $(document).on("click", ".movieTitle", function () {
    $(this).text();
    getMovie($(this).text());
    getCocktail("whiskey");
  });

  // On focus input - clear out the current value
  $("#userQuery").on("focus", function () {
    removeSearchValue();
  });

  function removeSearchValue() {
    $("#userQuery").val("");
  }

  function removeError() {
    console.log("removing error");
    $("#error").text("");
  }

  // getCocktail(cocktail);

  function setError(err) {
    $("#error").text(err);
  }

  function displayMovieTitles() {
    let searchList = $("#searchList");
    searchList.html("");
    let movies = getLocalStorageMovies();
    movies.sort();
    movies.forEach((title) => {
      var liEl = $("<li class='movieTitle btn'>");
      liEl.text(title);
      searchList.append(liEl);
    });
  }

  function setLocalStorageMovies(movieTitle) {
    let movieStorage = getLocalStorageMovies();
    if (movieTitle && (!movieStorage || !movieStorage.find((m) => m === movieTitle))) {
      // title not found add to local storage
      movieStorage.push(movieTitle);
      localStorage.setItem("movies", JSON.stringify(movieStorage));
    }
  }

  function getLocalStorageMovies() {
    let localStorageMovies = JSON.parse(localStorage.getItem("movies"));
    return localStorageMovies || [];
  }
});
