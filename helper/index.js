const qs = require('qs');

const populateStringToArray = (populateString) => {
    const popObject = qs.parse(populateString);
    let popArray = [];

    for (const key in popObject) {
        if (popObject.hasOwnProperty(key)) {
            const element = popObject[key];
            popArray.push(element)
        }
    }

    return popArray;
}

module.exports = { populateStringToArray }