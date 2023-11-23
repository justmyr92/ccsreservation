--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adds_on_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adds_on_table (
    adds_on_id character varying(25) NOT NULL,
    adds_on_name character varying(50),
    reservation_id character varying(25)
);


ALTER TABLE public.adds_on_table OWNER TO postgres;

--
-- Name: client_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client_table (
    client_id character varying(25) NOT NULL,
    client_fname character varying(25),
    client_lname character varying(25),
    client_email character varying(50),
    client_contact character varying(50),
    client_street character varying(50),
    client_barangay character varying(50),
    client_city character varying(50),
    client_password character varying(200),
    role_id character varying(25)
);


ALTER TABLE public.client_table OWNER TO postgres;

--
-- Name: employee_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_table (
    admin_id character varying(25) NOT NULL,
    admin_fname character varying(25),
    admin_lname character varying(25),
    admin_email character varying(50),
    admin_password character varying(200),
    role_id character varying(25)
);


ALTER TABLE public.employee_table OWNER TO postgres;

--
-- Name: event_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_table (
    event_id character varying(25) NOT NULL,
    event_name character varying(50),
    event_type character varying(50),
    event_date date,
    event_time time without time zone,
    event_venue character varying(50),
    event_venue_final character varying(50),
    event_theme character varying(50),
    event_motif character varying(50),
    event_guests integer
);


ALTER TABLE public.event_table OWNER TO postgres;

--
-- Name: food_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_table (
    food_id character varying(25) NOT NULL,
    food_name character varying(50),
    food_type character varying(50),
    food_price numeric(10,2),
    food_description character varying(50),
    food_image character varying(50)
);


ALTER TABLE public.food_table OWNER TO postgres;

--
-- Name: rating_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating_table (
    rating_id character varying(25) NOT NULL,
    rating_value integer,
    rating_comment character varying(50),
    reservation_id character varying(25)
);


ALTER TABLE public.rating_table OWNER TO postgres;

--
-- Name: reservation_food_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation_food_table (
    reservation_food_id character varying(25) NOT NULL,
    reservation_id character varying(25),
    food_id character varying(25)
);


ALTER TABLE public.reservation_food_table OWNER TO postgres;

--
-- Name: reservation_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation_table (
    reservation_id character varying(25) NOT NULL,
    client_id character varying(25),
    event_id character varying(25),
    total_price numeric(10,2),
    client_fname character varying(25),
    client_lname character varying(25),
    client_email character varying(50),
    client_contact character varying(50)
);


ALTER TABLE public.reservation_table OWNER TO postgres;

--
-- Name: role_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_table (
    role_id character varying(25) NOT NULL,
    role_name character varying(50)
);


ALTER TABLE public.role_table OWNER TO postgres;

--
-- Name: server_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.server_table (
    server_id character varying(25) NOT NULL,
    server_fname character varying(25),
    server_lname character varying(25),
    role_id character varying(25)
);


ALTER TABLE public.server_table OWNER TO postgres;

--
-- Name: staff_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_table (
    staff_id character varying(25) NOT NULL,
    staff_fname character varying(25),
    staff_lname character varying(25),
    staff_email character varying(50),
    staff_password character varying(200),
    role_id character varying(25)
);


ALTER TABLE public.staff_table OWNER TO postgres;

--
-- Name: transaction_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_table (
    transaction_id character varying(25) NOT NULL,
    transaction_date date,
    transaction_time time without time zone,
    transaction_total numeric(10,2),
    transaction_status character varying(50),
    transaction_type character varying(50),
    transaction_payment character varying(50),
    reservation_id character varying(25)
);


ALTER TABLE public.transaction_table OWNER TO postgres;

--
-- Data for Name: adds_on_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adds_on_table (adds_on_id, adds_on_name, reservation_id) FROM stdin;
AO_mvrlf4d6b	balloons	RS_uszjl98ta
AO_bt35lg10d	Doves	RS_uszjl98ta
AO_ojkq1k3os	balloons	RS_k7eyl801q
AO_k00i020u9	Doves	RS_k7eyl801q
AO_4khu58xbe	balloons	RS_oeozksjv1
AO_22yxosrly	Doves	RS_oeozksjv1
AO_389u1gvin	Lobo	RS_395njupi6
AO_gv7anocj8	Dove	RS_395njupi6
\.


