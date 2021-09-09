--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sp_delete_airline(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM airlines
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_airline(_id bigint) OWNER TO postgres;

--
-- Name: FUNCTION sp_delete_airline(_id bigint); Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON FUNCTION public.sp_delete_airline(_id bigint) IS 'airline user';


--
-- Name: sp_delete_airline_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_airline_flights(_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from flights
        using flights
        where flights.aireline_id = _id;

        with rows as  (
            delete from airline
            where airline.id = _id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_airline_flights(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_and_reset_all(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_delete_and_reset_all()
    LANGUAGE plpgsql
    AS $$
    begin
		
		delete from tickets
        where id >= 1;
        alter sequence tickets_id_seq restart with 1;
		
		delete from flights
        where id >= 1;
        alter sequence flights_id_seq restart with 1;
		
		delete from airlines
        where id >= 1;
        alter sequence airlines_id_seq restart with 1;
		
		       
	    delete from customers
        where id >= 1;
        alter sequence customers_id_seq restart with 1;
		
		delete from countries
        where id >= 1;
        alter sequence countries_id_seq restart with 1;
	    
		delete from users
        where id >= 1;
        alter sequence users_id_seq restart with 1;
				
    end;
    $$;


ALTER PROCEDURE public.sp_delete_and_reset_all() OWNER TO postgres;

--
-- Name: sp_delete_country(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_country(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM countries
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_country(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_country_flights(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_country_flights(_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from flights
        using countries
        where flights.origin_country_id = _id or 
		flights.destination_country_id=_id;

        with rows as  (
            delete from countries
            where countries.id = _id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_country_flights(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customer(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM customers
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_customer(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_customers_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_customers_user(_user_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from customers
        using users
        where customers.user_id = _user_id;

        with rows as  (
            delete from users
            where users.id = _user_id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_customers_user(_user_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flight(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flight(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM flights
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_flight(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_flight_tickets(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_flight_tickets(_flight_id bigint) RETURNS integer
    LANGUAGE plpgsql
    AS $$
    declare
        rows_count int := 0;
    begin
        delete from tickets
        using flights
        where tickets.flight_id = _flight_id;

        with rows as  (
            delete from flights
            where flights.id = _flight_id
            RETURNING 1
        )
        select count(*) into rows_count from rows;
        return rows_count;
    end;
    $$;


ALTER FUNCTION public.sp_delete_flight_tickets(_flight_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_ticket(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_ticket(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$;


ALTER FUNCTION public.sp_delete_ticket(_id bigint) OWNER TO postgres;

--
-- Name: sp_delete_user(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_delete_user(_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM users
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_delete_user(_id bigint) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: airlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airlines (
    id bigint NOT NULL,
    name text NOT NULL,
    country_id integer NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.airlines OWNER TO postgres;

--
-- Name: sp_get_airline_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_id(_id bigint) RETURNS SETOF public.airlines
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_airline_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_airline_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_airline_by_username(_username text) RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT a.id, a.name, a.country_id, a.user_id from airlines a
            JOIN users u on a.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;


ALTER FUNCTION public.sp_get_airline_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_all_airlines(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_airlines() RETURNS TABLE(id bigint, name text, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from airlines;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_airlines() OWNER TO postgres;

--
-- Name: sp_get_all_countries(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_countries() RETURNS TABLE(id integer, name text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_countries() OWNER TO postgres;

--
-- Name: sp_get_all_customers(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_customers() RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card_no text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_customers() OWNER TO postgres;

--
-- Name: sp_get_all_flights(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_flights() RETURNS TABLE(id bigint, airline_id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_flights() OWNER TO postgres;

--
-- Name: sp_get_all_tickets(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_tickets() RETURNS TABLE(id bigint, flight_id bigint, costumer_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_tickets() OWNER TO postgres;

--
-- Name: sp_get_all_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_all_users() RETURNS TABLE(id bigint, username text, password text, email text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users;
        END;
    $$;


ALTER FUNCTION public.sp_get_all_users() OWNER TO postgres;

--
-- Name: sp_get_arrival_flights(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_arrival_flights(_country_id integer) RETURNS TABLE(id bigint, airlineid bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
           RETURN QUERY
            SELECT * from flights f
			WHERE f.destination_country_id = _country_id and
			(f.landing_time between NOW() and (NOW() + INTERVAL '12 hours' ));
        END;
$$;


ALTER FUNCTION public.sp_get_arrival_flights(_country_id integer) OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: sp_get_country_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_country_by_id(_id bigint) RETURNS SETOF public.countries
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from countries
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_country_by_id(_id bigint) OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    address text NOT NULL,
    phone_no text NOT NULL,
    credit_card_no text NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: sp_get_customer_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_id(_id bigint) RETURNS SETOF public.customers
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from customers
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_customer_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_customer_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_customer_by_username(_username text) RETURNS TABLE(id bigint, first_name text, last_name text, address text, phone_no text, credit_card text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT c.id, c.first_name, c.last_name, c.address,
			c.phone_no, c.credit_card_no, c.user_id from customers c
            JOIN users u on c.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;


ALTER FUNCTION public.sp_get_customer_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_get_departure_flights(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_departure_flights(_country_id integer) RETURNS TABLE(id bigint, airlineid bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone, remaining_tickets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
           RETURN QUERY
            SELECT * from flights f
			WHERE f.origin_country_id = _country_id and
			(f.departure_time between NOW() and (NOW() + INTERVAL '12 hours' ));
        END;
$$;


ALTER FUNCTION public.sp_get_departure_flights(_country_id integer) OWNER TO postgres;

--
-- Name: flights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flights (
    id bigint NOT NULL,
    airline_id bigint NOT NULL,
    origin_country_id integer NOT NULL,
    destination_country_id integer NOT NULL,
    departure_time timestamp without time zone NOT NULL,
    landing_time timestamp without time zone NOT NULL,
    remaining_tickets integer NOT NULL
);


ALTER TABLE public.flights OWNER TO postgres;

--
-- Name: sp_get_flight_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flight_by_id(_id bigint) RETURNS SETOF public.flights
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from flights
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_flight_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_airline_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) RETURNS TABLE(id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT f.id, f.origin_country_id, f.destination_country_id,
			f.departure_time, f.landing_time from flights f
            JOIN airlines a on a.id = f.airline_id
			Where a.id = _airline_id;
        END;
    $$;


ALTER FUNCTION public.sp_get_flights_by_airline_id(_airline_id bigint) OWNER TO postgres;

--
-- Name: sp_get_flights_by_parameters(integer, integer, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date timestamp without time zone) RETURNS TABLE(id bigint, origin_country_id integer, destination_country_id integer, departure_time timestamp without time zone, landing_time timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT f.id, f.origin_country_id, f.destination_country_id,
			f.departure_time, f.landing_time from flights f
			Where f.origin_country_id = _origin_country_id and
			f.destination_country_id=_destination_country_id and f.departure_time=_date;
        END;
    $$;


ALTER FUNCTION public.sp_get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date timestamp without time zone) OWNER TO postgres;

--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id bigint NOT NULL,
    flight_id bigint NOT NULL,
    costumer_id bigint NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: sp_get_ticket_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_ticket_by_id(_id bigint) RETURNS SETOF public.tickets
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from tickets
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_ticket_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_tickets_by_customer(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) RETURNS TABLE(id bigint, customer_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT t.id, t.costumer_id from tickets t
            JOIN customers c on c.id = t.costumer_id
			Where c.id = _customer_id;
        END;
    $$;


ALTER FUNCTION public.sp_get_tickets_by_customer(_customer_id bigint) OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: sp_get_user_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_id(_id bigint) RETURNS SETOF public.users
    LANGUAGE plpgsql
    AS $$
        BEGIN
            RETURN QUERY
            SELECT * from users
            WHERE id = _id;
        END;
    $$;


ALTER FUNCTION public.sp_get_user_by_id(_id bigint) OWNER TO postgres;

--
-- Name: sp_get_user_by_username(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_get_user_by_username(_username text) RETURNS TABLE(id bigint, username text, email text)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT u.id, u.username, u.email from users u
			WHERE u.username = _username;
        END;
    $$;


ALTER FUNCTION public.sp_get_user_by_username(_username text) OWNER TO postgres;

--
-- Name: sp_insert_airline(text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_airline(_name text, _country_id integer, user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO airlines(name,country_id,user_id)
            VALUES (_name,_country_id,user_id)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_airline(_name text, _country_id integer, user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_country(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_country(_name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO countries (name)
            VALUES (_name)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_country(_name text) OWNER TO postgres;

--
-- Name: sp_insert_customer(text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO customers (first_name, last_name, address,
											 phone_no, credit_card_no, user_id)
            VALUES (_first_name, _last_name, _address,
											 _phone_no, _credit_card_no, _user_id)
            RETURNING id into new_id;

            return new_id;
        END;
$$;


ALTER FUNCTION public.sp_insert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_flight(bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO flights(airline_id , origin_country_id ,destination_country_id,
								departure_time ,landing_time, remaining_tickets)
            VALUES (_airline_id , _origin_country_id ,_destination_country_id,
								_departure_time ,_landing_time, _remaining_tickets)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_flight(_airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_insert_ticket(bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_ticket(_flight_id bigint, _costumer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO tickets(flight_id,costumer_id)
            VALUES (_flight_id,_costumer_id)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_ticket(_flight_id bigint, _costumer_id bigint) OWNER TO postgres;

--
-- Name: sp_insert_user(text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_insert_user(_username text, _password text, _email text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            new_id bigint;
        BEGIN
            INSERT INTO users (username, password, email)
            VALUES (_username, _password, _email)
            RETURNING id into new_id;

            return new_id;
        END;
    $$;


ALTER FUNCTION public.sp_insert_user(_username text, _password text, _email text) OWNER TO postgres;

--
-- Name: sp_update_airline(bigint, text, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE airlines
            SET name = _name,country_id= _country_id, user_id=_user_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_airline(_id bigint, _name text, _country_id integer, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_country(integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_country(_id integer, _name text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE countries
            SET name = _name
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_country(_id integer, _name text) OWNER TO postgres;

--
-- Name: sp_update_customer(bigint, text, text, text, text, text, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE customers
            SET first_name=_first_name, last_name=_last_name,
			   address= _address, phone_no=_phone_no, credit_card_no =_credit_card_no, user_id = _user_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_update_flight(bigint, bigint, integer, integer, timestamp without time zone, timestamp without time zone, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE flights
            SET airline_id=_airline_id, origin_country_id=_origin_country_id,
			   destination_country_id= destination_country_id, departure_time=_departure_time, 
				landing_time =_landing_time, remaining_tickets = _remaining_tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer, _destination_country_id integer, _departure_time timestamp without time zone, _landing_time timestamp without time zone, _remaining_tickets integer) OWNER TO postgres;

--
-- Name: sp_update_ticket(bigint, bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_ticket(_id bigint, _flight_id bigint, _costumer_id bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE tickets
            SET flight_id= _flight_id, costumer_id=_costumer_id
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_ticket(_id bigint, _flight_id bigint, _costumer_id bigint) OWNER TO postgres;

--
-- Name: sp_update_user(bigint, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            UPDATE users
            SET username = _username, password = _password, 
                        email = _email
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
    $$;


ALTER FUNCTION public.sp_update_user(_id bigint, _username text, _password text, _email text) OWNER TO postgres;

--
-- Name: sp_upsert_customer(text, text, text, text, text, bigint); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint)
    LANGUAGE plpgsql
    AS $$
    begin
        if not exists(select 1 from customers where phone_no = _phone_no or credit_card_no=_credit_card_no
					 or user_id=_user_id) then
        insert into customers (first_name, last_name,
		address, phone_no, credit_card_no, user_id)
        values(_first_name, _last_name,
		_address, _phone_no, _credit_card_no, _user_id);
        else
            update customers
            SET first_name=_first_name,last_name= _last_name,
			address=_address,phone_no= _phone_no, credit_card_no=_credit_card_no, 
			user_id=_user_id
            where phone_no = _phone_no or credit_card_no=_credit_card_no
					 or user_id=_user_id;
        end if;
    end;
    $$;


ALTER PROCEDURE public.sp_upsert_customer(_first_name text, _last_name text, _address text, _phone_no text, _credit_card_no text, _user_id bigint) OWNER TO postgres;

--
-- Name: sp_upsert_user(text, text, text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_upsert_user(_username text, _password text, _email text)
    LANGUAGE plpgsql
    AS $$
    begin
        INSERT INTO users (username, password, email)
        VALUES(_username, _password, _email)
        ON CONFLICT (username)
        DO
           UPDATE SET username = _username, password=_password, email=_email;
    end;
    $$;


ALTER PROCEDURE public.sp_upsert_user(_username text, _password text, _email text) OWNER TO postgres;

--
-- Name: airlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.airlines ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.airlines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.countries ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.customers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: flights_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.flights ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.flights_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tickets ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: airlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airlines (id, name, country_id, user_id) FROM stdin;
1	Private flight	53	1
2	135 Airways	233	2
3	1Time Airline	231	3
4	2 Sqn No 1 Elementary Flying Training School	84	4
5	213 Flight Unit	88	5
6	223 Flight Unit State Airline	207	6
7	224th Flight Unit	34	7
8	247 Jet Ltd	91	8
9	3D Aviation	214	9
10	40-Mile Air	127	10
12	testairline	1	13
17	xxx8	1	14
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
1	Afghanistan
5	American Samoa
6	AndorrA
7	Angola
8	Anguilla
9	Antarctica
10	Antigua and Barbuda
11	Argentina
12	Armenia
13	Aruba
14	Australia
15	Austria
16	Azerbaijan
17	Bahamas
18	Bahrain
19	Bangladesh
20	Barbados
21	Belarus
22	Belgium
23	Belize
24	Benin
25	Bermuda
26	Bhutan
27	Bolivia
28	Bosnia and Herzegovina
29	Botswana
30	Bouvet Island
31	Brazil
32	British Indian Ocean Territory
33	Brunei Darussalam
34	Bulgaria
35	Burkina Faso
36	Burundi
37	Cambodia
38	Cameroon
39	Canada
40	Cape Verde
41	Cayman Islands
42	Central African Republic
43	Chad
44	Chile
45	China
46	Christmas Island
47	Cocos (Keeling) Islands
48	Colombia
49	Comoros
50	Congo
51	Congo, The Democratic Republic of the
52	Cook Islands
53	Costa Rica
54	Cote D`Ivoire
55	Croatia
56	Cuba
57	Cyprus
58	Czech Republic
59	Denmark
60	Djibouti
61	Dominica
62	Dominican Republic
63	Ecuador
64	Egypt
65	El Salvador
66	Equatorial Guinea
67	Eritrea
68	Estonia
69	Ethiopia
70	Falkland Islands (Malvinas)
71	Faroe Islands
72	Fiji
73	Finland
74	France
75	French Guiana
76	French Polynesia
77	French Southern Territories
78	Gabon
79	Gambia
80	Georgia
81	Germany
82	Ghana
83	Gibraltar
84	Greece
85	Greenland
86	Grenada
87	Guadeloupe
88	Guam
89	Guatemala
90	Guernsey
91	Guinea
92	Guinea-Bissau
93	Guyana
94	Haiti
95	Heard Island and Mcdonald Islands
96	Holy See (Vatican City State)
97	Honduras
98	Hong Kong
99	Hungary
100	Iceland
101	India
102	Indonesia
103	Iran, Islamic Republic Of
104	Iraq
105	Ireland
106	Isle of Man
107	Israel
108	Italy
109	Jamaica
110	Japan
111	Jersey
112	Jordan
113	Kazakhstan
114	Kenya
115	Kiribati
116	Korea, Democratic People`S Republic of
117	Korea, Republic of
118	Kuwait
119	Kyrgyzstan
120	Lao People`S Democratic Republic
121	Latvia
122	Lebanon
123	Lesotho
124	Liberia
125	Libyan Arab Jamahiriya
126	Liechtenstein
127	Lithuania
128	Luxembourg
129	Macao
130	Macedonia, The Former Yugoslav Republic of
131	Madagascar
132	Malawi
133	Malaysia
134	Maldives
135	Mali
136	Malta
137	Marshall Islands
138	Martinique
139	Mauritania
140	Mauritius
141	Mayotte
142	Mexico
143	Micronesia, Federated States of
144	Moldova, Republic of
145	Monaco
146	Mongolia
147	Montserrat
148	Morocco
149	Mozambique
150	Myanmar
151	Namibia
152	Nauru
153	Nepal
154	Netherlands
155	Netherlands Antilles
156	New Caledonia
157	New Zealand
158	Nicaragua
159	Niger
160	Nigeria
161	Niue
162	Norfolk Island
163	Northern Mariana Islands
164	Norway
165	Oman
166	Pakistan
167	Palau
168	Palestinian Territory, Occupied
169	Panama
170	Papua New Guinea
171	Paraguay
172	Peru
173	Philippines
174	Pitcairn
175	Poland
176	Portugal
177	Puerto Rico
178	Qatar
179	Reunion
180	Romania
181	Russian Federation
182	RWANDA
183	Saint Helena
184	Saint Kitts and Nevis
185	Saint Lucia
186	Saint Pierre and Miquelon
187	Saint Vincent and the Grenadines
188	Samoa
189	San Marino
190	Sao Tome and Principe
191	Saudi Arabia
192	Senegal
193	Serbia and Montenegro
194	Seychelles
195	Sierra Leone
196	Singapore
197	Slovakia
198	Slovenia
199	Solomon Islands
200	Somalia
201	South Africa
202	South Georgia and the South Sandwich Islands
203	Spain
204	Sri Lanka
205	Sudan
206	Suriname
207	Svalbard and Jan Mayen
208	Swaziland
209	Sweden
210	Switzerland
211	Syrian Arab Republic
212	Taiwan, Province of China
213	Tajikistan
214	Tanzania, United Republic of
215	Thailand
216	Timor-Leste
217	Togo
218	Tokelau
219	Tonga
220	Trinidad and Tobago
221	Tunisia
222	Turkey
223	Turkmenistan
224	Turks and Caicos Islands
225	Tuvalu
226	Uganda
227	Ukraine
228	United Arab Emirates
229	United Kingdom
230	United States
231	United States Minor Outlying Islands
232	Uruguay
233	Uzbekistan
234	Vanuatu
235	Venezuela
236	Viet Nam
237	Virgin Islands, British
238	Virgin Islands, U.S.
239	Wallis and Futuna
240	Western Sahara
241	Yemen
242	Zambia
243	Zimbabwe
244	Åland Islands
246	tst
247	tst2
248	tst3
249	tst4
250	tst5update
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, address, phone_no, credit_card_no, user_id) FROM stdin;
1	Isaac	Martinez	Spain, Toledo, Paseo de Zorrilla 6250	915-007-409	372349619384358	1
2	Yvo	Jagtenberg	Netherlands, Ubach Over Worms, Grootveenweg 9026	(949)-536-0971	343351273105141	2
3	Paige	Gibson	Ireland, Skerries, Westmoreland Street 6436	021-240-5706	342205557521913	3
4	Ulf	Goertz	Germany, Altdorf Bei Nürnberg, Birkenweg 962	0806-9857054	347720284161424	4
5	Laly	Muller	France, Grenoble, Avenue du Fort-Caire 3865	05-42-82-72-45	371834231175731	5
6	Wallace	Peters	Ireland, Sallins, High Street 3114	071-286-6927	341173697070608	6
7	کیانا	کریمی	Iran, مشهد, آیت‌الله سعیدی 3913	007-14854774	346981798920694	7
8	Lija	da Costa	Brazil, Maricá, Rua São Pedro  3567	(46) 7456-7813	372508561638612	8
9	Pedro	Reyes	Spain, Elche, Calle de La Almudena 5560	927-957-744	347427545072446	9
10	Donna	Wood	Ireland, Dunboyne, New Street 4303	041-605-3024	378108784480951	10
12	xss	x	x	x	x	13
\.


--
-- Data for Name: flights; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flights (id, airline_id, origin_country_id, destination_country_id, departure_time, landing_time, remaining_tickets) FROM stdin;
1	1	24	161	2021-07-16 00:00:00	2021-04-06 00:00:00	209
2	1	115	156	2021-11-16 00:00:00	2021-04-18 00:00:00	18
3	2	57	31	2021-04-13 00:00:00	2021-10-18 00:00:00	115
4	3	182	205	2021-02-05 00:00:00	2021-04-10 00:00:00	36
5	3	100	31	2021-08-09 00:00:00	2021-05-12 00:00:00	46
6	4	135	209	2021-05-03 00:00:00	2021-01-08 00:00:00	179
7	4	113	210	2021-08-17 00:00:00	2021-08-06 00:00:00	229
8	4	90	123	2021-04-20 00:00:00	2021-08-14 00:00:00	200
9	5	150	36	2021-05-06 00:00:00	2021-09-15 00:00:00	117
10	5	223	160	2021-09-01 00:00:00	2021-04-13 00:00:00	0
11	6	217	170	2021-02-18 00:00:00	2021-11-11 00:00:00	68
12	7	5	174	2021-03-27 00:00:00	2021-07-25 00:00:00	157
13	7	227	147	2021-11-03 00:00:00	2021-05-18 00:00:00	53
14	8	145	131	2021-07-06 00:00:00	2021-01-18 00:00:00	156
15	8	115	45	2021-05-07 00:00:00	2021-05-19 00:00:00	229
16	8	11	12	2021-03-13 00:00:00	2021-07-19 00:00:00	30
17	9	78	68	2021-10-22 00:00:00	2021-06-06 00:00:00	80
18	9	211	117	2021-08-24 00:00:00	2021-12-20 00:00:00	62
19	9	94	50	2021-01-05 00:00:00	2021-06-07 00:00:00	184
20	10	125	179	2021-05-21 00:00:00	2021-10-14 00:00:00	103
24	1	1	5	2021-08-29 09:10:59.897666	2021-08-30 09:10:59.897666	100
25	1	1	5	2021-08-29 22:00:59.897666	2021-08-30 09:10:59.897666	100
26	1	1	5	2021-08-28 22:00:59.897666	2021-08-30 09:10:59.897666	100
27	1	1	5	2021-08-28 10:01:03.901308	2021-08-28 09:01:03.901308	100
28	1	1	5	2021-08-28 10:01:03.901308	2021-08-28 10:01:03.901308	100
29	1	5	6	2021-08-31 23:00:00	2021-09-01 00:00:00	100
30	2	5	6	2021-08-31 23:00:00	2021-09-01 00:00:00	100
36	17	1	250	2021-08-31 23:00:00	2021-08-31 23:00:00	140
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, flight_id, costumer_id) FROM stdin;
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
10	10	10
11	11	12
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email) FROM stdin;
1	IsaacboD	Isaac_password	isaac.martinez@example.com
2	YvofHj	Yvo_password	yvo.jagtenberg@example.com
3	PaigeG0r	Paige_password	paige.gibson@example.com
4	UlfYTa	Ulf_password	ulf.goertz@example.com
5	LalyezO	Laly_password	laly.muller@example.com
6	Wallacednd	Wallace_password	wallace.peters@example.com
7	کیاناjhg	کیانا_password	khyn.khrymy@example.com
8	LijaUVO	Lija_password	lija.dacosta@example.com
9	Pedroad6	Pedro_password	pedro.reyes@example.com
10	Donna1tF	Donna_password	donna.wood@example.com
11	moka	tahat	mokamail
14	moka2	tahat1	mokamail2
13	mokaqq2	tahatd1	mokamailc2
\.


--
-- Name: airlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airlines_id_seq', 17, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 250, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 12, true);


--
-- Name: flights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flights_id_seq', 36, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: airlines airlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT airlines_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: flights flights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT flights_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_flight_id_costumer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_flight_id_costumer_id_key UNIQUE (flight_id, costumer_id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: customers unique_credit_card_no; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_credit_card_no UNIQUE (credit_card_no);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: countries unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: airlines unique_name_airline; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT unique_name_airline UNIQUE (name);


--
-- Name: customers unique_phone_no; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_phone_no UNIQUE (phone_no);


--
-- Name: customers unique_user_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT unique_user_id UNIQUE (user_id);


--
-- Name: airlines unique_user_id_airline; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT unique_user_id_airline UNIQUE (user_id);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: flights fk_airline_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_airline_id FOREIGN KEY (airline_id) REFERENCES public.airlines(id);


--
-- Name: airlines fk_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES public.countries(id);


--
-- Name: tickets fk_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT fk_customer_id FOREIGN KEY (costumer_id) REFERENCES public.customers(id);


--
-- Name: flights fk_destination_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_destination_country_id FOREIGN KEY (destination_country_id) REFERENCES public.countries(id);


--
-- Name: tickets fk_flight_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT fk_flight_id FOREIGN KEY (flight_id) REFERENCES public.flights(id);


--
-- Name: flights fk_origin_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flights
    ADD CONSTRAINT fk_origin_country_id FOREIGN KEY (origin_country_id) REFERENCES public.countries(id);


--
-- Name: customers fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: airlines fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airlines
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

