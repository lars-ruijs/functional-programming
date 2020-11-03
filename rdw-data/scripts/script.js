// Fetch-code based on a lecture by Laurens 
// Endpoint of Park and Ride locations in the Netherlands
const endpoint = "https://opendata.rdw.nl/resource/6wzd-evwu.json";

const parkeerData = getData(endpoint)
	.then(result => {
	return result.json();
})
.then(RDWData => {
	console.log(RDWData);
});

// Fetch the data from a given url (endpoint)
function getData(url){
  return  fetch(url);
}

// Returns all values for a certain key in an array of data
function filterData(dataArray, key){
  return dataArray.map(item => item[key]);
}