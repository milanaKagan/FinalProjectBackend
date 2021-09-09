const raw_repo = require('./raw_repo')
function try_func(f) {
        try {
                return f();
        }
        catch (e) {
                return e.message
        }
}
function delete_airline_flights(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_airline_flights function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_airline_flights(${id})`);
                        return result.rows[0].sp_delete_airline_flights;
                }
        }
        return try_func(f);
}
function delete_customer(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_customer function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_customer(${id})`);
                        return result.rows[0].sp_delete_customer;
                }
        }
        return try_func(f);
}
function delete_tickets(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_tickets function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_tickets(${id})`);
                        return result.rows[0].sp_delete_tickets;
                }
        }
        return try_func(f);
}
function delete_flight_tickets(id) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('delete_flight_tickets function: id is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_delete_flight_tickets(${id})`);
                        return result.rows[0].sp_delete_flight_tickets;
                }
        }
        return try_func(f);
}
function get_airline_by_username(username) {

        const f = async () => {
                if (username == '' || username == null) {
                        console.log('get_airline_by_username function: username is null or empty');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_get_airline_by_username('${username}')`);
                        return result.rows;
                }
        }
        return try_func(f);
}
function insert_airline(name, countryId, userId) {

        const f = async () => {
                if (name == '' || name == null) {
                        console.log('insert_airline function: name is null or empty');
                        return -1;
                }
                if (countryId <= 0 || countryId == null) {
                        console.log('insert_airline function: countryId is invalid');
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        console.log('insert_airline function: userId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_insert_airline('${name}',${countryId},${userId})`);
                        return result.rows[0].sp_insert_airline;
                }
        }
        return try_func(f);
}
function insert_flight(airlineId, originCountryId, destinationContryId, departureTime, landingTime, remainingTickets) {

        const f = async () => {
                if (airlineId <= 0 || airlineId == null) {
                        console.log('insert_flight function: airlineId is invalid');
                        return -1;
                }
                if (originCountryId <= 0 || originCountryId == null) {
                        console.log('insert_flight function: originCountryId is invalid');
                        return -1;
                }
                if (destinationContryId <= 0 || destinationContryId == null) {
                        console.log('insert_flight function: destinationContryId is invalid');
                        return -1;
                }
                if (departureTime == '' || departureTime == null) {
                        console.log('insert_flight function: departureTime is null or empty');
                        return -1;
                }
                if (landingTime == '' || landingTime == null) {
                        console.log('insert_flight function: landingTime is null or empty');
                        return -1;
                }
                if (remainingTickets <= 0 || remainingTickets == null) {
                        console.log('insert_flight function: remainingTickets is invalid');
                        return -1;
                }
                else {

                        const result = await raw_repo
                                .getRawResult(`select * from sp_insert_flight(${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                                return result.rows[0].sp_insert_flight;
                }
        }
        return try_func(f);
}
function update_flight(id, airlineId, originCountryId, destinationContryId, departureTime, landingTime, remainingTickets) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('update_flight function: airlineId is invalid');
                        return -1;
                }
                if (airlineId <= 0 || airlineId == null) {
                        console.log('update_flight function: airlineId is invalid');
                        return -1;
                }
                if (originCountryId <= 0 || originCountryId == null) {
                        console.log('update_flight function: originCountryId is invalid');
                        return -1;
                }
                if (destinationContryId <= 0 || destinationContryId == null) {
                        console.log('update_flight function: destinationContryId is invalid');
                        return -1;
                }
                if (departureTime == '' || departureTime == null) {
                        console.log('update_flight function: departureTime is null or empty');
                        return -1;
                }
                if (landingTime == '' || landingTime == null) {
                        console.log('update_flight function: landingTime is null or empty');
                        return -1;
                }
                if (remainingTickets <= 0 || remainingTickets == null) {
                        console.log('update_flight function: remainingTickets is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo
                                .getRawResult(`select * from sp_update_flight(${id},${airlineId},${originCountryId},${destinationContryId},'${departureTime}','${landingTime}',${remainingTickets})`);
                                return result.rows[0].sp_update_flight;
                }
        }
        return try_func(f);
}
function update_airline(id, name, countryId, userId) {

        const f = async () => {
                if (id <= 0 || id == null) {
                        console.log('update_airline function: id is invalid');
                        return -1;
                }
                if (name == '' || name == null) {
                        console.log('update_airline function: name is null or empty');
                        return -1;
                }
                if (countryId <= 0 || countryId == null) {
                        console.log('update_airline function: countryId is invalid');
                        return -1;
                }
                if (userId <= 0 || userId == null) {
                        console.log('update_airline function: userId is invalid');
                        return -1;
                }
                else {
                        const result = await raw_repo.getRawResult(`select * from sp_update_airline(${id},'${name}',${countryId},${userId})`);
                        return result.rows[0].sp_update_airline;
                }
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