//This js file handels all the functionallity in the basic fieldset

var nameField = $("input", $("fieldset")[0])[0];
var emailField = $("input", $("fieldset")[0])[1];

/*
-|Parameters: nil
-|Return: nil
-|Foucus on first field
*/
function focusFirstField() {
  //We find the first input in the first fieldSet, and focus on it
  nameField.focus();
}

/*
-|Parameters: event
-|Return: nil
-|Show/hide other cases for job role
*/
var jobRole = function( event ) {
  if(this.value === "other") {
    $('#otherTitle').show();
  }else {
    $('#otherTitle').hide();
  }
};

/*
-|Parameters: event
-|Return: nil
-|We tjek if the basicInfo is valid and ready for submition
*/
function basicInfoReady() {
  //Here we have a regular expression that is use to test a string for a valid email.
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //value we return
  var weReady = true;

  //We tjek if there is a name in the firstField
  if (nameField.value !== "") {
    //There is a name so we remove the class error form the label name
    $(nameField).prev().removeClass('error');
  }else {
    //Here we add the class error too the name label. This then show's the label as red
    $(nameField).prev().addClass('error');
    weReady = false;
  }
  //we test the email to see if it is valid
  if (re.test(emailField.value)) {
    $(emailField).prev().removeClass('error');
  }else {
    weReady = false;
    $(emailField).prev().addClass('error');
  }

  //We return, and if the forms in basicInfo is filled out correct it is true, else it is false
  return weReady;
}

//We add the event handeler
$("select", $("fieldset")[0]).on('change', jobRole);
//We run jobrole once so that otherTitle will be hidden
jobRole();
//We focus the first field
focusFirstField();
