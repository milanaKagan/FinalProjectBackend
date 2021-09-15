const assert = require('assert'); // for the testing capabilites
const anon_dao = require('./anon-dao');
const customer_dao = require('./customer-dao');
const airline_dao = require('./airline-dao'); // our testing subject
const connectedKnex = require('./knex-connector-test');

describe('test airline user dao functions:', () => {
    beforeEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
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
            airline_id: 1,
            origin_country_id: 1,
            destination_country_id: 1,
            departure_time: '2021-09-08 21:00:00.000',
            landing_time: '2021-09-08 21:00:00.000',
            remaining_tickets: 100
        };
        customer1 = {
            first_name: "first",
            last_name: "last",
            address: "address",
            phone_no: "0000000",
            credit_card_no: "00000",
            user_id: 1
        };

        await connectedKnex.raw('call sp_delete_and_reset_all()');
        await connectedKnex.raw(`select * from sp_insert_country('${country1.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user1.username}','${user1.pasword}','${user1.email}')`);
        await connectedKnex.raw(`select * from sp_insert_customer('${customer1.first_name}','${customer1.last_name}',
        '${customer1.address}','${customer1.phone_no}','${customer1.credit_card_no}',${customer1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline1.name}',${airline1.country_id},${airline1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
    });
    afterEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });
    it('delete airline and flights', async function () {
        var actual = await airline_dao.delete_airline_flights(1);
        assert.strictEqual(actual, 1);
        var airline = await anon_dao.get_airline_by_id(1);
        assert.strictEqual(airline[0], undefined);
        var flight = await anon_dao.get_flights_by_airline_id(1);
        assert.strictEqual(flight[0], undefined);
    });
    it('delete airline and flights not existent id', async function () {
        var actual = await airline_dao.delete_airline_flights(1000);
        assert.strictEqual(actual, 0);
    });
    it('delete airline and flights not valid id', async function () {
        var actual = await airline_dao.delete_airline_flights(-1);
        assert.strictEqual(actual, -1);
    });
    it('delete customer', async function () {
        var actual = await airline_dao.delete_customer(1);
        assert.strictEqual(actual, '1');
        var customer = await customer_dao.get_customer_by_id(1);
        assert.strictEqual(customer[0], undefined);

    });
    it('delete customer not existent id', async function () {
        var actual = await airline_dao.delete_customer(1000);
        assert.strictEqual(actual, '0');
    });
    it('delete customer not valid id', async function () {
        var actual = await airline_dao.delete_customer(-1);
        assert.strictEqual(actual, -1);
    });
    it('delete ticket', async function () {
        ticket1 = {
            flight_id: 1,
            customer_id: 1
        };
        await connectedKnex.raw(`select * from sp_insert_ticket(${ticket1.flight_id},${ticket1.customer_id})`);
        var actual = await airline_dao.delete_ticket(1);
        assert.strictEqual(actual, '1');
        var ticket = await customer_dao.get_ticket_by_id(1);
        assert.strictEqual(ticket[0], undefined);

    });
    it('delete ticket not existent id', async function () {
        var actual = await airline_dao.delete_ticket(1000);
        assert.strictEqual(actual, '0');
    });
    it('delete ticket not valid id', async function () {
        var actual = await airline_dao.delete_ticket(-1);
        assert.strictEqual(actual, -1);
    });
    it('delete flight and tickets', async function () {
        ticket1 = {
            flight_id: 1,
            customer_id: 1
        };
        await connectedKnex.raw(`select * from sp_insert_ticket(${ticket1.flight_id},${ticket1.customer_id})`);
        var actual = await airline_dao.delete_flight_tickets(1);
        assert.strictEqual(actual, 1);
        var flight = await anon_dao.get_flight_by_id(1);
        assert.strictEqual(flight[0], undefined);
        var ticket = await customer_dao.get_ticket_by_id(1);
        assert.strictEqual(ticket[0], undefined);
    });
    it('delete flight and tickets not existent id', async function () {
        var actual = await airline_dao.delete_flight_tickets(1000);
        assert.strictEqual(actual, 0);
    });
    it('delete flight and tickets not valid id', async function () {
        var actual = await airline_dao.delete_flight_tickets(-1);
        assert.strictEqual(actual, -1);
    });
    it('get airline by username id', async function () {
        var actual = await airline_dao.get_airline_by_username(user1.username);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].country_id, airline1.country_id);
        assert.strictEqual(actual[0].user_id, '1');
    });
    it('get airline by not existant username', async function () {
        var actual = await airline_dao.get_airline_by_username('aaa');
        assert.strictEqual(actual[0], undefined);

    });
    it('get airline by not valid username', async function () {
        var actual = await airline_dao.get_airline_by_username('');
        assert.strictEqual(actual, -1);

    });
    it('insert airline', async function () {
        airline2 = {
            name: 'airline2',
            country_id: 1,
            user_id: 2
        };

        user2 = {
            username: 'fakeName2',
            password: 'fakePass2',
            email: 'fake@gmail.com2'
        };
        await connectedKnex.raw(`select * from sp_insert_user('${user2.username}','${user2.pasword}','${user2.email}')`);
        var actual = await airline_dao.insert_airline(airline2.name, airline2.country_id, airline2.user_id);

        assert.strictEqual(actual, '2');
        var airline = await anon_dao.get_airline_by_id(2);
        assert.strictEqual(airline[0].id, '2');
        assert.strictEqual(airline[0].country_id.toString(), airline2.country_id.toString());
        assert.strictEqual(airline[0].user_id.toString(), airline2.user_id.toString());
        assert.strictEqual(airline[0].name, airline2.name);
    });
    it('insert airline bad name', async function () {

        var actual = await airline_dao.insert_airline(null, 1, 1);
        assert.strictEqual(actual, -1);

    });
    it('insert airline bad country id', async function () {

        var actual = await airline_dao.insert_airline('name', null, 1);
        assert.strictEqual(actual, -1);

    });
    it('insert airline bad user_id', async function () {

        var actual = await airline_dao.insert_airline('name', 1, -1);
        assert.strictEqual(actual, -1);

    });
    it('update airline', async function () {
        airline2 = {
            name: 'airline2',
            country_id: 2,
            user_id: 2
        };
        country2 = {
            name: "country2"
        };
        user2 = {
            username: 'fakeName2',
            password: 'fakePass2',
            email: 'fake@gmail.com2'
        };
        await connectedKnex.raw(`select * from sp_insert_country('${country2.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user2.username}','${user2.pasword}','${user2.email}')`);
        var actual = await airline_dao.update_airline(1, airline2.name, airline2.country_id, airline2.user_id);
        assert.strictEqual(actual, '1');
        var airline = await anon_dao.get_airline_by_id(1);
        assert.strictEqual(airline[0].id, '1');
        assert.strictEqual(airline[0].country_id.toString(), airline2.country_id.toString());
        assert.strictEqual(airline[0].user_id.toString(), airline2.user_id.toString());
        assert.strictEqual(airline[0].name, airline2.name);
    });
    it('update airline bad name', async function () {

        var actual = await airline_dao.update_airline(1, null, 1, 1);
        assert.strictEqual(actual, -1);

    });
    it('update airline bad country id', async function () {

        var actual = await airline_dao.update_airline(1, 'name', null, 1);
        assert.strictEqual(actual, -1);

    });
    it('update airline bad user_id', async function () {

        var actual = await airline_dao.update_airline(1, 'name', 1, -1);
        assert.strictEqual(actual, -1);

    });
    it('update airline bad id', async function () {

        var actual = await airline_dao.update_airline(0, 'name', 1, 1);
        assert.strictEqual(actual, -1);

    });
    it('insert flight', async function () {
        var actual = await airline_dao.insert_flight(flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, '2');
        actual = await anon_dao.get_flight_by_id(2);
        assert.strictEqual(actual[0].destination_country_id, flight1.destination_country_id);
        assert.strictEqual(actual[0].origin_country_id, flight1.origin_country_id);
        assert.strictEqual(actual[0].airline_id.toString(), flight1.destination_country_id.toString());
        assert.strictEqual(Date.parse(actual[0].departure_time.toString()), Date.parse(flight1.departure_time));
        assert.strictEqual(Date.parse(actual[0].landing_time.toString()), Date.parse(flight1.landing_time));
        assert.strictEqual(actual[0].remaining_tickets, flight1.remaining_tickets);
    });
    it('insert flight bad airline_id', async function () {

        var actual = await airline_dao.insert_flight(0, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('insert flight bad origin country id', async function () {

        var actual = await airline_dao.insert_flight(flight1.airline_id, 0, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('insert flight bad destination country id', async function () {

        var actual = await airline_dao.insert_flight(flight1.airline_id, flight1.origin_country_id, 0,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('insert flight bad  departure time', async function () {

        var actual = await airline_dao.insert_flight(flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            '', flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('insert flight bad landing time', async function () {

        var actual = await airline_dao.insert_flight(flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, '', flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('insert flight bad remaining tickets', async function () {

        var actual = await airline_dao.insert_flight(flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, -1);

        assert.strictEqual(actual, -1);

    });
    it('update flight', async function () {
        airline2 = {
            name: 'airline2',
            country_id: 2,
            user_id: 2
        };
        country2 = {
            name: "country2"
        };
        user2 = {
            username: 'fakeName2',
            password: 'fakePass2',
            email: 'fake@gmail.com2'
        };
        await connectedKnex.raw(`select * from sp_insert_country('${country2.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user2.username}','${user2.pasword}','${user2.email}')`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline2.name}',${airline2.country_id},${airline2.user_id})`);

        flight2 = {
            airline_id: 2,
            origin_country_id: 2,
            destination_country_id: 2,
            departure_time: '2021-09-09 21:00:00.000',
            landing_time: '2021-09-09 21:00:00.000',
            remaining_tickets: 10
        };
        var actual = await airline_dao.update_flight(1,flight2.airline_id, flight2.origin_country_id, flight2.destination_country_id,
            flight2.departure_time, flight2.landing_time, flight2.remaining_tickets);

        assert.strictEqual(actual, '1');
        var flight = await anon_dao.get_flight_by_id(1);
        assert.strictEqual(flight[0].destination_country_id, flight2.destination_country_id);
        assert.strictEqual(flight[0].origin_country_id, flight2.origin_country_id);
        assert.strictEqual(flight[0].airline_id.toString(), flight2.destination_country_id.toString());
        assert.strictEqual(Date.parse(flight[0].departure_time.toString()), Date.parse(flight2.departure_time));
        assert.strictEqual(Date.parse(flight[0].landing_time.toString()), Date.parse(flight2.landing_time));
        assert.strictEqual(flight[0].remaining_tickets, flight2.remaining_tickets);
    });
    it('update flight bad airline_id', async function () {

        var actual = await airline_dao.update_flight(1,0, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad flight_id', async function () {

        var actual = await airline_dao.update_flight(0,flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad origin country id', async function () {

        var actual = await airline_dao.update_flight(1,flight1.airline_id, 0, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad destination country id', async function () {

        var actual = await airline_dao.update_flight(1,flight1.airline_id, flight1.origin_country_id, 0,
            flight1.departure_time, flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad  departure time', async function () {

        var actual = await airline_dao.update_flight(1,flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            '', flight1.landing_time, flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad landing time', async function () {

        var actual = await airline_dao.update_flight(1,flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, '', flight1.remaining_tickets);

        assert.strictEqual(actual, -1);

    });
    it('update flight bad remaining tickets', async function () {

        var actual = await airline_dao.update_flight(1,flight1.airline_id, flight1.origin_country_id, flight1.destination_country_id,
            flight1.departure_time, flight1.landing_time, -1);

        assert.strictEqual(actual, -1);

    });

})
