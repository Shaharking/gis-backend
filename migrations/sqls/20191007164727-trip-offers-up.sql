/* Replace with your SQL commands */

CREATE TABLE trip_offers
(
    trip_id int NOT NULL REFERENCES tours(id),
    user_id int NOT NULL REFERENCES users(id),
    estimation_cost float
);

ALTER TABLE public.trip_offers OWNER TO postgres;
ALTER TABLE ONLY trip_offers
ADD CONSTRAINT "ID_PKEY" PRIMARY KEY
(trip_id, user_id);

UPDATE users
SET user_type = 1;

CREATE TABLE trip_order
(
    trip_id int NOT NULL REFERENCES tours(id),
    user_id int NOT NULL REFERENCES users(id),
    cost float
);

CREATE TABLE trip_ignored
(
    trip_id int NOT NULL REFERENCES tours(id),
    user_id int NOT NULL REFERENCES users(id)
);

