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
        get_tickets_by_customer,
        delete_ticket,
        get_customer_by_id,
        get_customer_by_username,
        get_ticket_by_id,
        get_tickets_by_customer,
        get_user_by_id,
        get_user_by_username,
        insert_customer,
        update_customer,
        update_ticket,
        update_user
}