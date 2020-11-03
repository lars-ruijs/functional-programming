// The data is loaded from the data.js-file. Thanks to Laurens and Robert for this 'work-around' to use json data locally
const deData = data;

// Make all "hoeveelheidKledingsstukken" a 'real' number and store it in 'clothingItems'
const clothingItems = getNumbers("hoeveelheidKledingstukken");
console.log(clothingItems);

// Make all "hoeveelheidOomsEnTantes" a 'real' number, convert empty cells to 0 and store it in 'unclesAndAunts'
const unclesAndAunts = getNumbers("hoeveelheidOomsEnTantes");
console.log(unclesAndAunts);

// Filter all empty and irrelevant strings from "leuksteCMDVak" and store the array in 'cleanedSubjects'
const cleanedSubjects = filterEmptyStrings("leuksteCMDVak");

// Find similar subject-names and replace the name to a standard. 
filterSubjects(cleanedSubjects);
console.log(cleanedSubjects);

// Filter all empty and irrelevant strings from "geboorteplaats" and store the array in 'dirtyCoordinates'
const dirtyCoordinates = filterEmptyStrings("geboorteplaats");

// Clean the coordinates to valid decimal based coordinates and store the generated array of objects in 'cleanCoordinates'
const cleanCoordinates = getCoordinates(dirtyCoordinates);
console.log(cleanCoordinates);

////////////////////////
// ALL THE FUNCTIONS //
//////////////////////

// Covert string numbers to 'real' numbers and the NaN-values to zero. 
// Found online that I can use a Unary operator (+) for this
// Source: https://medium.com/@nikjohn/cast-to-number-in-javascript-using-the-unary-operator-f4ca67c792ce
function getNumbers(columnName) {
    return deData.map(surveyObject => +surveyObject[columnName] || 0);
}

// Make an array that converts strings to lowercase and remove empty or irrelevant values. 
function filterEmptyStrings(columnName) {
    return deData.map(surveyObject => surveyObject[columnName].toLowerCase()).filter(isEmpty);
}

// Check if items in the array are not empty or irrelevant
function isEmpty(value) {
    if (value && value != "x" && value != "idk" && value != "kan niet kiezen") {
        return true; // Return value if it's not empty and if it's relevant
    }
    else {
        return false; // Remove values that are empty or that are irrelevant
    }
}

// Find names of subjects that are similar and replace the name to a standard.
// Used splice() documentation from MDN https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
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

// Replace the 'dirty' coordinates with cleaned coordinates and output an array of objects with lat and long as keys
function getCoordinates(dirtyCoordinates) {
    
    // Create empty array
    const coordinatesArray = [];

    for (const coor in dirtyCoordinates) {
       
        // Check if the coordinates are in a 'Degree, Minutes, Seconds'-format
        // Then: Replace the quotes and degrees by using .replace
        // RegEx code adapted from: https://stackoverflow.com/questions/7760262/replace-both-double-and-single-quotes-in-javascript-string
        if (dirtyCoordinates[coor].includes("'")) {
            const schoner = dirtyCoordinates[coor]
            .replace(/["en]+/g, "")
            .replace(/[°']+/g, " ")
            .split(" ");
            const dms = schoner.map(a => parseFloat(a));    
            coordinatesArray.push(convertDMS2DD(dms[0], dms[1], dms[2], dms[3], dms[4], dms[5])); // Convert to lat/long
        }
        // Check if the remaining coordinates are longer than 10 characters, they don't contain any letters (using test()) and it includes a space.
        // Letter checking code adapted from: https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript/23476587
        // Extra information about test() used from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        else if (dirtyCoordinates[coor].length > 10 && /[a-z]+/g.test(dirtyCoordinates[coor]) == false && dirtyCoordinates[coor].includes(" ")) {
            const schoner = dirtyCoordinates[coor]
            .replace(/[()]+/g, "");
            const output = schoner.split(". ");
            const object = {lat: output[0], long: output[1]};
            coordinatesArray.push(object);
        }
    }
    return coordinatesArray; 
}


// Covert coordinates that are in a 'Degree, Minutes, Seconds'-format to a usable lat and long (decimal) format
// Code adapted from: https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
function convertDMS2DD(latDegrees, latMinutes, latSeconds, longDegrees, longMinutes, longSeconds) {
    const ddLat = latDegrees + latMinutes/60 + latSeconds/(60*60);
    const ddLong = longDegrees + longMinutes/60 + longSeconds/(60*60);
    const obj = {lat: ddLat.toFixed(6), long: ddLong.toFixed(6)};
    return obj;
}