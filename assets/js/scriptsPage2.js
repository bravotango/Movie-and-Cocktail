// $(document).ready(function(){

//   });

$(document).ready(function () {

    $('.carousel').carousel();



let drinkArray = ['one', 'two', 'three', 'four', 'five'];
    function getCocktail(cocktail) {
        // console.log(cocktail);
        // fetch
        fetch(cocktail)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            for(let i = 0; i <= 4; i++) {
                let drink = data.drinks[i].strDrink;
                let drinkPic = data.drinks[i].strDrinkThumb;
                

                let link = $("<a>");
                link.attr("href", "#" + drinkArray[i] + "!");
                link.attr("class", "carousel-item")
                console.log(link)
                // $(".lil-nav").append(link);

                let smallImage = $("<img>")
                $(`#carousel${i}`).attr("src", drinkPic)
                // smallImage.attr("class", "carousel-item")
                // console.log(smallImage)
                // console.log("#image-" + [i])
                $(".carousel").append(smallImage);
                smallImage.wrap(link);

                let largeImage = $("<img>");
                largeImage.attr("src", drinkPic)
                largeImage.attr("class", "gallery_img")
                largeImage.attr("id", "image-" + [i])
                console.log(largeImage)
                $(".gallery").append(largeImage);
                
                let drinkText = $("<p>")
                $(".caro").append(drink);
                $(".lil-nav").append(drink);
                $(".gallery").css("")

            }

    
          });
      } 

      var addedLiquor = "Gin";
      var cocktail = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${addedLiquor}`;
      
      getCocktail(cocktail);








});