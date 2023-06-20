
$(function () {
  //Adds event listener to save button, saving user input to local storage with id as the key
    $(".saveBtn").on('click', function(){
      //Retrieve id of parent container
      var timeSlot = $(this).parent().attr("id");
      //Retrieve text typed into text area
      var scheduleItem = $(this).siblings("textarea").val();
      //saves to local storage
      localStorage.setItem(`${timeSlot}`, scheduleItem)
    })
    //As a bonus, set a buttons to clear individual entry, and one for all entries
    $(".clearBtn").on('click', function() {
      //Retrieve id of parent container
      var timeSlot = $(this).parent().attr("id");
      //saves to local storage
      localStorage.removeItem(`${timeSlot}`)
      //Clears text typed into text area
      $(this).siblings("textarea").val('')
    })
    //Clear All Entries
    $(".clearAllBtn").on('click', function(){
      localStorage.clear()
      $('.description').val('')
      
    })
 //```````````````````````````````````````````````````````````
  //Variable to get current hour in 24 hour time
    var currentHour = dayjs().hour()
    //target elements with the time-block class
    $('.time-block').each(function(){
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
        //adds class "past" if less than current time and disables textarea
        $(this).addClass("past")
        $(this).children("textarea").prop('disabled', true)
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
    
    

//````````````````````````````````````````````````````````````````````
  //Loop and apply function to all <div> children of #container 
    $('#container').children().each(function(){
      //save id of the div to variable
      var textId = $(this).attr("id")
      //retrieve item from local storage with a key that matches id
      var priorEntry = localStorage.getItem(`${textId}`)
      //sets the text to match value stored (if any) to its corresponding text area
      $(this).children("textarea").text(priorEntry)
    })
//`````````````````````````````````````````````````````````````````````
  //Defining the display format
  var now = dayjs().format("dddd[,] MMMM Do")
  //Display previously defined time
  $("#currentDay").text(now)
  
});
