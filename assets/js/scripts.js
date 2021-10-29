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
        getCocktailLiquor(data);
      })
      .catch(function (err) {
        console.log("setting error");
        setError(err);
      });
  }
  //API call to CocktailDB using alcohol type search
  function getCocktail(cocktail) {
    var cocktailURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`;

    // fetch
    fetch(cocktailURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayDrinkCarousel(data);
        console.log(data);
      });
  }

  function displayMovie(data) {
    console.log(data);
    var genre = data.Genre;
    var moviePlot = data.Plot;
    var posterLink = data.Poster;
    var runTime = data.Runtime;
    var title = data.Title;
    console.log(data);
    var movieTitle = `<h3> ${title}</h3>`;
    var moviePoster = `<img src='${posterLink}' class='responsive'>`;
    var movieInfo = $(`
        <span><h5>Synopsis:</h5><p> ${moviePlot}</p></span>
        <p>Genre: ${genre}</p>
        <p>Runtime: ${runTime}</p>
      `);
    $("#movieTitle").html(movieTitle);
    $("#moviePoster").html(moviePoster);
    $("#movieInfo").html(movieInfo);
  }
  //conditional to pick liquor type for cocktail search
  function getCocktailLiquor(data) {
    let genre = data.Genre.split(",");
    genre = genre[0];
    if (genre.includes("Animation") || genre.includes("Comedy")) {
      getCocktail("Gin");
    } else if (genre.includes("Action") || genre.includes("Crime")) {
      getCocktail("Vodka");
    } else if (genre.includes("Adventure")) {
      getCocktail("Tequila");
    } else if (genre.includes("Fantasy") || genre.includes("Sci-Fi")) {
      getCocktail("Rum");
    } else if (genre.includes("Drama") || genre.includes("Sport")) {
      getCocktail("Bourbon");
    } else if (genre.includes("Western")) {
      getCocktail("Bourbon");
    } else if (genre.includes("Romance")) {
      getCocktail("Brandy");
    } else {
      getCocktail("Tequila");
    }
  }

  //populates carousel with drink images w/ titles
  function displayDrinkCarousel(data) {
    //LEAVE LINE 105 FOR NOW!!!-JW
    // $("#drinks").empty();
    $("#item1").empty();
    $("#item2").empty();
    $("#item3").empty();
    $("#item4").empty();
    $("#item5").empty();
    let drinkArray = ["one", "two", "three", "four", "five"];
    //LEAVE THIS BLOCK FOR NOW!!!-JW
    // let drinkText = $(`<h3>Cocktail Suggestions</h3>`);
    // drinkText.css({ "text-align": "center" });
    // $("#drinks").prepend(drinkText);
    // let newDiv = $(`<div class='carousel'></div>`);
    // $("#drinks").append(newDiv);

    for (let i = 0; i < 5; i++) {
      let drink = data.drinks[i].strDrink;
      let drinkPic = data.drinks[i].strDrinkThumb;
      let drinkId = data.drinks[i].idDrink;
      let newIndexNumber = [i + 1];
      let image = $(`<img src ='${drinkPic}'>`);
      //LEAVE THIS BLOCK FOR NOW!!!-JW
      // let href = $(
      //   `<a class='carousel-item' href=#'${drinkArray[i]}'!><img src='${drinkPic}' 'width':'225px', 'height':'225px'></a>`
      // );
      // newDiv.append(href);

      $("#item" + newIndexNumber).attr("href", "page2.html?drinkID=" + drinkId);

      // lines 132-134 I was trying to append to html lines 33-39 to see if carousel would work-it did!

      $("#item" + newIndexNumber).text(drink);
      $("#item" + newIndexNumber).css({
        "font-size": "24px",
        "text-align": "center",
        color: "black",
      });
      $("#item" + newIndexNumber).append(image);
    }
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
  $(".carousel").carousel();
  $(document).on("click", "#recipeBtn", function () {
    movePage();
  });
});

// need to add drink ID from selection to local storage in order to put up recipe

//button on click to move to page 2
function movePage() {
  document.location.replace("./Page2.html");
}
