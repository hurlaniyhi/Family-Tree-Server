// Make a string start with a capital letter
const capitalizer = (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    })   
}

// Clear spaces from a string
const spaceRemover = (str) => {
    var removed = str.replace(/ /g, "")
    return removed  
}

// Trim left and right spaces of a string
const trimString = (str) => {
    if(str[0] === ' ' && str[str.length - 1] === ' ')
        return str.substring(1, str.length - 1)
    else if(str[0] === ' ')
        return str.substring(1, str.length)
    else if(str[str.length - 1] === ' ')
        return str.substring(0, str.length - 1)
    else return str
}

module.exports = {
    capitalizer,
    spaceRemover,
    trimString
}