--
-- Data for Name: client_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_table (client_id, client_fname, client_lname, client_email, client_contact, client_street, client_barangay, client_city, client_password, role_id) FROM stdin;
CL_irs17tzk0	Charlene Gale	Almario	c.almario@example.com	09123456789	Bauan - Mabini Rd.	San Pedro	Bauan	$2b$10$mpdx3uvlUkDDiPmY0wOavu603p6O486CFlFQoaGHvwra4nlePxeAW	ROLE001
\.


--
-- Data for Name: employee_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_table (admin_id, admin_fname, admin_lname, admin_email, admin_password, role_id) FROM stdin;
EMP001	Justmyr	Gutierrez	j.gutierrez@example.com	$2b$10$H67tecwaTDYN1J0rXDsAA.uW8lHr8W69UyA1Jxg7.pmHBaFXQnc2C	ROLE003
\.


--
-- Data for Name: event_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_table (event_id, event_name, event_type, event_date, event_time, event_venue, event_venue_final, event_theme, event_motif, event_guests) FROM stdin;
EV_0u9cuer2l	1st Anniversary	Anniversary	2023-11-24	00:02:00	San Pedro	true	Marriage	White and Blue	21
EV_cubkirhb0	1st Anniversary	Anniversary	2023-11-24	00:02:00	San Pedro	true	Marriage	White and Blue	21
EV_xt4zhlu7j	1st Anniversary	Anniversary	2023-11-24	00:02:00	San Pedro	true	Marriage	White and Blue	21
EV_eerkjuxt9	2st Anniversary	Anniversary	2024-02-14	18:07:00	San Pedro	true	Marriage	White and Blue	12
EV_wf0uksasn	3st Anniversary	Anniversary	2024-02-14	18:07:00	San Pedro	true	Marriage	White and Blue	12
EV_vqmb824ma	3st Anniversary	Anniversary	2024-02-14	18:07:00	San Pedro	true	Marriage	White and Blue	12
\.


--
-- Data for Name: food_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_table (food_id, food_name, food_type, food_price, food_description, food_image) FROM stdin;
\.


--
-- Data for Name: rating_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating_table (rating_id, rating_value, rating_comment, reservation_id) FROM stdin;
\.


--
-- Data for Name: reservation_food_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation_food_table (reservation_food_id, reservation_id, food_id) FROM stdin;
\.


--
-- Data for Name: reservation_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation_table (reservation_id, client_id, event_id, total_price, client_fname, client_lname, client_email, client_contact) FROM stdin;
RS_uszjl98ta	CL_irs17tzk0	EV_0u9cuer2l	56000.00	Charlene Gale	Almario	c.almario1@example.com	09123456789
RS_k7eyl801q	CL_irs17tzk0	EV_cubkirhb0	56000.00	Charlene Gale	Almario	c.almario1@example.com	09123456789
RS_oeozksjv1	CL_irs17tzk0	EV_xt4zhlu7j	56000.00	Charlene Gale	Almario	c.almario1@example.com	09123456789
RS_395njupi6	CL_irs17tzk0	EV_eerkjuxt9	56000.00	Charlene Gale1	Almario	c.almario1@example.com	09123456789
RS_3na2eguky	CL_irs17tzk0	EV_wf0uksasn	56000.00	Charlene Gale1	Almario	c.almario1@example.com	09123456789
RS_z62cufxzm	CL_irs17tzk0	EV_vqmb824ma	56000.00	Charlene Gale1	Almario	c.almario1@example.com	09123456789
\.


--
-- Data for Name: role_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_table (role_id, role_name) FROM stdin;
ROLE001	Client
ROLE002	Staff
ROLE003	Admin
ROLE004	Server
\.


