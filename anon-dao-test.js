const assert = require('assert');
const expected = require('chai').expect;
const anon_dao = require('./anon-dao');

describe('test anonymous user dao', () =>{
    internal('get flight by id', function(){
        actual_result = anon_dao.get_flight_by_id(1);
        expected_result = {
            flight_id = 1,

        };
        assert.strictEqual(actual_result,expected_result);
    })
})