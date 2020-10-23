console.log("Hello world!");

//The data is loaded from the data.js-file. Thanks to Laurens and Robert for this 'work-around' to use json data locally
const meerData = data;


//This makes an array using map() of the provided column name. It sets the values to lowercase (to help with splicing later)
//It then filter()s out empty or not interesting values.  
const maakArray = (dataSleutel) => meerData.map(nummer => nummer[dataSleutel].toLowerCase()).filter(isLeeg);

const isLeeg = (waarde) => {
    if (waarde && waarde != "x" && waarde != "Idk" && waarde != "kan niet kiezen") {
        return true; //Return value if it's not empty and is interesting
    }
    else {
        return false; //Remove values that are empty or that are not interesting
    }
};


//Creates an array of the leuksteCMDVak column
leuksteVak = maakArray("leuksteCMDVak");
console.log(leuksteVak);


//For/in loop that finds names of subjects that are similar and replaces the name to a standard. 
//Used splice() documentation from MDN https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 for (const vak in leuksteVak) {
    if (leuksteVak[vak].includes("front")) {
        console.log(`${leuksteVak[vak]} is vervangen voor Front-End Development`);
        leuksteVak.splice(vak, 1, "front-end development");
     }
     else if (leuksteVak[vak].includes("inleiding")) {
        console.log(`${leuksteVak[vak]} is vervangen voor Inleiding Programmeren`);
        leuksteVak.splice(vak, 1, "inleiding programmeren");
     }
     else if (leuksteVak[vak].includes("hci")) {
        console.log(`${leuksteVak[vak]} is vervangen voor HCI`);
        leuksteVak.splice(vak, 1, "HCI");
     }
     else if (leuksteVak[vak].includes("m&") || leuksteVak[vak].includes("maatschap")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Maatschappij en Interactie`);
        leuksteVak.splice(vak, 1, "maatschappij en interactie");
    }
    else if (leuksteVak[vak].includes("visual") && !leuksteVak[vak].includes("design") && !leuksteVak[vak].includes("data")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Project Visual`);
        leuksteVak.splice(vak, 1, "project visual");
    }
    else if (leuksteVak[vak] == "vid" || leuksteVak[vak].includes("interface")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Visual Interface Design`);
        leuksteVak.splice(vak, 1, "visual interface design");
    }
    else if (leuksteVak[vak].includes("project") && leuksteVak[vak].includes("indiv") && !leuksteVak[vak].includes("2")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Project Individueel 1`);
        leuksteVak.splice(vak, 1, "project individueel 1");
    }
    else if (leuksteVak[vak].includes("web") && leuksteVak[vak].includes("project")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Project Web`);
        leuksteVak.splice(vak, 1, "project web");
    }
    else if (leuksteVak[vak].includes("app")) {        
        console.log(`${leuksteVak[vak]} is vervangen voor Webapplicaties`);
        leuksteVak.splice(vak, 1, "webapplicaties");
    }
 }
 

 console.log(leuksteVak);