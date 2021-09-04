const e = require('express');
const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
                return f();
        }
        catch (e) {
                return e.message
        }
}
function delete_country_flights(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_country_flights function: id is invalid');
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_country_flights(${id})`);
                        console.log(result.rows[0].sp_delete_country_flights);
                }
        }
        return try_func(f);
}
function delete_customers_user(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_customers_user function: id is invalid');
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_customers_user(${id})`);
                        console.log(result.rows[0].sp_delete_customers_user);
                }
        }
        return try_func(f);
}
function get_all_customers() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_customers()`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_all_tickets() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from  sp_get_all_tickets()`);
                console.log(result.rows);
        }
        return try_func(f);
}
function get_all_users() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_users()`);
                console.log(result.rows);
        }
        return try_func(f);
}
function insert_country(name) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('insert_country function: name is null or empty');
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_country('${name}')`);
                        console.log(result.rows[0].sp_insert_country);
                }
        }
        return try_func(f);
}
function update_country(id, name) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('update_country function: name is null or empty');
                }
                if (id <= 0 || id == null) {
                        console.log('update_country function: id is invalid');
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_country(${id},'${name}')`);
                        console.log(result.rows[0].sp_update_country);
                }
        }
        return try_func(f);
}
module.exports = {
        delete_country_flights,
        delete_customers_user,
        get_all_customers,
        get_all_tickets,
        get_all_users,
        insert_country,
        update_country
}