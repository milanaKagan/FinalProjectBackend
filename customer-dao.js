const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
                f();
        }
        catch (e) {
                return e.message
        }
}
function get_tickets_by_customer(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_tickets_by_customer(${id})`);
                console.log(result.rows);
        }
        return try_func(f);
}
function delete_ticket(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_delete_ticket(${id})`);
                console.log(result.rows[0].sp_delete_ticket);
        }
        return try_func(f);
}
function get_customer_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_customer_by_id(${id})`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_customer_by_username(username) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_customer_by_username('${username}')`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_ticket_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_ticket_by_id('${id}')`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_user_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_user_by_id('${id}')`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_user_by_username(username) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_user_by_username('${username}')`);
                console.log(result.rows);
        }
        return try_func(f);
}
function insert_customer(firstName,lastName,address,phone_no,creditCardNo,userId) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_insert_customer('${firstName}','${lastName}','${address}','${phone_no}',
                '${creditCardNo}',${userId})`);
                console.log(result.rows[0].sp_insert_customer);
        }
        return try_func(f);
}
function update_customer(id,firstName,lastName,address,phone_no,creditCardNo,userId) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_update_customer(${id},'${firstName}','${lastName}','${address}','${phone_no}',
                '${creditCardNo}',${userId})`);
                console.log(result.rows[0].sp_update_customer);
        }
        return try_func(f);
}
function insert_ticket(filightId,customerId) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_insert_ticket(${filightId},${customerId})`);
                console.log(result.rows[0].sp_insert_ticket);
        }
        return try_func(f);
}
function update_ticket(id,filightId,customerId) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_update_ticket(${id},${filightId},${customerId})`);
                console.log(result.rows[0].sp_update_ticket);
        }
        return try_func(f);
}
function update_user(id,username,password,email) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_update_user(${id},'${username}','${password}','${email}')`);
                console.log(result.rows[0].sp_update_user);
        }
        return try_func(f);
}
module.exports = {
        get_tickets_by_customer,
        delete_ticket,
        get_customer_by_id,
        get_customer_by_username,
        get_ticket_by_id,
        get_user_by_id,
        get_user_by_username,
        insert_customer,
        update_customer,
        insert_ticket,
        update_ticket,
        update_user
}