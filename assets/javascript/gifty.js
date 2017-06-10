 $(document).ready(function(){
        //Create variables and arrays
        var foodMistakes= ["Grilling", "Baking", "Groceries", "Foodfight"];
        var foodAnimate= [];
        var foodStill= [];
        var foodCheck= [true, true, true, true, true, true, true, true, true, true];
        var queryURL;
        //Call buttoncreate and clicks function
        buttonCreate();
        buttonClick();
        foodSearch();
        //create the funtion to create buttons
        function buttonCreate(){
          $("#buttons").empty();
          //set i to 0 in the foodMistakes array and add as it goes through
          for (var i = 0; i < foodMistakes.length; i++){ 
          //setting queryURL to the url we look up plus the array data
          queryURL = "http://api.giphy.com/v1/gifs/search?q="+ foodMistakes[i]+"&limit=10&api_key=dc6zaTOxFJmzC";
          //set var foodBtn to button add the class foodButton set foodBtn to attribute data-food to query the url
          console.log(queryURL);
          var foodBtn = $("<button>");
          $(foodBtn).addClass("foodButton");
          $(foodBtn).attr("data-food", queryURL);
          $(foodBtn).text(foodMistakes[i]);
          $("#buttons").append(foodBtn);
        }
      }
      //create function for buttonClick
      function buttonClick(){
          //set on the click of foodButton function to listen
          $(".foodButton").on("click", function(){
          //at the click empty the gifs div.
          $("#gifs").empty();
          //set variable newURL to .foodButton attribute data-food
          var newURL=$(this).attr("data-food");
          /*console.log (newURL);*/
          //set the ajax call to pull data from the url
          $.ajax({
           url: newURL,
           method: "GET"
           //once data gathering has completed pass the response
         }).done(function(response) {
          //set j to go through the array each time the function is run
          for (var j = 0; j < 10; j++){
            //add the images using the array and data from each image to the gifs div
            $("#gifs").append("<div class='rating'><img src='"+response.data[j].images.original_still.url+"'class='pics' data-index='"+ j +"'><p>Rating: "+response.data[j].rating+"</p></div>" );
            //set foodStill array placement to the still image pulled
            foodStill[j]= response.data[j].images.original_still.url;
            //set foodAnimate array to the animated image pulled
            foodAnimate[j]= response.data[j].images.original.url;
          }
          //call the image click function
          imageClick();
        });
       });
        }
        //create function imageClick
        function imageClick(){
          //set the pics to listen for click
          $(".pics").on("click", function(){
          //set variable index = to pics data-index attribute
          var index = $(this).attr("data-index");
          //if the image called in foodCheck index is true aka still then set this which is pics to the animate index image
          if(foodCheck[index]===true){
            $(this).attr("src", foodAnimate[index]);
            foodCheck[index]=false;
            //if the image is animated aka false set pics attribute to still
          }else{
            $(this).attr("src", foodStill[index]);
            foodCheck[index]=true;
          }
        });
        }//creating function food search
        function foodSearch(){
          console.log("funtion running");
          //callind div find-food and listening for click function
          $("#find-food").on("click", function(event){
            //telling the form not to reset
            event.preventDefault();
            //creating variable newFood to equal div foodIssues value and triming out spaces if user entered
            var newFood = $("#foodIssues").val().trim();
            //telling newFood to add to food mistakes array
            foodMistakes.push(newFood);
            //calling button create and buttonclick function
            buttonCreate();
            buttonClick();
            //console.log("test");
          });
        }
      });