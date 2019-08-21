/* Replace with your SQL commands */

CREATE TABLE tours
(
    id int PRIMARY KEY NOT NULL,
    date_from DATE,
    date_to DATE,
    creator_id int not null REFERENCES users(id)
);

CREATE TABLE tours_attraction
(
    tour_id int not null REFERENCES tours(id),
    attraction_id int not null REFERENCES attraction(id),
    date_from timestamp not null,
    date_to TIMESTAMP not null,
    PRIMARY KEY (tour_id, attraction_id, date_from, date_to)
);



