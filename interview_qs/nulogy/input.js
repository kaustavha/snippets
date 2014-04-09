 /** Code for input handlers and event listeners **/

  /**
  * @description Parses user input
  * @param {array} lines An array containing 3 fields, each representing a single field of input, i.e base price, n. of ppl, category
  * @returns {string} Returns the final price || Error message
  */ 
  parser = function(lines) {
    var basePrice = parseFloat(lines[0].toString().match(/\d+/g)),
        currencySymbol = lines[0].toString().match(/\W+/g),
        numberOfPeople = parseInt(lines[1].match(/\d+/g)),
        category = (function(word){
           //Ah yes, the magical thesaurus function!
           // It'd match against a list of all possible words, but alas, it is a lie
           //This is here since the spec specified 'pharmaceutical' markup but the example said drugs
           //This is not seperately defined, since a server or call, or better defined array would be more worth seperating
          if (word == ("pharmaceuticals" || "drugs" || "medicines" || "pharma" || "drug" || "medicine")) {
              word = "pharma";
          } else if (word == ("food" || "grub" || "edibles")) {
              word = "food";
          } else if (word == ("electronics")) {
              word == "elec";
          } else {
              word = word;
          }
          return word;
        }(lines[2].toString().toLowerCase())),
        err; //set to undefined

    function error(string) {
      err ? err : err = [];
      err.push(string);
    }

    if (lines.length !== 3) error("Too many lines!");  
    //type checks -- not too strict, we can have 1.5 peoples and $1.23456; we are forgiving and do them after parsing.
    if ((typeof basePrice !== "number") || isNaN(basePrice)) error("Base Price needs to be a number ");
    if ((typeof numberOfPeople !== "number") || isNaN(numberOfPeople)) error("Number of people needs to be a number ");
    if (typeof category !== "string") error("Category needs to be a string ");
    return (err ? err.toString() : markupCalculator(basePrice, numberOfPeople, category, currencySymbol));
  }; 

/**
  * These are the input handlers. The lack of a mvc framework or helper libraries 
  * requires manual dom node selection and normalization. At the end of this list are the event handler
  **/

  formInputHandler = function() {
    var bPrc = document.forms["constrainedInput"]["bPrc"].value,
        nPpl = document.forms["constrainedInput"]["nPpl"].value,
        cat = document.forms["constrainedInput"]["cat"].value;
    alert(parser([bPrc, nPpl, cat]));
  };

  contentEditableHandler = function() {
    var input = document.getElementById("freeInput"),
        nodeList = input.getElementsByTagName("div"),
        lines = [];
    //convert the nodelist into an array of lines
    for (var i = 0; i < nodeList.length; i++) {
      lines.push(nodeList[i].innerHTML);
    }
    //first lines of CE input isn't wrapped in a div 
    lines.unshift(input.innerHTML.match(/^.*?(?=\<)/));
    alert(parser(lines));
  };

  CSVHandler = function() {  
    // Check for File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
    var csv = document.getElementById('fileInput').files[0],
        reader = new FileReader();    
    //define function to exec on succesful file read
    reader.onloadend = function (file) {
      if (reader.error) alert("File read error:" + reader.error);
      var fileContents = reader.result,
          rows = fileContents.split("\n"),
          inputArray = [],
          outputArray = [];
      for (var i = 0; i < rows.length; i++) {
        //make sure the row isn't empty or just spaces
         if (rows[i] && rows[i].length !== 0 && rows[i].match(/\S/g)) {
          inputArray = rows[i].split(",");
          outputArray.push(parser(inputArray));
        }
      }
      alert(outputArray);
    }
    //read that file
    reader.readAsText(csv);
  };

//Event Listeners for buttons
document.getElementById('fileInput').addEventListener('change', CSVHandler, false);
document.getElementById('contentEditableInput').addEventListener('click', contentEditableHandler, false);
document.getElementById('formInput').addEventListener('click', formInputHandler, false);

