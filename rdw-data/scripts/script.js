// Fetch-code based on a lecture by Laurens 
// Endpoint of Park and Ride locations in the Netherlands
const endpoint = "https://opendata.rdw.nl/resource/6wzd-evwu.json";

getData(endpoint)
	.then(result => {
	return result.json();
})
.then(RDWData => {
	console.log(RDWData);
	const areaDesc = filterData(RDWData, "areadesc");
	console.log(areaDesc);
	const steden = getCityName(areaDesc);
	console.log(steden);
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
function getCityName(dataItem) {
	return dataItem.map(item => /\(([^)]+)\)/.exec(item)[1]);
}