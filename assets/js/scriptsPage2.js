$(document).ready(function () {

    function getCocktail(cocktail) {
        // console.log(cocktail);
        // fetch
        fetch(cocktail)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            for(let i = 0; i < data.drinks.length; i++) {
                let drink = data.drinks[i].strDrink;
                let drinkPic = data.drinks[i].strDrinkThumb;

                let link = $("<a>");
                link.attr("href", "#image-" + [i]);
                console.log(link)
                // $(".lil-nav").append(link);

                let smallImage = $("<img>")
                smallImage.attr("src", drinkPic)
                smallImage.attr("class", "lil-nav-img")
                smallImage.width(200)
                smallImage.height(200)
                console.log(smallImage)
                console.log("#image-" + [i])
                $(".lil-nav").append(smallImage);
                smallImage.wrap(link);

                let largeImage = $("<img>");
                largeImage.attr("src", drinkPic)
                largeImage.attr("class", "gallery_img")
                largeImage.attr("id", "image-" + [i])
                console.log(largeImage)
                $(".gallery").append(largeImage);
                
                let drinkText = $("<h3>")
                $(".gallery").append(drink);
                $(".lil-nav").append(drink);
                $(".gallery").css("")

            }

    
          });
      } 

      var addedLiquor = "Gin";
      var cocktail = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${addedLiquor}`;
      
      getCocktail(cocktail);








});