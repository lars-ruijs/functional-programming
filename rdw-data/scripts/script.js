// Fetch-code based on a lecture by Laurens 
// Endpoint of Park and Ride locations in the Netherlands
const endpoint = "https://opendata.rdw.nl/resource/6wzd-evwu.json";

getData(endpoint)
	.then(result => {
	return result.json();
})
.then(RDWData => {
	// All RDW Data from the P+R Dataset
	console.log(RDWData);

	// Get the areaDesc (name of parking facility) of the dataset
	const areaDesc = filterData(RDWData, "areadesc");
	console.log(areaDesc);

	// Get the parking locations city names
	const steden = getCityName(areaDesc);
	console.log(steden);

	// Get the opening year of a parking facility
	const years = getYear(filterData(RDWData, "startdataarea"));
	console.log(years);

	// Create an empty array (used for storing objects later)
	const allRelevantData = [];

	// For/in loop that creates an object with the filtered data and pushes it in the 'allRelevantData' array.
	for (const item in areaDesc) {
		const object = {prName: areaDesc[item], cityName: steden[item], openSince: years[item]};
		allRelevantData.push(object);
	}
	console.log(allRelevantData);
});

// Fetch the data from a given url (endpoint)
function getData(url){
  return  fetch(url);
}

// Returns all values for a certain key in an array of data
function filterData(dataArray, key){
  return dataArray.map(item => item[key]).filter(isEmpty);
}

// Remove empty values from the array
function isEmpty(value) {
    if (value) {
        return true; // Return value if it's not empty
    }
    else {
        return false; // Remove values that are empty 
    }
}

// Extract the city names of P+R locations that are inside parenthesis and return those as a new array
// RegEx code adapted from https://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript
function getCityName(dataItems) {
	return dataItems.map(item => /\(([^)]+)\)/.exec(item)[1]);
}

// Get the opening year of a P+R facility
// Used substring() documentation from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
function getYear(dataItems) {
	return dataItems.map(item => +item.substring(0, 4));
}