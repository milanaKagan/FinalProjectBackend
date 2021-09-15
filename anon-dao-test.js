const assert = require('assert'); // for the testing capabilites 
const anon_dao = require('./anon-dao'); // our testing subject
const connectedKnex = require('./knex-connector-test');

describe('test anonymous user dao functions:', () => {
    beforeEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
        country1 = {
            name: 'FakeCountry'
        };
        user1 = {
            username: 'fakeNameUnique',
            password: 'fakePass',
            email: 'fakeUnique@gmail.com'
        };
        airline1 = {
            name: 'airline1',
            country_id: 1,
            user_id: 1
        };

        flight1 = {
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: '2021-09-08 21:00:00.000',
            landing_time: '2021-09-08 21:00:00.000',
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
    afterEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });

    it('get flight by existent id', async function () {
        var actual = await anon_dao.get_flight_by_id(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].destination_country_id, flight1.destination_country_id);
        assert.strictEqual(actual[0].origin_country_id, flight1.origin_country_id);
        assert.strictEqual(actual[0].airline_id.toString(), flight1.destination_country_id.toString());
        assert.strictEqual(Date.parse(actual[0].departure_time.toString()), Date.parse(flight1.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time.toString()), Date.parse(flight1.landing_time));
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
    it('get all flights happy path', async function () {
        var actual = await anon_dao.get_all_flights();

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].airline_id.toString(), flight1.destination_country_id.toString());
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
    it('get all airlines happy path', async function () {
        var actual = await anon_dao.get_all_airlines();

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].country_id.toString(), airline1.country_id.toString());
        assert.strictEqual(actual[0].user_id.toString(), airline1.user_id.toString());
        assert.strictEqual(actual[0].name, airline1.name);
    });
    it('get airline by id', async function () {
        var actual = await anon_dao.get_airline_by_id(1);

        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].country_id.toString(), airline1.country_id.toString());
        assert.strictEqual(actual[0].user_id.toString(), airline1.user_id.toString());
        assert.strictEqual(actual[0].name, airline1.name);
    });
    it('get airline by invalid id', async function () {
        var actual = await anon_dao.get_airline_by_id(-1);

        assert.strictEqual(actual, -1);
    });
    it('get airline by not existent id', async function () {
        actual = await anon_dao.get_airline_by_id(2);
        assert.strictEqual(actual[0], undefined);

    });
    it('get all countries happy path', async function () {
        var actual = await anon_dao.get_all_countries();

        assert.strictEqual(actual[0].id, 1);
        assert.strictEqual(actual[0].name, country1.name);
    });
    it('get country by id', async function () {
        var actual = await anon_dao.get_country_by_id(1);

        assert.strictEqual(actual[0].id, 1);
        assert.strictEqual(actual[0].name, country1.name);
    });
    it('get country by invalid id', async function () {
        var actual = await anon_dao.get_country_by_id(-1);

        assert.strictEqual(actual, -1);
    });
    it('get country by not existent id', async function () {
        actual = await anon_dao.get_country_by_id(2);
        assert.strictEqual(actual[0], undefined);

    });
    it('get flights by airline id', async function () {
        var actual = await anon_dao.get_flights_by_airline_id(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].destination_country_id, flight1.destination_country_id);
        assert.strictEqual(actual[0].origin_country_id, flight1.origin_country_id);
        assert.strictEqual(Date.parse(actual[0].departure_time), Date.parse(flight1.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time), Date.parse(flight1.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight1.remaining_tickets);
    });
    it('get flights by not existant airline id', async function () {
        var actual = await anon_dao.get_flights_by_airline_id(-1);
        assert.strictEqual(actual[0], undefined);

    });
    it('get flights by not valid airline id', async function () {
        var actual = await anon_dao.get_flights_by_airline_id(-1);
        assert.strictEqual(actual, -1);

    });
    it('insert user', async function () {
        var actual = await anon_dao.insert_user("user", "password", "email");
        assert.strictEqual(actual, '2');

    });
    it('insert user empty userNamw', async function () {
        var actual = await anon_dao.insert_user("", "password", "email");
        assert.strictEqual(actual, -1);

    });
    it('insert user short password', async function () {
        var actual = await anon_dao.insert_user("user", "123", "email");
        assert.strictEqual(actual, -1);

    });
    it('insert user empty mail', async function () {
        var actual = await anon_dao.insert_user("user", "123", "");
        assert.strictEqual(actual, -1);

    });
    it('insert user empty password', async function () {
        var actual = await anon_dao.insert_user("user", "", "email");
        assert.strictEqual(actual, -1);

    });

    it('get arrival flights', async function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var flight2 = {
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: dateTime,
            landing_time: dateTime,
            remaining_tickets: 100
        };
        await connectedKnex.raw(`select * from sp_insert_flight(${flight2.airline_id},${flight2.origin_country_id},
            ${flight2.destination_country_id},'${flight2.departure_time}','${flight2.landing_time}'
            ,${flight2.remaining_tickets})`);
        var actual = await anon_dao.get_arrival_flights(1);
        assert.strictEqual(actual[0].id, '2');
        assert.strictEqual(actual[0].origin_country_id, flight2.origin_country_id);
        assert.strictEqual(actual[0].destination_country_id, flight2.destination_country_id);
        assert.strictEqual(actual[0].airlineid, flight2.airline_id.toString());
        assert.strictEqual(Date.parse(actual[0].departure_time.toString()), Date.parse(flight2.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time.toString()), Date.parse(flight2.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight2.remaining_tickets);
    });
    it('get arrival flights by not existant country  id', async function () {
        var actual = await anon_dao.get_arrival_flights(10000000);
        assert.strictEqual(actual[0], undefined);

    });
    it('get arrival flights by not valid country id', async function () {
        var actual = await anon_dao.get_arrival_flights(-1);
        assert.strictEqual(actual, -1);

    });
    
    it('get departure flights', async function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var flight2 = {
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: dateTime,
            landing_time: dateTime,
            remaining_tickets: 100
        };
        await connectedKnex.raw(`select * from sp_insert_flight(${flight2.airline_id},${flight2.origin_country_id},
            ${flight2.destination_country_id},'${flight2.departure_time}','${flight2.landing_time}'
            ,${flight2.remaining_tickets})`);
        var actual = await anon_dao.get_departure_flights(1);
        assert.strictEqual(actual[0].id, '2');
        assert.strictEqual(actual[0].origin_country_id, flight2.origin_country_id);
        assert.strictEqual(actual[0].destination_country_id, flight2.destination_country_id);
        assert.strictEqual(actual[0].airlineid, flight2.airline_id.toString());
        assert.strictEqual(Date.parse(actual[0].departure_time.toString()), Date.parse(flight2.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time.toString()), Date.parse(flight2.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight2.remaining_tickets);
    });
    it('get departure flights by not existant country  id', async function () {
        var actual = await anon_dao.get_departure_flights(10000000);
        assert.strictEqual(actual[0], undefined);

    });
    it('get departure flights by not valid country id', async function () {
        var actual = await anon_dao.get_departure_flights(-1);
        assert.strictEqual(actual, -1);

    });
    it('get flights by parameters', async function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var flight2 = {
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: dateTime,
            landing_time: dateTime,
            remaining_tickets: 100
        };
        await connectedKnex.raw(`select * from sp_insert_flight(${flight2.airline_id},${flight2.origin_country_id},
            ${flight2.destination_country_id},'${flight2.departure_time}','${flight2.landing_time}'
            ,${flight2.remaining_tickets})`);
        var actual = await anon_dao.get_flights_by_parameters(flight2.origin_country_id,
            flight2.destination_country_id,dateTime);
        assert.strictEqual(actual[0].id, '2');
        assert.strictEqual(actual[0].origin_country_id, flight2.origin_country_id);
        assert.strictEqual(actual[0].destination_country_id, flight2.destination_country_id);
        assert.strictEqual(Date.parse(actual[0].departure_time.toString()), Date.parse(flight2.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time.toString()), Date.parse(flight2.landing_time));
    });
    it('get flights by parameters bad origin id', async function () {
        var actual = await anon_dao.get_flights_by_parameters(0,
            1,"2021-09-08 21:00:00.000");
        assert.strictEqual(actual,-1);
    });
    it('get flights by parameters bad destination id', async function () {
        var actual = await anon_dao.get_flights_by_parameters(1,
            0,'2021-09-08 21:00:00.000');
        assert.strictEqual(actual,-1);
    });
    it('get flights by parameters bad destination id', async function () {
        var actual = await anon_dao.get_flights_by_parameters(1,
            0,'');
        assert.strictEqual(actual,-1);
    });
})
