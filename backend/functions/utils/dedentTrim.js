const dedent = require("./dedent.js")

module.exports = function(text){
    return dedent(text).trim()
}