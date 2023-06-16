
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  //Adds event listener to save button, saving user input to local storage with id as the key
    $(".saveBtn").on('click', function(){
      //Retrieve id of parent container
      var timeSlot = $(this).parent().attr("id");
      //Retrieve text typed into text area
      var scheduleItem = $(this).siblings("textarea").val();
      //saves to local storage
      localStorage.setItem(`${timeSlot}`, scheduleItem)
    })
    //As a bonus, sets a button to clear 
    $(".clearBtn").on('click', function(){
      var timeSlot = $(this).parent().attr("id");
      localStorage.clear()
      $('.description').val('')
      
    })
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //Variable to get current hour in 24 hour time
    var currentHour = dayjs().hour()
    //target children of #container that are <div> elements
    $('#container').children("div").each(function(){
      //Loop through each child element, comparing id to the current hour
      var textId = $(this).attr("id");
      //extracts digits from a string
      var regex = /\d+/;
      //Matches id of element to regex to extract an integer
      const matches = textId.match(regex)
      //As .match() returns an array, select first (and only in this case) item in array 
      const numStr = matches[0]
      //if-else chain to determine which class to add
      
      if (numStr < currentHour) {
        //adds class "past" if less than current time
        $(this).addClass("past")
      }
      //adds class "future" if greater 
      
      else if (numStr > currentHour) {
        $(this).addClass("future")
        
      }
      //otherwise, adds present class 
      else {
        $(this).addClass("present")
      }
    })
    
    

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //Loop and apply function to all <div> children of #container 
    $('#container').children().each(function(){
      //save id of the div to variable
      var textId = $(this).attr("id")
      //retrieve item from local storage with a key that matches id
      var priorEntry = localStorage.getItem(`${textId}`)
      //sets the text to match value stored (if any) to its corresponding text area
      $(this).children("textarea").text(priorEntry)
    })
  // TODO: Add code to display the current date in the header of the page.
  //Defining the display format
  var now = dayjs().format("dddd[,] MMMM Do")
  //Display previously defined time
  $("#currentDay").text(now)
  
});