--
-- Data for Name: server_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.server_table (server_id, server_fname, server_lname, role_id) FROM stdin;
SRV001	John	Doe	ROLE004
SRV002	Jane	Doe	ROLE004
SRV003	Michael	Smith	ROLE004
SRV004	Emily	Johnson	ROLE004
SRV005	David	Brown	ROLE004
SRV006	Sarah	Taylor	ROLE004
SRV007	James	Anderson	ROLE004
SRV008	Olivia	Williams	ROLE004
SRV009	Matthew	Jones	ROLE004
SRV010	Sophia	Davis	ROLE004
\.


--
-- Data for Name: staff_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_table (staff_id, staff_fname, staff_lname, staff_email, staff_password, role_id) FROM stdin;
STAFF002	Raizhell	Quijano	r.quijano@example.com	$2b$10$hqvyVtj.0UVHpUB2d.fefuHpF8vjD82Va1GUMStYZHc3ChIRUeRlG	ROLE002
\.


--
-- Data for Name: transaction_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_table (transaction_id, transaction_date, transaction_time, transaction_total, transaction_status, transaction_type, transaction_payment, reservation_id) FROM stdin;
\.


--
-- Name: adds_on_table adds_on_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adds_on_table
    ADD CONSTRAINT adds_on_table_pkey PRIMARY KEY (adds_on_id);


--
-- Name: client_table client_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_table
    ADD CONSTRAINT client_table_pkey PRIMARY KEY (client_id);


--
-- Name: employee_table employee_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_table
    ADD CONSTRAINT employee_table_pkey PRIMARY KEY (admin_id);


--
-- Name: event_table event_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_table
    ADD CONSTRAINT event_table_pkey PRIMARY KEY (event_id);


--
-- Name: food_table food_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_table
    ADD CONSTRAINT food_table_pkey PRIMARY KEY (food_id);


--
-- Name: rating_table rating_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating_table
    ADD CONSTRAINT rating_table_pkey PRIMARY KEY (rating_id);


--
-- Name: reservation_food_table reservation_food_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_food_table
    ADD CONSTRAINT reservation_food_table_pkey PRIMARY KEY (reservation_food_id);


--
-- Name: reservation_table reservation_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_table
    ADD CONSTRAINT reservation_table_pkey PRIMARY KEY (reservation_id);


--
-- Name: role_table role_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_table
    ADD CONSTRAINT role_table_pkey PRIMARY KEY (role_id);


--
-- Name: server_table server_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.server_table
    ADD CONSTRAINT server_table_pkey PRIMARY KEY (server_id);


--
-- Name: staff_table staff_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_table
    ADD CONSTRAINT staff_table_pkey PRIMARY KEY (staff_id);


--
-- Name: transaction_table transaction_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_table
    ADD CONSTRAINT transaction_table_pkey PRIMARY KEY (transaction_id);


--
-- Name: adds_on_table adds_on_table_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adds_on_table
    ADD CONSTRAINT adds_on_table_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservation_table(reservation_id);


--
-- Name: client_table client_table_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client_table
    ADD CONSTRAINT client_table_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role_table(role_id);


--
-- Name: employee_table employee_table_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_table
    ADD CONSTRAINT employee_table_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role_table(role_id);


--
-- Name: rating_table rating_table_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating_table
    ADD CONSTRAINT rating_table_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservation_table(reservation_id);


--
-- Name: reservation_food_table reservation_food_table_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_food_table
    ADD CONSTRAINT reservation_food_table_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.food_table(food_id);


--
-- Name: reservation_food_table reservation_food_table_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_food_table
    ADD CONSTRAINT reservation_food_table_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservation_table(reservation_id);


--
-- Name: reservation_table reservation_table_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_table
    ADD CONSTRAINT reservation_table_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.client_table(client_id);


--
-- Name: reservation_table reservation_table_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation_table
    ADD CONSTRAINT reservation_table_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event_table(event_id);


--
-- Name: server_table server_table_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.server_table
    ADD CONSTRAINT server_table_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role_table(role_id);


--
-- Name: staff_table staff_table_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_table
    ADD CONSTRAINT staff_table_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role_table(role_id);


--
-- Name: transaction_table transaction_table_reservation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_table
    ADD CONSTRAINT transaction_table_reservation_id_fkey FOREIGN KEY (reservation_id) REFERENCES public.reservation_table(reservation_id);


--
-- PostgreSQL database dump complete
--

