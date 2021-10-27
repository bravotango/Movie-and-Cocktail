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
        removeSearchValue();
        removeError(); // we have a successful search, remove any errors
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

        setLocalStorageMovies(title);
        displayMovieTitles();
      })
      .catch(function (err) {
        setError(err);
      });
  }

  function getCocktail(cocktail) {
    console.log(cocktail);
    // fetch
  }

  // Events
  // On form submit
  $("form#searchMovie").on("submit", function (e) {
    e.preventDefault();
    getMovie(e.target[0].value);
  });

  // Movie title clicked
  $(document).on("click", ".movieTitle", function () {
    $(this).text();
    getMovie($(this).text());
    getCocktail(cocktail);
  });

  // On focus input - clear out the current value
  $("#userQuery").on("focus", function () {
    removeSearchValue();
  });

  function removeSearchValue() {
    $("#userQuery").val("");
  }

  function removeError() {
    $("#error").text("");
  }
  var addedLiquor = "Gin";
  var cocktail = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${addedLiquor}`;
  
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

  // function getDrink(requestDrinkUrl) {
  //   //var requestDrinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
  //   // fetch
  //   console.log(requestDrinkUrl);
  //   fetch(requestDrinkUrl)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //     });
  // }
  // var addedLiquor = "GiN";
  // var requestDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${addedLiquor}`;


});
