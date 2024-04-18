const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false

function cleanInputString(str) {
    //console.log("original string: " , str);
    const regex = /[+-\s]/g; // g = global, s = whitespace
    return str.replace(regex, '');
  }
//console.log(cleanInputString("+-  99"));
function isInvalidInput(str) {
    const regex = /[0-9]+e\d+/i; //i = insensetive (uppercase or lowercase) d = digit [0-9]
    return str.match(regex);
}
//console.log(isInvalidInput("1e3"));
function addEntry() {
    const targetId = "#" +entryDropdown.value;
    const targetInputContainer = document.querySelector(`${targetId}+' .input-container'`);
}