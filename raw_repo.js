const connectedKnex = require('./knex-connector-test');

function getRawResult(raw_query) {
    return connectedKnex.raw(raw_query);
}

module.exports = {
    getRawResult
}