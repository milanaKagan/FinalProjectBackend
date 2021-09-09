const raw_repo = require('./raw_repo')
async function try_func(f) {
        try {
               return await f();
        }
        catch (e) {
                return e.message
        }
}
function get_flight_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_flight_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flight_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_flights_by_airline_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_flights_by_airline_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flights_by_airline_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_flights_by_parameters(origin_country_id, destination_country_id, date) {

        const f = async () => {
                if (origin_country_id <= 0 || origin_country_id == null) {
                        console.log('get_flights_by_parameters function: origin_country_id is invalid');
                        return -1;
                }
                if (destination_country_id <= 0 || destination_country_id == null) {
                        console.log('get_flights_by_parameters function: destination_country_id is invalid');
                        return -1;
                }
                if (date == '' || date == null) {
                        console.log('get_flights_by_parameters function: date is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_flights_by_parameters(${origin_country_id},
                        ${destination_country_id},'${date}')`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_arrival_flights(country_id) {

        const f = async () => {
                if (country_id <= 0 || country_id == null) {
                        console.log('get_arrival_flights function: country_id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_arrival_flights(${country_id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_departure_flights(country_id) {

        const f = async () => {
                if (country_id <= 0 || country_id == null) {
                        console.log('get_departure_flights function: country_id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_departure_flights(${country_id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_all_flights() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_flights()`);
                return result.rows;
        }
        return try_func(f);
}
function get_country_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_country_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_country_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function get_all_countries() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_countries()`);
                return result.rows;
        }
        return try_func(f);
}
function get_all_airlines() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_all_airlines()`);
                return result.rows;
        }
        return try_func(f);
}
function get_airline_by_id(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('get_airline_by_id function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_airline_by_id(${id})`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function insert_user(username, password, email) {

        const f = async () => {
                if (username == '' || username == null) {
                        console.log('insert_user function: username is null or empty');
                        return -1;
                }
                if (password == '' || password == null) {
                        console.log('insert_user function: password is null or empty');
                        return -1;
                }
                if (password.length < 6) {
                        console.log('insert_user function: password less than 6 characters');
                        return -1;
                }
                if (email == '' || email == null) {
                        console.log('insert_user function: email is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_user('${username}','${password}','${email}')`);
                        return result.rows[0].sp_insert_user;
                }
        }
        return try_func(f);
}
module.exports = {
        get_flight_by_id,
        get_all_flights,
        get_all_airlines,
        get_airline_by_id,
        get_all_countries,
        get_country_by_id,
        get_arrival_flights,
        get_departure_flights,
        get_flights_by_airline_id,
        get_flights_by_parameters,
        insert_user
}