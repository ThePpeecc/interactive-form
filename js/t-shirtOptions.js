//This js file handels all the functionallity in the t-shirt fieldset

//Here we save all color options for all the differnt t-shirts
var savedOptions = $('#color').children();

/*
-|Parameters: event
-|Return: nil
-|Show/hide the different color options before choosing a t-shirt
*/

var tShirtOption = function( event ) {
  //First we tjek if the option that is selected is not any of the t-shirt options
  if ((this.value !== "js puns") && (this.value !== "heart js")) {
    //if it is not we hide the color option
    $('#colors-js-puns').hide();
  }else {
    //else we show them
    $('#colors-js-puns').show();

    //We reattach potential detached elements
    $('#color').append(savedOptions);
    var options = savedOptions;

    var i;

    //If it is js puns then we show the related color and if it is heart js we show its related colors
    switch (this.value) {
      case "js puns":
          i = 3;
        break;
      case "heart js":
          i = 0;
        break;
    }
    //Here we slice up the options and detach those that are not a color option of the selected t-shirt
    options.slice(i, i+3).detach();
  }
};

/*
-|Parameters: nil
-|Return: bool
-|We tjek if there have been a t-shirt selected
*/
function tShirtOptionReady() {
  //We tjek if they have taken a shirt
  if($('#design')[0].value !== 'Select Theme') {
    //If the have we retrun true, and hide the error message
    $('#tShirtError').hide();
    return true;
  }
  //else we show the error and retrun false
  $('#tShirtError').show();
  return false;
}

//Add error message if that is show if they haven't chosen a shirt.
$("<p class='error' id='tShirtError' style='font-size: 1rem;'>Don't forget to pick a T-Shirt</p>").hide().appendTo($('.shirt legend').after());

//add the events
$('#design').on('change', tShirtOption);
tShirtOption();
