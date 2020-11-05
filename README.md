# Functional Programming for de Volkskrant

The Dutch newspaper _De Volkskrant_ asked us to find interesting patterns and insights for the subject _"The car in the city"_, using datasets from the RDW. These datasets contain information about parking spaces and registered vehicles in the Netherlands. By using this data we can create interactive data visualizations using JavaScript and D3.

More information about De Volkskrant can be found at [Wikipedia (English)](https://en.wikipedia.org/wiki/De_Volkskrant) or at [Volkskrant.nl (Dutch)](https://www.volkskrant.nl/).

All of the RDW datasets can be found [here](https://opendata.rdw.nl/browse).

## Concept

### Research question

With my data visualization I want to address the following topic:

> How are Park & Ride locations distributed across the Netherlands?

With this question I have thought of several subquestions, which focus more deeply on the subject of Park & Ride locations.

- How far are the P+R locations from the city center?
- Which municipality has the most P+R locations?
- What are the largest P+R locations in the Netherlands?
- Do the P+R locations offer facilities for the disabled?
- Are the number of P+R locations in the Netherlands increasing?
- Which P+R locations offer a connection to a train station?

### Assumptions

I don't expect small towns to have a P+R location. I expect that the bigger the city, the further away a park and ride location is from the city center. I think the city of Amsterdam has the most P+R locations. I expect that commercial providers hardly own any P+R locations. I expect that most P+R locations have a train station within walking distance.

### Interesting variables

**From dataset "GEO PenR":**
You can view the data inside this data set [here](https://opendata.rdw.nl/Parkeren/GEO-PenR/6wzd-evwu).

- `Location` gives the location of a P+R location as coordinates. Example output: `"(52.152866396°, 5.368358204°)"`;
- `AreaDesc` contains the name of the P+R location including the city name where the P+R site is located. Example output: `"Park & Ride Barchman Wuytierslaan (Amersfoort)"`;
- `StartDataArea` contains the date on which the P+R location was first opened. Formated as (YYYYMMDD). Example output: `20131118`;
- `AreaManagerId` provides an identification number of the P+R site administrator. Example output: `2.448`;
- `AreaId` contains a unique identification number of the parking site. This can be used to collect more information about a P+R location from another dataset within the RDW. Example output: `"307_BARC"`.

**From dataset "Specificaties Parkeergebied":**
You can view the data inside this data set [here](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s)

- `AreaId` contains a unique identification number of the parking site. I can use this to connect it to the "GEO PenR" dataset. Example output: `"307_BARC"`;
- `Capacity` returns the amount of parking spots a given location has. I can use this to show how large a P+R parking site is. Example output: `48`;
- `DisabledAccess` gives the number of reserved parking spaces for disabled people. Example output: `2`.

**From dataset "Gebiedsbeheerder":**
You can view the data inside this data set [here](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEBIEDSBEHEERDER/2uc2-nnv3)

- `AreaManagerId` provides an identification number of a parking site administrator. Example output: `2448`;
- `AreaManagerDesc` shows the name of the owner of a parking location. Example output: `"Hoorn"`;

<br><br>
If it is possible I would like to include data about train stations in the Netherlands. I found an API from the NS (the Dutch Railway operator) that contains information about all train stations.

**From dataset "Stations" by NS:**
You can view the data inside this data set [here](https://apiportal.ns.nl/docs/services/reisinformatie-api/operations/getAllStations). Please note that this link will only work if you are logged in with an NS-API Portal account.

- `stationType` gives information about the type of station. Example output: `"INTERCITY_STATION"`;
- `lat` and `lng` give the coordinates of the station. Example output: `52.5486327`;
- `heeftReisassistentie` provides information about whether people with disabilities can make use of assistance to use a train. Example output: `false`;
- `namen` returns the official name of a station. Example output: `"Amsterdam Centraal"`.

If I can integrate this information, it might also be possible to show specific information for people with disabilities. Are there P+R locations with a reserved disabled parking space and can they then transfer to a station that has passenger assistance?

**Extra Dataset**
I may also need a dataset that can convert the place names to a coordinate. I still need to do some extra research on this.

### Empty values

When a dataset contains empty values, I will either not use the empty cells or interpert the value in a cell as 0. This depends of course on what the subject of the corresponding column is. If I encounter empty cells I will describe here what I have done with the empty cells and why.

### Sketch of my concept (so far)

I would like to visualise the spread of P+R locations across the country and show the distance between a city centre and a P+R location. The first example below is without a map background. The other sketches do have a simple map as background, because I think this helps to visualize the spread of P+R locations over smaller places in the country.  
<br>

![schets zonder kaart als achtergrond](https://user-images.githubusercontent.com/60745347/97630497-fe781600-1a2f-11eb-847f-fdda331a2977.JPG)

<br>

![schets met kaart als achtergrond](https://user-images.githubusercontent.com/60745347/98243611-7a151e00-1f6e-11eb-9bf0-cf9d05fffd91.jpg)

Sketch with the option to filter displayed P+R facilities by travel time for the last part of the journey (journey between parking lot and city center).

<br>

![digitale schets met kaart als achtergrond](https://user-images.githubusercontent.com/60745347/98243811-c3656d80-1f6e-11eb-883d-a8557f75133b.png)

Digital sketch based on the second draft.

<br>

## Data cleaning with functional patterns

This function cleans the coordinates in the column "place of birth". First of all, an array is created with `map()` of the values in the column. This array is directly filtered on empty values using `filter()`. Then a function checks if the coordinates need to be converted from the "degree, minute and seconds"-format to a decimal format. If so, it does so and places the result as an object in a new array. If the coordinate doesn't have to get converted, weird characters will be filtered out and the string coordinates will be cut into an object with a lattitude and longitude. This object is placed back in the array.
Finally the function removes 11 invalid coordinates. These are for example coordinates with invalid degree indicators or coordinates that only contain a lattitude (or longitude).

You can view that code [here](https://github.com/lars-ruijs/functional-programming/blob/4ab79d869b5386325b86b3ad64bb34921343c8c3/survey-cleaning/scripts/script.js#L84-L125).

## Sources

I've used the following sources while working on my project:

### Survey data cleaning

- **JSON Dataset** generated by my classmate Jonah Meijers.
- **Loading JSON data locally (work-around)** lecture by Tech Track teachers Robert and Laurens.
- **Using `filter()` and `map()`** lectures by Laurens. Documentation about [filter()](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [map()](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map) used from MDN.
- **Using unary operator for converting string values to numbers** article by Nikhil John on Medium. Read it [here](https://medium.com/@nikjohn/cast-to-number-in-javascript-using-the-unary-operator-f4ca67c792ce).
- **Removing an item from a string and replacing it's value** [documentation](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) about `splice()` used from MDN.
- **Replacing quotes and degree characters** adapted RegEx code from a StackOverflow [answer](https://stackoverflow.com/questions/7760262/replace-both-double-and-single-quotes-in-javascript-string) by Joe.
- **Using `test()` to check if a string contains letters** code adapted from a StackOverflow [answer](https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript/23476587) by Oriol. Used additional `test()` [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) from MDN.
- **Convert coordinates in Degree, Minute, Seconds format to decimal values** code adapted from a StackOverflow [answer](https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values) by Gavin Miller.
