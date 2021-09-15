const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
               return f();
        }
        catch (e) {
                return e.message
        }
}
function get_tickets_by_customer(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_tickets_by_customer function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_tickets_by_customer(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function delete_ticket(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_ticket function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_ticket(${id})`);
                        return result.rows[0].sp_delete_ticket;
                }
        }
        return try_func(f);
}
function get_customer_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_customer_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_customer_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_customer_by_username(username) {

        const f = async () => {
                if (username == '' || username == null) {
                        console.log('get_customer_by_username function: username is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_customer_by_username('${username}')`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_ticket_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_ticket_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_ticket_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_user_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_user_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_user_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_user_by_username(username) {

        const f = async () => {
                if (username == '' || username == null) {
                        console.log('get_user_by_username function: username is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_user_by_username('${username}')`);
                        return result.rows;

                }
        }
        return try_func(f);
}
function insert_customer(firstName, lastName, address, phone_no, creditCardNo, userId) {

        const f = async () => {
                if (firstName == '' || firstName == null) {
                        console.log('insert_customer function: firstName is null or empty');
                        return -1;
                }
                if (lastName == '' || lastName == null) {
                        console.log('insert_customer function: lastName is null or empty');
                        return -1;

                }
                if (address == '' || address == null) {
                        console.log('insert_customer function: address is null or empty');
                        return -1;

                }
                if (phone_no == '' || phone_no == null) {
                        console.log('insert_customer function: phone_no is null or empty');
                        return -1;

                }
                if (creditCardNo == '' || creditCardNo == null) {
                        console.log('insert_customer function: creditCardNo is null or empty');
                        return -1;

                }
                if (userId <= 0 || userId == null) {
                        console.log('insert_customer function: userId is invalid');
                        return -1;

                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_insert_customer('${firstName}','${lastName}','${address}','${phone_no}',
                '${creditCardNo}',${userId})`);
                        return result.rows[0].sp_insert_customer;

                }
        }
        return try_func(f);
}
function update_customer(id, firstName, lastName, address, phone_no, creditCardNo, userId) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('update_customer function: id is invalid');
                        return -1;
                }
                if (firstName == '' || firstName == null) {
                        console.log('update_customer function: firstName is null or empty');
                        return -1;
                }
                if (lastName == '' || lastName == null) {
                        console.log('update_customer function: lastName is null or empty');
                        return -1;
                }
                if (address == '' || address == null) {
                        console.log('update_customer function: address is null or empty');
                        return -1;
                }
                if (phone_no == '' || phone_no == null) {
                        console.log('update_customer function: phone_no is null or empty');
                        return -1;
                }
                if (creditCardNo == '' || creditCardNo == null) {
                        console.log('update_customer function: creditCardNo is null or empty');
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        console.log('update_customer function: userId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_update_customer(${id},'${firstName}','${lastName}','${address}','${phone_no}',
                '${creditCardNo}',${userId})`);
                return result.rows[0].sp_update_customer;
                }
        }
        return try_func(f);
}
function insert_ticket(filightId, customerId) {

        const f = async () => {
                if (filightId <= 0 || filightId == null) {
                        console.log('insert_ticket function: filightId is invalid');
                        return -1;
                }
                if (customerId <= 0 || customerId == null) {
                        console.log('insert_ticket function: customerId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_insert_ticket(${filightId},${customerId})`);
                                return result.rows[0].sp_insert_ticket;
                }
        }
        return try_func(f);
}
function update_ticket(id, filightId, customerId) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('update_ticket function: id is invalid');
                        return -1;
                }
                if (filightId <= 0 || filightId == null) {
                        console.log('update_ticket function: filightId is invalid');
                        return -1;
                }
                if (customerId <= 0 || customerId == null) {
                        console.log('update_ticket function: customerId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_update_ticket(${id},${filightId},${customerId})`);
                                return result.rows[0].sp_update_ticket;
                }
        }
        return try_func(f);
}
function update_user(id, username, password, email) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('update_user function: id is invalid');
                        return -1;
                }
                if (username == '' || username == null) {
                        console.log('update_user function: username is null or empty');
                        return -1;
                }
                if (password == '' || password == null) {
                        console.log('update_user function: password is null or empty');
                        return -1;
                }
                if (password.length < 6) {
                        console.log('update_user function: password less than 6 characters');
                        return -1;
                }
                if (email == '' || email == null) {
                        console.log('update_user function: email is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_user(${id},'${username}','${password}','${email}')`);
                        return result.rows[0].sp_update_user;
                }
        }
        return try_func(f);
}
module.exports = {
        get_tickets_by_customer,//
        delete_ticket,//
        get_customer_by_id,//
        get_customer_by_username,//
        get_ticket_by_id,//
        get_user_by_id,//
        get_user_by_username,//
        insert_customer,
        update_customer,
        insert_ticket,
        update_ticket,
        update_user//
}