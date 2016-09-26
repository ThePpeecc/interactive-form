//This js file handels all the functionallity in the activities fieldset

//Here we hold all of the different checkbox's
var inputs = $('.activities').children('label');
//Here we hold the total pay
var totalPay = 0;

/*
-|Parameters: DOM-element
-|Return: String
-|This function gets the date assosiated with the input checkbox
*/
function getDateString( findDate ) {
  var newString = $(findDate).parent()[0].innerHTML; //We get the string value of the inputs parent element (type: label)
  var cutString = newString.substr(newString.search('—')+2, newString.length);//Here we cut the string at '—'
  return cutString.substr(0, cutString.search(','));//And here we cut the string again at ',', and returns the date string
}

/*
-|Parameters: DOM-element
-|Return: int
-|This function finds the index an activity that has the same date as the argument date
*/
function getIndexOfComparedDate(mainDate) {
  var allDates = $('.activities input'); //Here we get all the inputs with their respective dates
  for (var i = 0; i < allDates.length; i++) { //We go through all the dates
    if((mainDate !== allDates[i]) && (getDateString(allDates[i]) === getDateString(mainDate))) { //If it is not the event as mainDate, and the date is the same
      return i;//We return the index
    }
  }
  return -1; //If we did not find a date we return -1
}

/*
-|Parameters: event
-|Return: nil
-|This event is triggered when a checkboxs state is changed
*/
var checkboxEvent = function( event ) {

    if(this.name === 'all') { //this is an input type, and we check the name value
      addOrSubtractMony(this, 200);
    } else {
      if (getIndexOfComparedDate(this) !== -1) {//As long as it is not -1 we know we have an index we can work with
        enableOrDisable(getIndexOfComparedDate(this)); //Here we disable the other events, that are at the same time
      }
      addOrSubtractMony(this, 100); //We add or subtract money here
    }
};

/*
-|Parameters: DOM Object, int
-|Return: nil
-|Here we add or subtract money
*/
function addOrSubtractMony(box, monyToAdd) {//box is a checkbox and monyToAdd is an int
    if ($(box).is(':checked')) { //we tjek the state of box
        totalPay += monyToAdd;//If it is checked we add
    } else {
        totalPay -= monyToAdd;//if not, we subtract
    }
    if(totalPay < 0) {//Incase of a bug that makes the totalpay becomming less than 0
      totalPay = 0;
    }
  updatePay();//We update the pay
}

/*
-|Parameters: int
-|Return: nil
-|Here we enable/disable different input, depending on wether or not they already are disabled
*/
function enableOrDisable(index) {//Index is an index for the inputs array
    if ($('input', inputs[index]).attr('disabled') == "disabled") { //We tjek if it is disabled
        $('input', inputs[index]).attr('disabled', false);//If it is, we enable it
    } else {
        $('input', inputs[index]).attr('disabled', true);//if not, we disable it
    }
}

/*
-|Parameters: nil
-|Return: nil
-|Here we update the pay label
*/
function updatePay() {
  if (totalPay === 0) {//If we don't need to pay anything
    $('#totalPay').hide();//We hide the label
  }else {
    $('#totalPay').text('Total: $' + totalPay).show(); //Else, we update the label and show it
  }
}

/*
-|Parameters: nil
-|Return: nil
-|Here we just run through all the checkboxes and add teh checkboxEvent to them
*/
function addEvents() {
    for (var i = 0; i <= 6; i++) {
        $('input', inputs[i]).change(checkboxEvent);
    }
}

/*
-|Parameters: nil
-|Return: bool
-|This function tjeks if there has been selected an activity and returns true it there has been selected one
*/
function activitiesReady() {
  if(totalPay > 0) {
    $('#activitiesError').hide();
    return true;
  }
  $('#activitiesError').show();
  return false;
}

//Add error message if that is show if they haven't chosen a shirt.
$("<p class='error' id='activitiesError' style='font-size: 1rem;'>Please select an Activity</p>").hide().appendTo($('.activities legend').after());

//We add the events
addEvents();
