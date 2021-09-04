const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
                f();
        }
        catch (e) {
                return e.message
        }
}
function delete_airline_flights(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_delete_airline_flights(${id})`);
                console.log(result.rows[0].sp_delete_airline_flights);
        }
        return try_func(f);
}
function delete_customer(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_delete_customer(${id})`);
                console.log(result.rows[0].sp_delete_customer);
        }
        return try_func(f);
}
function delete_tickets(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_delete_tickets(${id})`);
                console.log(result.rows[0].sp_delete_tickets);
        }
        return try_func(f);
}
function delete_flight_tickets(id) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_delete_flight_tickets(${id})`);
                console.log(result.rows[0].sp_delete_flight_tickets);
        }
        return try_func(f);
} 
function get_airline_by_username(username) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_get_airline_by_username('${username}')`);
                console.log(result.rows);
        }
        return try_func(f);
}
function insert_airline(name,countryId,userId) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_insert_airline('${name}',${countryId},${userId})`);
                console.log(result.rows[0].sp_insert_airline);
        }
        return try_func(f);
}
function insert_flight(airlineId,originCountryId,destinationContryId,departureTime,landingTime,remainingTickets) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_insert_flight(${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                console.log(result.rows[0].sp_insert_flight);
        }
        return try_func(f);
}
function update_flight(id,airlineId,originCountryId,destinationContryId,departureTime,landingTime,remainingTickets) {

        const f = async () => {
                const result = await raw_repo
                .getRawResult(`select * from sp_update_flight(${id},${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                console.log(result.rows[0].sp_update_flight);
        }
        return try_func(f);
}
function update_airline(id,name,countryId,userId) {

        const f = async () => {
                const result = await raw_repo.getRawResult(`select * from sp_update_airline(${id},'${name}',${countryId},${userId})`);
                console.log(result.rows[0].sp_update_airline);
        }
        return try_func(f);
}
module.exports = {
        delete_airline_flights,
        delete_customer,
        delete_tickets,
        delete_flight_tickets,
        get_airline_by_username,
        insert_airline,
        insert_flight,
        update_airline,
        update_flight
}