// Make a word start with a capital letter
const capitalizer = (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    })   
}

// Clear spaces from a word
const spaceRemover = (str) => {
    var removed = str.replace(/ /g, "")
    return removed  
}

module.exports = {
    capitalizer,
    spaceRemover
}