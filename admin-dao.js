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
    delete_country,
    delete_customers_user,
    delete_user,
    get_all_customers,
    get_all_tickets,
    get_all_users,
    insert_country,
    update_country

}