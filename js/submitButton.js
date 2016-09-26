//This js file handels all the functionallity that happens when the submit button is pressed

/*
-|Parameters: event
-|Return: nil
-|This function tjeks if all of the fieldSets are valid and ready
*/
var submitFunction = function( event ) {
  event.preventDefault();//Here just prevent the page from reloading
  //We run all the ready functions and store the return values in som values
  var br = basicInfoReady();
  var tr = tShirtOptionReady();
  var ar = activitiesReady();
  var pr = paymentReady();
  if(br && tr && ar && pr) {//We tjek if all the values are true
    location.reload();//If they are we reload the site
  }
};

//Adds the event to the submit function
$('#formSubmitButton').click(submitFunction);
