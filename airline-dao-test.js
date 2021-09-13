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
        customer1 ={
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
        assert.strictEqual(airline[0],undefined);
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
        assert.strictEqual(customer,undefined);

    });
    it('delete customer not existent id', async function () {
        var actual = await airline_dao.delete_customer(1000);
        assert.strictEqual(actual, '0');
    });
    it('delete customer not valid id', async function () {
        var actual = await airline_dao.delete_customer(-1);
        assert.strictEqual(actual, -1);
    });
})
