 /* Code for parsing user input and for calculating final price */

 /**
 * @description markupCalculator Calculates the final price 
 * @param {float} basePrice The base price 
 * @param {int} numberOfPeople The number of people required
 * @param {string} category The category of the goods
 * @param {string} currencySymbol Optional currency symbol if different from $
 * @returns {string} Returns the final price with currency symbol ($) and rounded to 2 d.p
 */ 
  markupCalculator = function(basePrice, numberOfPeople, category, currencySymbol) {
    var baseMarkup = 0.05,
        peopleMarkup = 0.012,
        pharmaMarkup = 0.075,
        foodMarkup = 0.13,
        electronicsMarkup = 0.02,
        finalPrice;

    //base markup -- applied first
    basePrice += basePrice * baseMarkup;
    finalPrice = basePrice;

    //people tax
    finalPrice += basePrice * (numberOfPeople * peopleMarkup);

    //category tax
    if (category == "pharma") {
        finalPrice += basePrice * pharmaMarkup;
    } else if (category == "food") {
        finalPrice += basePrice * foodMarkup;
    } else if (category == "elec") {
        finalPrice += basePrice * electronicsMarkup;
    } else {
        finalPrice += 0;
    }

    //Round to 2 d.p -- last place price is a number
    finalPrice = +finalPrice.toFixed(2);
    //Ref: @AGK @http://stackoverflow.com/questions/11832914/round-up-to-2-decimal-places-in-javascript
    
    return ((currencySymbol ? currencySymbol : '$') + finalPrice);
  };