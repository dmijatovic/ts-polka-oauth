
SET client_encoding = 'UTF8';

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT public.uuid_generate_v4(),
    roles character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    birth_date date NOT NULL,
    createdate date DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY (email)
);

-- ******************
-- IMPORT DATA
-- ******************

-- INSERT DEMO USER: demo.user@gmail.com, password

INSERT INTO users (roles, first_name, last_name, email, birth_date, password)
    VALUES('user,admin','Demo','User','demo.user@gmail.com','1970-11-25T00:00:00.000Z','$2b$12$819ocayl9ya63PFpOd/ZR.H8YHO8bIH6qzK5ohoXEiVn75ozL2AD.');
