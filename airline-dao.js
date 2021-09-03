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

module.exports = {
        delete_airline_flights,
        delete_customer,
        delete_flight_tickets,
        get_airline_by_username,
        insert_airline,
        insert_flight,
        update_airline,
        update_flights
}