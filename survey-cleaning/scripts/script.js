//The data is loaded from the data.js-file. Thanks to Laurens and Robert for this 'work-around' to use json data locally
const deData = data;

//Make all "hoeveelheidKledingsstukken" a 'real' number and store it in 'clothingItems'
const clothingItems = getNumbers("hoeveelheidKledingstukken");
console.log(clothingItems);

//Make all "hoeveelheidOomsEnTantes" a 'real' number, convert empty cells to 0 and store it in 'unclesAndAunts'
const unclesAndAunts = getNumbers("hoeveelheidOomsEnTantes");
console.log(unclesAndAunts);

//Filter all empty and irrelevant strings from "leuksteCMDVak" and store the array in 'cleanedSubjects'
const cleanedSubjects = filterEmptyStrings("leuksteCMDVak");

//Find similar subject-names and replace the name to a standard. 
filterSubjects(cleanedSubjects);
console.log(cleanedSubjects);


////////////////////////
// ALL THE FUNCTIONS //
//////////////////////

//Covert string numbers to 'real' numbers and the NaN-values to zero. 
//Found online that I can use a Unary operator (+) for this
//Source: https://medium.com/@nikjohn/cast-to-number-in-javascript-using-the-unary-operator-f4ca67c792ce
function getNumbers(columnName) {
    return deData.map(surveyObject => +surveyObject[columnName] || 0);
}

//Make an array that converts strings to lowercase and remove empty or irrelevant values. 
function filterEmptyStrings(columnName) {
    return deData.map(surveyObject => surveyObject[columnName].toLowerCase()).filter(isEmpty);
}

//Checks if items in the array are not empty or irrelevant
function isEmpty(value) {
    if (value && value != "x" && value != "idk" && value != "kan niet kiezen") {
        return true; //Return value if it's not empty and is interesting
    }
    else {
        return false; //Remove values that are empty or that are not interesting
    }
}

//Find names of subjects that are similar and replace the name to a standard.
//Used splice() documentation from MDN https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
function filterSubjects(arrayName) {
    for (const vak in arrayName) {
        if (arrayName[vak].includes("front")) {
            arrayName.splice(vak, 1, "front-end development");
         }
         else if (arrayName[vak].includes("inleiding")) {
            arrayName.splice(vak, 1, "inleiding programmeren");
         }
         else if (arrayName[vak].includes("hci")) {
            arrayName.splice(vak, 1, "HCI");
         }
         else if (arrayName[vak].includes("m&") || arrayName[vak].includes("maatschap")) {        
            arrayName.splice(vak, 1, "maatschappij en interactie");
        }
        else if (arrayName[vak].includes("visual") && !arrayName[vak].includes("design") && !arrayName[vak].includes("data")) {        
            arrayName.splice(vak, 1, "project visual");
        }
        else if (arrayName[vak] == "vid" || arrayName[vak].includes("interface")) {        
            arrayName.splice(vak, 1, "visual interface design");
        }
        else if (arrayName[vak].includes("project") && arrayName[vak].includes("indiv") && !arrayName[vak].includes("2")) {        
            arrayName.splice(vak, 1, "project individueel 1");
        }
        else if (arrayName[vak].includes("web") && arrayName[vak].includes("project")) {        
            arrayName.splice(vak, 1, "project web");
        }
        else if (arrayName[vak].includes("app")) {        
            arrayName.splice(vak, 1, "webapplicaties");
        }
     }
}