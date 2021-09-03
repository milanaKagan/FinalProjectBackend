const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
                f();
        }
        catch (e) {
                return e.message
        }
}
function get_flight_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_flight_by_id(${id})`);
                //console.log(result.rows[0].sp_get_flight_by_id);
                 return result.rows[0].sp_get_flight_by_id;
        }
        return try_func(f);
}
function get_flights_by_airline_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_flights_by_airline_id(${id})`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_flights_by_parameters(origin_country_id, destination_country_id, date) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_flights_by_parameters(${origin_country_id},
                        ${destination_country_id},'${date}')`);
               //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_arrival_flights(country_id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_arrival_flights(${country_id})`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_departure_flights(country_id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_departure_flights(${country_id})`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_all_flights() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_all_flights()`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_country_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_country_by_id(${id})`);
                //console.log(result.rows[0].sp_get_country_by_id);
                return result.rows[0].sp_get_country_by_id;
        }
        return try_func(f);
}
function get_all_countries() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_all_countries()`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_all_airlines() {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_all_airlines()`);
                //console.log(result.rows);
                return result.rows;
        }
        return try_func(f);
}
function get_airline_by_id(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select sp_get_airline_by_id(${id})`);
                //console.log(result.rows[0].sp_get_airline_by_id);
                return result.rows[0].sp_get_airline_by_id;
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
        insert_user,
}