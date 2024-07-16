const api = require('./api.js');
Object.entries(api).forEach(([symbolName, symbolDefinition]) => {
    module.exports[symbolName] = symbolDefinition;
})