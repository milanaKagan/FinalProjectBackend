const packageJason = require('./package.json');
const connectedKnex = require(packageJason.isTest ? './knex-connector-test' : './knex-connector');

function getRawResult(raw_query) {
    return connectedKnex.raw(raw_query);
}

module.exports = {
    getRawResult
}