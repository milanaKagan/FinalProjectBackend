const assert = require('assert'); // for the testing capabilites
const expect = require('chai').expect; // for chai syntax 
const anon_dao = require('./anon-dao'); // our testing subject
const connectedKnex = require('./knex-connector-test');

describe('test anonymous user dao get flight by id function:', () => {
    beforeEach(async function () {

        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });
    before(async function () {
        country1 = {
            name: 'FakeCountry'
        };
        user1 = {
            username: 'fakeName',
            password: 'fakePass',
            email: 'fake@gmail.com'
        };

        airline1 = {
            name: 'airline1',
            country_id: 1,
            user_id: 1
        };

        flight1 = {
            airline_id: '1',
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: '2021-09-08T21:00:00.000Z',
            landing_time: '2021-09-08T21:00:00.000Z',
            remaining_tickets: 100
        };
        await connectedKnex.raw('call sp_delete_and_reset_all()');
        await connectedKnex.raw(`select * from sp_insert_country('${country1.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user1.username}','${user1.pasword}','${user1.email}')`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline1.name}',${airline1.country_id},${airline1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
    });
    it('get flight by existent id', async function () {
        var actual = await anon_dao.get_flight_by_id(1);

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].airline_id, flight1.airline_id);
        assert.strictEqual(actual[0].destination_country_id, flight1.destination_country_id);
        assert.strictEqual(actual[0].origin_country_id, flight1.origin_country_id);
        assert.strictEqual(Date.parse(actual[0].departure_time), Date.parse(flight1.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time), Date.parse(flight1.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight1.remaining_tickets);
    });
    it('get flight by invalid id', async function () {
        result = await anon_dao.get_flight_by_id(-1);
        assert.strictEqual(result, -1);

    });
    it('get flight by not existent id', async function () {
        actual = await anon_dao.get_flight_by_id(2);
        assert.strictEqual(actual[0], undefined);

    });
})
describe('test anonymous user dao get all flights function:', () => {
    beforeEach(async function () {

        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });

    before(async function () {
        country1 = {
            name: 'FakeCountry'
        };
        user1 = {
            username: 'fakeName',
            password: 'fakePass',
            email: 'fake@gmail.com'
        };

        airline1 = {
            name: 'airline1',
            country_id: 1,
            user_id: 1
        };

        flight1 = {
            airline_id: '1',
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: '2021-09-08T21:00:00.000Z',
            landing_time: '2021-09-08T21:00:00.000Z',
            remaining_tickets: 100
        };
        await connectedKnex.raw('call sp_delete_and_reset_all()');
        await connectedKnex.raw(`select * from sp_insert_country('${country1.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user1.username}','${user1.pasword}','${user1.email}')`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline1.name}',${airline1.country_id},${airline1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
    });
    it('get flight all flights happy path', async function () {
        var actual = await anon_dao.get_all_flights();

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].airline_id, flight1.airline_id);
        assert.strictEqual(actual[0].destination_country_id, flight1.destination_country_id);
        assert.strictEqual(actual[0].origin_country_id, flight1.origin_country_id);
        assert.strictEqual(Date.parse(actual[0].departure_time), Date.parse(flight1.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time), Date.parse(flight1.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight1.remaining_tickets);
    });
    it('get flights empty', async function () {
        connectedKnex.raw('call sp_delete_and_reset_all()').then(async () => {
            result = await anon_dao.get_all_flights();
            assert.strictEqual(result, []);
        });


    });
})