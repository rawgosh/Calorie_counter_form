// Get DOM elements
const calorieCounter = document.getElementById("calorie-counter"); // Reference to the form element
const budgetNumberInput = document.getElementById("budget"); // Reference to the input field for budget
const entryDropdown = document.getElementById("entry-dropdown"); // Reference to the dropdown menu for selecting entry types
const addEntryButton = document.getElementById("add-entry"); // Reference to the button for adding entry fields dynamically
const clearButton = document.getElementById("clear"); // Reference to the button for clearing the form
const output = document.getElementById("output"); // Reference to the output container for displaying results
let isError = false; // Flag to track if there's an error during input validation

// Function to remove special characters and whitespace from input string
function cleanInputString(str) {
    const regex = /[+-\s]/g; // Regular expression to match plus, minus, and whitespace characters
    return str.replace(regex, ''); // Remove matched characters from the input string
}

// Function to check if input string contains invalid characters (exponential notation)
function isInvalidInput(str) {
    const regex = /[0-9]+e\d+/i; // Regular expression to match exponential notation (e.g., 1e3)
    return str.match(regex); // Check if the input string matches the regular expression
}

// Function to add new entry fields dynamically
function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // Find the input container based on the selected entry type
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // Determine the number of existing entry fields and calculate the next entry number
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name"/>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`; // HTML string for creating new entry fields
    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString); // Insert the new entry fields into the DOM
}

// Function to calculate total calories from input fields
function getCaloriesFromInputs(list) {
    let calories = 0; // Initialize total calories
    for (const item of list) { // Loop through each input field
        const currVal = cleanInputString(item.value); // Clean the input string (remove special characters and whitespace)
        const invalidInputMatch = isInvalidInput(currVal); // Check if the input contains invalid characters (exponential notation)
        if (invalidInputMatch) { // If invalid characters are found
            alert(`Invalid Input: ${invalidInputMatch[0]}`); // Alert the user about the invalid input
            isError = true; // Set the error flag to true
            return null; // Return null to indicate an error
        }
        calories += Number(currVal); // Add the cleaned value to the total calories
    }
    return calories; // Return the total calories
}

// Function to calculate remaining calories and update output
function calculateCalories(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    isError = false; // Reset the error flag
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]'); // Get all number inputs for breakfast
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]'); // Get all number inputs for lunch
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]'); // Get all number inputs for dinner
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]'); // Get all number inputs for snacks
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]'); // Get all number inputs for exercise

    // Get total calories for each meal and exercise, and the budgeted calories
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if (isError) { // If there's an error during input validation
        return; // Exit the function
    }

    // Calculate consumed calories, remaining calories, and determine surplus or deficit
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    // Update output with the result
    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    `;
    output.classList.remove('hide'); // Remove the 'hide' class to show the output
}

// Function to clear form and reset output
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); // Get all input containers
    for (const container of inputContainers) { // Loop through each input container
        container.innerHTML = ''; // Clear the content of the container
    }
    budgetNumberInput.value = ''; // Reset the value of the budget input
    output.innerText = ''; // Clear the output
    output.classList.add('hide'); // Add the 'hide' class to hide the output
}

// Event listeners
addEntryButton.addEventListener("click", addEntry); // Listen for click event on add entry button
calorieCounter.addEventListener("submit", calculateCalories); // Listen for form submission event on the calorie counter form
clearButton.addEventListener("click", clearForm); // Listen for click event on clear button
