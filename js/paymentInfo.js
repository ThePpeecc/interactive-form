//This js file handels all the functionallity in the payment fieldset

/*
-|Parameters: nil
-|Return: nil
-|Functions that hides all paymentinformation
*/
function hideAll() {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').hide();
}

/*
-|Parameters: event
-|Return: Bool
-|Event handelser for the payment dropdown box
*/
var paymentOptions = function(event) {
    //We tjek the value of the current
    switch (event.currentTarget.value) {
        case "credit card":
            //We first hide all of the options
            hideAll();
            //We show the selected payment options Information
            $('#credit-card').show();
            break;
        case "paypal":
            hideAll();
            $('#paypal').show();
            break;
        case "bitcoin":
            hideAll();
            $('#bitcoin').show();
            break;
    }
};

/*
-|Parameters: event
-|Return: Bool
-|This function makes sure that only numbers can be written in the credit-card inputs
*/
var onlyAllowNumbers = function(event) {
    //We get the character's keykode.
    var charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) //We make sure it is a number keyCode
        return false; //If it isent we return false
    return true; //Else we return true
};

//-->| Start of Credit-Card validation  |<--
/*
-|Parameters: int, int
-|Return: int
-|A helper function that just adds two numbers together
*/
function add(a, b) {
    return a + b;
}

/*
-|Parameters: String
-|Return: Bool
-|Here we calculate the Luhn value
*/
function calculateLuhn(number) {
    var individualNumbers = [];
    var startNumber = 0;

    //Here we reverse the numbers
    for (var i = number.length - 1; i >= 0; i--) { //We run through the numbers backwards
        individualNumbers[startNumber] = parseInt(number[i]);//We add the numbers to the new array
        startNumber++;
    }

    //Here we multiply the odd numbers by 2, and subtract 9, if the numbers is larger than 9
    for (i = 0; i < individualNumbers.length; i += 2) {
        var modifyedOdd = individualNumbers[i] * 2;//We multiply by 2
        if(modifyedOdd > 9) {//If the number is larger than 9
          modifyedOdd -= 9;//We subtract 9
        }
        individualNumbers[i] = modifyedOdd; //We add the new modified odd number
    }

    //Here we return 10 subtracted by all the numbers added together and taken to the modulus of 10
    return 10 - individualNumbers.reduce(add, 0) % 10;
}

/*
-|Parameters: String
-|Return: Bool
-|Here we validate the credit-card number
*/
function validateTheCreditCardNumber( cardNumber ) {
  var lastDigit = cardNumber.substring(cardNumber.length - 1, cardNumber.length); //Removes the last digit and saves it
  var numberWithNoLastDigit = cardNumber.substring(0, cardNumber.length - 1); //Removes the last digit from the number string and saves the string
  console.log(lastDigit);
  console.log(calculateLuhn(numberWithNoLastDigit));
  if (parseInt(lastDigit) == calculateLuhn(numberWithNoLastDigit)) { //We put the number into Luhn algorithem
    return true; //If the lastDigit is the same number as the calculateLuhn number, we return true
  }
  return false; //The lastDigit and the calculateLuhn number is not equal to each other, so we retrun false
}

/*
-|Parameters: nil
-|Return: Bool
-|Here we validate the Credit-Card number
*/
function validateCreditCard() {
    var toValidate = $("#cc-num").val(); //We get the credit-card number
    return validateTheCreditCardNumber(toValidate);//We validate the number
}
//-->| End of credit-card validation |<--

/*
-|Parameters: String
-|Return: nil
-|Adds the error class to the previos item in the DOM from the id
*/
function addErrorClass(id) {
    $(id).prev().addClass('error');
}

/*
-|Parameters: String
-|Return: nil
-|Removes the error class to the previos item in the DOM from the id
*/
function removeErrorClass(id) {
    $(id).prev().removeClass('error');
}

/*
-|Parameters: String
-|Return: Bool
-|This function Runs the code that tjek the individual parts of the credit card like zip and cvv
*/
function cardPartIsValid(id) {
    if (id === '#cc-num') { //If it is the credit-card number we are looking at
        if (validateCreditCard()) { //If we can validate the credit-card number
            removeErrorClass(id); //Remove the error class
            return true; //Return
        } else { //We cant validate the credit-card number
            addErrorClass(id); //We add the error class to the label
            return false; //We return false
        }
    } else if ($(id)[0].value !== '') { //We have either the zip or the cvv number, and tjek if they are empty
        removeErrorClass(id);
        return true;

    } else {
        addErrorClass(id);
        return false;
    }
}

/*
-|Parameters: nil
-|Return: Bool
-|This function makes sure that the payment Information is valid
*/
function paymentReady() {
    if ($('#payment')[0].value === 'credit card') { //We tjek if it is the credit-card option that is selected
        var ids = ['#cc-num', '#zip', '#cvv']; //We take all the id's for the different options with the credit-card
        var cardReadyBool = true;

        //We run through all the ids
        for (var id = 0; id < ids.length; id++) {
            if (!cardPartIsValid(ids[id])) { //If the card part is not valid
                cardReadyBool = false; //we will then return false
            }
        }
        return cardReadyBool; //We return either true or false
    }
    return true; //We have not selected the credit-card, so we must have selected paypal or bitcoin, therefore we return true
}

//We add all the events
$('#cc-num').keydown(onlyAllowNumbers);
$('#zip').keydown(onlyAllowNumbers);
$('#cvv').keydown(onlyAllowNumbers);
$('#payment').change(paymentOptions);

//We hide first all the options, but then show the credit-card as the standard option
hideAll();
$('#credit-card').show();
