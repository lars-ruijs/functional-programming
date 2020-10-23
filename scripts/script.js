console.log("Hello world!");

//The data is loaded from the data.js-file. Thanks to Laurens and Robert for this 'work-around' to use json data locally
const deData = data;


//FIRST TRY: 
//Log all the values of the "hoeveelheidKledingsstukken"-key in the console, to verify if the dataset is linked correctly.
for (let i = 0; i < deData.length; i++) {
    console.log(deData[i].hoeveelheidKledingstukken);
}


//SECOND TRY:
//Change the strings with numbers to a 'real' number 
//Using parseInt(), found via: https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
function makeInteger(dataKey) {
    let numberArray = []; //Create empty array

    for (let i = 0; i < deData.length; i++) { //For-loop repeats for each item in the dataset
        numberArray.push(parseInt(deData[i][dataKey])); //Push() adds the parseInt() generated number to the empty array. Used []-notation to accept strings passed over by the function parameter.  
    }
    return numberArray; //Returns the generated array
}

console.log(makeInteger("hoeveelheidKledingstukken"));


//THIRD TRY:
//Use map() to generate an array with "string numbers" of a data key, then convert those to real numbers using parseInt(). 
//Use an arrow funcion. 
//Thanks to Laurens' lecture about data exploration and the use of map() in an arrow function
const maakNummer = (dataSleutel) => deData.map(nummer => parseInt(nummer[dataSleutel]));

console.log(maakNummer("hoeveelheidOomsEnTantes"));


//FOURTH TRY:
//Use filter() to clean the number data. Currently it removes the NaN-item(s). 
//Used MDN to learn about filter() https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//Thanks to Laurens for explaining how filter() can be used directly with map()
const maakSchoonNummer = (dataSleutel) => deData.map(nummer => parseInt(nummer[dataSleutel])).filter(isEenNummer);

//This funtion checks if the generated array contains (valid) numbers
function isEenNummer(waarde) {
    if (typeof(waarde) === "number" && !isNaN(waarde)) {
        return true; //Returns the valid numbers 
    }
    else {
        console.log(`${waarde} has been removed`);
        return false; //Removes and console.log's the numbers that are not valid
    }
}

//FIFTH TRY:
//Covert the NaN-values to zero in stead of removing them. 
//Found online that using the Unary (+) operator you can convert a number string to a real number and NaN to 0
//Source: https://medium.com/@nikjohn/cast-to-number-in-javascript-using-the-unary-operator-f4ca67c792ce
const maakSchonerNummer = (dataSleutel) => deData.map(nummer => +nummer[dataSleutel] || 0);

console.log(maakSchonerNummer("hoeveelheidOomsEnTantes"));