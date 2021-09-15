const assert = require('assert'); // for the testing capabilites
const customer_dao = require('./customer-dao');// our testing subject
const connectedKnex = require('./knex-connector-test');

describe('test customer user dao functions:', () => {
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
        ticket1 = {
            flight_id: 1,
            customer_id: 1
        };

        await connectedKnex.raw('call sp_delete_and_reset_all()');
        await connectedKnex.raw(`select * from sp_insert_country('${country1.name}')`);
        await connectedKnex.raw(`select * from sp_insert_user('${user1.username}','${user1.password}','${user1.email}')`);
        await connectedKnex.raw(`select * from sp_insert_customer('${customer1.first_name}','${customer1.last_name}',
        '${customer1.address}','${customer1.phone_no}','${customer1.credit_card_no}',${customer1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_airline('${airline1.name}',${airline1.country_id},${airline1.user_id})`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
        await connectedKnex.raw(`select * from sp_insert_ticket(${ticket1.flight_id},${ticket1.customer_id})`);

    });
    afterEach(async function () {
        // 1. delete all records
        await connectedKnex.raw('call sp_delete_and_reset_all()');
    });

    it('delete ticket by id', async function () {
        var actual = await customer_dao.delete_ticket(1);
        assert.strictEqual(actual, '1');
        var ticket = await customer_dao.get_ticket_by_id(1);
        assert.strictEqual(ticket[0], undefined);

    });
    it('delete ticket by not existant id', async function () {
        var actual = await customer_dao.delete_ticket(1000000);
        assert.strictEqual(actual,'0');

    });
    it('delete ticket by not valid id', async function () {
        var actual = await customer_dao.delete_ticket(0);
        assert.strictEqual(actual, -1);

    });
    it('get user by id', async function () {
        var actual = await customer_dao.get_user_by_id(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].username, user1.username);
        assert.strictEqual(actual[0].password, user1.password);
        assert.strictEqual(actual[0].email, user1.email);


    });
    it('get user by not existant id', async function () {
        var actual = await customer_dao.get_user_by_id(1000000);
        assert.strictEqual(actual[0], undefined);

    });
    it('get user by not valid id', async function () {
        var actual = await customer_dao.get_user_by_id(0);
        assert.strictEqual(actual, -1);

    });
    it('get user by username', async function () {
        var actual = await customer_dao.get_user_by_username(user1.username);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].username, user1.username);
        assert.strictEqual(actual[0].email, user1.email);


    });
    it('get user by not existant username', async function () {
        var actual = await customer_dao.get_user_by_username('aaa');
        assert.strictEqual(actual[0], undefined);

    });
    it('get user by not valid username', async function () {
        var actual = await customer_dao.get_user_by_username('');
        assert.strictEqual(actual, -1);

    });
    it('update user', async function () {
        var actual = await customer_dao.update_user(1,"user", "password", "email");
        assert.strictEqual(actual, '1');
        var user =  await customer_dao.get_user_by_id(1);
        assert.strictEqual(user[0].id, '1');
        assert.strictEqual(user[0].username, "user");
        assert.strictEqual(user[0].password, "password");
        assert.strictEqual(user[0].email, "email");

    });
    it('update user empty userName', async function () {
        var actual = await customer_dao.update_user(1,"", "password", "email");
        assert.strictEqual(actual, -1);

    });
    it('update user short password', async function () {
        var actual = await customer_dao.update_user(1,"user", "123", "email");
        assert.strictEqual(actual, -1);

    });
    it('update user empty mail', async function () {
        var actual = await customer_dao.update_user(1,"user", "123", "");
        assert.strictEqual(actual, -1);

    });
    it('update user empty password', async function () {
        var actual = await customer_dao.update_user(1,"user", "", "email");
        assert.strictEqual(actual, -1);

    });
    it('insert ticket', async function () {
        await connectedKnex.raw(`select * from sp_insert_user('user','pass','mail')`);
        await connectedKnex.raw(`select * from sp_insert_customer('first2','last2',
        'add2','phone_no2','credit_card_no2',2)`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
        var actual = await customer_dao.insert_ticket(2,2);
        assert.strictEqual(actual, '2');
        var ticket = await customer_dao.get_ticket_by_id(2);
        assert.strictEqual(ticket[0].id, '2');
        assert.strictEqual(ticket[0].flight_id, '2');
        assert.strictEqual(ticket[0].costumer_id, '2');
    });
    it('insert ticket bad flight id', async function () {
        var actual = await customer_dao.insert_ticket(-1,2);
        assert.strictEqual(actual, -1);
    });
    it('insert ticket bad customer id', async function () {
        var actual = await customer_dao.insert_ticket(2,-1);
        assert.strictEqual(actual, -1);
    });
    it('update ticket', async function () {
        await connectedKnex.raw(`select * from sp_insert_user('user','pass','mail')`);
        await connectedKnex.raw(`select * from sp_insert_customer('first2','last2',
        'add2','phone_no2','credit_card_no2',2)`);
        await connectedKnex.raw(`select * from sp_insert_flight(${flight1.airline_id},${flight1.origin_country_id},
            ${flight1.destination_country_id},'${flight1.departure_time}','${flight1.landing_time}'
            ,${flight1.remaining_tickets})`);
        var actual = await customer_dao.update_ticket(1,2,2);
        assert.strictEqual(actual, '1');
        var ticket = await customer_dao.get_ticket_by_id(1);
        assert.strictEqual(ticket[0].id, '1');
        assert.strictEqual(ticket[0].flight_id, '2');
        assert.strictEqual(ticket[0].costumer_id, '2');
    });
    it('update ticket bad flight id', async function () {
        var actual = await customer_dao.update_ticket(1,-1,2);
        assert.strictEqual(actual, -1);
    });
    it('update ticket bad customer id', async function () {
        var actual = await customer_dao.update_ticket(1,2,-1);
        assert.strictEqual(actual, -1);
    });
    it('insert customer', async function () {
        await connectedKnex.raw(`select * from sp_insert_user('user','pass','mail')`);
        var result = await customer_dao.insert_customer("first2","last2","add2","phno2","credit2",2)
        assert.strictEqual(result, '2');
        var actual = await customer_dao.get_customer_by_id(2);        
        assert.strictEqual(actual[0].id, '2');
        assert.strictEqual(actual[0].first_name, "first2");
        assert.strictEqual(actual[0].last_name, "last2");
        assert.strictEqual(actual[0].address, "add2");
        assert.strictEqual(actual[0].phone_no, "phno2");
        assert.strictEqual(actual[0].credit_card_no,"credit2");
        assert.strictEqual(actual[0].user_id, "2");

    });
    it('insert customer bad first_name', async function () {
        var result = await customer_dao.insert_customer(null,"last2","add2","phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('insert customer bad last_name', async function () {
        var result = await customer_dao.insert_customer("first2","","add2","phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('insert customer bad address', async function () {
        var result = await customer_dao.insert_customer("first2","last2",null,"phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('insert customer bad phone no', async function () {
        var result = await customer_dao.insert_customer("first2","last2","add2","","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('insert customer bad credit card no', async function () {
        var result = await customer_dao.insert_customer("first2","last2","add2","phoneno",null,2)
        assert.strictEqual(result, -1);

    });
    it('insert customer bad user id', async function () {
        var result = await customer_dao.insert_customer("first2","last2","add2","phoneno","credit2",-1)
        assert.strictEqual(result, -1);

    });
    it('update customer', async function () {
        await connectedKnex.raw(`select * from sp_insert_user('user','pass','mail')`);
        var result = await customer_dao.update_customer(1,"first2","last2","add2","phno2","credit2",2)
        assert.strictEqual(result, '1');
        var actual = await customer_dao.get_customer_by_id(1);        
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].first_name, "first2");
        assert.strictEqual(actual[0].last_name, "last2");
        assert.strictEqual(actual[0].address, "add2");
        assert.strictEqual(actual[0].phone_no, "phno2");
        assert.strictEqual(actual[0].credit_card_no,"credit2");
        assert.strictEqual(actual[0].user_id, "2");

    });
    it('update customer bad first_name', async function () {
        var result = await customer_dao.update_customer(1,null,"last2","add2","phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('update customer bad last_name', async function () {
        var result = await customer_dao.update_customer(1,"first2","","add2","phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('update customer bad address', async function () {
        var result = await customer_dao.update_customer(1,"first2","last2",null,"phno2","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('update customer bad phone no', async function () {
        var result = await customer_dao.update_customer(1,"first2","last2","add2","","credit2",2)
        assert.strictEqual(result, -1);

    });
    it('update customer bad credit card no', async function () {
        var result = await customer_dao.update_customer(1,"first2","last2","add2","phoneno",null,2)
        assert.strictEqual(result, -1);

    });
    it('update customer bad user id', async function () {
        var result = await customer_dao.update_customer(1,"first2","last2","add2","phoneno","credit2",-1)
        assert.strictEqual(result, -1);

    });

    it('get ticket by id', async function () {
        var actual = await customer_dao.get_ticket_by_id(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].flight_id, ticket1.flight_id.toString());
        assert.strictEqual(actual[0].costumer_id, ticket1.customer_id.toString());
    
    });
    it('get ticket by not existant id', async function () {
        var actual = await customer_dao.get_ticket_by_id(1000000);
        assert.strictEqual(actual[0], undefined);

    });
    it('get ticket by not valid id', async function () {
        var actual = await customer_dao.get_ticket_by_id(0);
        assert.strictEqual(actual, -1);

    });
    it('get ticket by customer id', async function () {
        var actual = await customer_dao.get_tickets_by_customer(1);
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].flight_id, ticket1.flight_id.toString());
        assert.strictEqual(actual[0].customer_id, ticket1.customer_id.toString());

    });
    it('get ticket by not existant customer id', async function () {
        var actual = await customer_dao.get_tickets_by_customer(1000000);
        assert.strictEqual(actual[0], undefined);
    });
    it('get ticket by not valid customer id', async function () {
        var actual = await customer_dao.get_tickets_by_customer(0);
        assert.strictEqual(actual, -1);
    });
    it('get customer by username', async function () {
        var actual = await customer_dao.get_customer_by_username(user1.username);  
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].first_name, customer1.first_name);
        assert.strictEqual(actual[0].last_name, customer1.last_name);
        assert.strictEqual(actual[0].address, customer1.address);
        assert.strictEqual(actual[0].phone_no, customer1.phone_no);
        assert.strictEqual(actual[0].credit_card, customer1.credit_card_no);
        assert.strictEqual(actual[0].user_id, customer1.user_id.toString());

    });
    it('get customer by invalid username', async function () {
        result = await customer_dao.get_customer_by_username('');
        assert.strictEqual(result, -1);

    });
    it('get customer by not existent username', async function () {
        actual = await customer_dao.get_customer_by_username('notExistent');
        assert.strictEqual(actual[0], undefined);

    });
    it('get customer by existent id', async function () {
        var actual = await customer_dao.get_customer_by_id(1);        
        assert.strictEqual(actual[0].id, '1');
        assert.strictEqual(actual[0].first_name, customer1.first_name);
        assert.strictEqual(actual[0].last_name, customer1.last_name);
        assert.strictEqual(actual[0].address, customer1.address);
        assert.strictEqual(actual[0].phone_no, customer1.phone_no);
        assert.strictEqual(actual[0].credit_card_no, customer1.credit_card_no);
        assert.strictEqual(actual[0].user_id, customer1.user_id.toString());

    });
    it('get customer by invalid id', async function () {
        result = await customer_dao.get_customer_by_id(-1);
        assert.strictEqual(result, -1);

    });
    it('get customer by not existent id', async function () {
        actual = await customer_dao.get_customer_by_id(2);
        assert.strictEqual(actual[0], undefined);

    });

})
