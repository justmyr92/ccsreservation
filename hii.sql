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
    client_contact character varying(50),
    status character varying(30),
    proposal character varying(255)
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
AO_r9xhx8ahd	extra tables	RS_g30j2n7ne
AO_7c864tmv1	name standee	RS_g30j2n7ne
AO_wxca3hy22	Scaffold	RS_wrqeacq8j
AO_nvgb7xssy	chairs	RS_wrqeacq8j
\.


--
-- Data for Name: client_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client_table (client_id, client_fname, client_lname, client_email, client_contact, client_street, client_barangay, client_city, client_password, role_id) FROM stdin;
CL_irs17tzk0	Charlene Gale	Almario	c.almario@example.com	09123456789	Bauan - Mabini Rd.	San Pedro	Bauan	$2b$10$mpdx3uvlUkDDiPmY0wOavu603p6O486CFlFQoaGHvwra4nlePxeAW	ROLE001
CL_jhqoso9pg	jane	doe	janedoe@gmail.com	09123457689	Ubelt	San Pedro	Bauan	$2b$10$SR03OljeeDftDlhh85prvu1W8dY0UoHzu2tKoTn.hqRQyNLiurpLG	ROLE001
CL_7umnfatof	Gale	Largado	gale.largado@gmail.com	09991849714	Ibaba	San Pedro	Bauan	$2b$10$pyHzW9WGBi/8rWuHeUf6R.4wFwVAGv25l26rLdF25cNeoLKKHiiYu	ROLE003
CL_ak113xmia	Raizhell Ann	Quijano	raizhellann@gmail.com	09092484177	Ibaba	San Pedro	Bauan	$2b$10$ZYDIMUJun6BNDrHjlswkLeR4hvNyTUbO52v25yXBAy5FkXOyZbwHW	ROLE001
CL_sesoiimbn	Charlene Gale	Largado	charlenegale01@gmail.com	09991849712	Ibaba	San Pedro	Bauan	$2b$10$KLjWkKIBEr.fokC9fNRqne6wFRhIVJ3n1OoOKz0b.JJjq2Tx7Gy6q	ROLE001
CL_eifkfmnfr	Mark Andrew	Almario	mrkndrw515@gmail.com	09155437979	A. Magnaye	P. Niogan	Mabini	$2b$10$ZxALFKRbxPMLBUl738VaXOXXkrmdWCGk8xddB4Br6fR/NtlGA.wAO	ROLE001
CL_m5tc8603a	Allainer	Reyes	allainerlreyes@gmail.com	09634026624	Lalao	Anilao East	Mabini	$2b$10$zGVDVbOc0dNJfN0LU/OXWOZg1WbU/VAuVNaCuYi4iAN5n4q/8MKy.	ROLE001
CL_w1lfv2uqf	Michael	Valdrez	michael.valdrez01@gmail.com	09091239392	Z. Evangelista	Poblacion	Mabini	$2b$10$kCZisw748qbyW4Kc/SHi7e5nFgDYsWJQUEu99k6vYPWr1Zo42LRWC	ROLE001
CL_2echi3bjd	Junior	Arasula	juniorarasula123@gmail.com	09369744408	Katagbakan	Gasang	Mabini	$2b$10$UbGz4YpiSu7naXhmb83NbO4BPLw.3HRxtHhIMsH0j4zZaaNr8l4BW	ROLE001
CL_jjh8dzorp	Aedrian Jacklord	Jaso	ajjacklord@gmail.com	09669266416	Mapalad	Bulacan	Mabini	$2b$10$CK511bW5iZSfBFfVF5E4ZuIPeVH1Y2lRUQqzMPHhsmWmM4H9ZqWpa	ROLE001
CL_5epzktvvv	Jiro	Dimayuga	jirodimayuga295@gmail.com	09385330688	Orosa St.	Aplaya	Bauan	$2b$10$fOBCFWrBoc/oMiHczzp1U.EfOsT6E60cAXemOGaq6jdjeMnSXPCqS	ROLE001
CL_0y7iqjbxm	Casey	Salvacion	salvacioncassandra19@gmail.com	09771428756	Ibaba	San Pedro	Bauan	$2b$10$/8KS/YacchQfnWbe407U4ea0mzPids.tcQ0Z6lll7z//XHFJ13puq	ROLE001
CL_bkpq0h49j	Angeline	Fabricante	anggefabricante@gmail.com	09309153135	Tomas Dalangin	Bolo	Bauan	$2b$10$51w2gjA.VYEJBx9VaOK6P.yaAyWUhKfbyHFbUEz7CHCk1WleerYA2	ROLE001
CL_1ugw12sa9	Angelica	Salvacion	angel.salvacionnnn@gmail.com	09954722484	Ibaba	San Pedro	Bauan	$2b$10$BzMTkuq0/C4RUlhMd1NLRuRDNMdnb.1d8qxZhcLzK2FX1B0k0y55W	ROLE001
CL_ok6em7k5z	Lhudymuel	Abe	lhudymuel@gmail.com	09369813607	Ligaan	Gasang	Mabini	$2b$10$N/QUmRbIVcwPmdbRBPtKLOLMK3PX5T7X0718mbKxreWWfJCHSDZye	ROLE001
CL_0gu5jcsxw	Marizchelle	Magtibay	marizchellem@gmail.com	09167098047	Malaya	Estrella	Mabini	$2b$10$g3zTCqEcd7aeUZCvr9wAFunniXIgDrtNQejpauGalm1j2PM3GKH8.	ROLE001
CL_gnkhs1kyt	Ray	Bantugon	rbantugon3@gmail.com	09291299452	South Balanga	Saguing	Mabini	$2b$10$BVu4ZHZMT4wHpz.M/UbmlOkx6ltgAoW/JTxeFUSLWW25bSMDsxqNG	ROLE001
CL_n66awg9yf	Ammie Joy	Mallada	ammiejoymallada01@gmail.com	09502354399	Gaac	Calamias	Mabini	$2b$10$/22P6zpy.Gx88Yt11G9PNeoLlrbZknASMdjypoFDaYJDuCDBznxJ2	ROLE001
\.


--
-- Data for Name: employee_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_table (admin_id, admin_fname, admin_lname, admin_email, admin_password, role_id) FROM stdin;
EMP001	Justmyr	Gutierrez	j.gutierrez@example.com	$2b$10$H67tecwaTDYN1J0rXDsAA.uW8lHr8W69UyA1Jxg7.pmHBaFXQnc2C	ROLE003
CCS01	Aileen	Calinao	aileen.calinao@yahoo.com	$2b$10$s3pcRAvoFcEufdTAolxZH.9q6pAszkt3vX/TTGIDTVXXTChF/JNWu	ROLE003
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
EV_q9x4d937p	Thalia @ 2	2st Birthday	2023-11-24	15:30:00	San Pedro, Bauan, Batangas	true	Faires	Pastel Colors	150
EV_9inv06hjj	Ellie's Christening	Christening/Baptism	2023-11-28	11:30:00	Sittio Gaak, Brgy. Calamias, Mabini, Batangas	true	Angel	White and pink	150
EV_00qi3zlkc	Thalia @ 2	2nd Birthday	2024-10-14	15:00:00	San Pedro Ibaba, Bauan, Batangas	true	Faires	Pastel Colors	200
EV_2nay95oiq	Janneth @ 45	Birthday	2024-05-24	12:00:00	Brgy. La Mesa, Calamba, Laguna	true	Golden	Black and gold	50
EV_rqbfdplvr	Gale @ 7	Birthday	2024-10-01	15:00:00	Sittio Mailayin, Brgy. P. Niogan, Mabini, Batangas	true	Barbie	Pastel Colors	200
\.


--
-- Data for Name: food_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_table (food_id, food_name, food_type, food_price, food_description, food_image) FROM stdin;
FD_klu5xr0y2	Lumpiang Sariwa	Presidential Table (Add On)	450.00		../src/assets/foods/1700559054409-food_image.jpg
FD_8xy78l9ft	Crab Relleno	Presidential Table (Add On)	650.00		../src/assets/foods/1700559084528-food_image.jpg
FD_6q3gs4e6j	Chicken Salted Egg	Presidential Table (Add On)	450.00		../src/assets/foods/1700559108896-food_image.jpg
FD_41hj2s3zq	Fruit Salad	Dessert	59.00		../src/assets/foods/1700292447595-food_image.jpg
FD_izg1kmudv	Maja Blanca	Dessert	59.00		../src/assets/foods/1700292940076-food_image.jpg
FD_gjs99f7mc	Leche Flan	Dessert	59.00		../src/assets/foods/1700293016735-food_image.jpg
FD_ocqetk51p	Buko Pandan	Dessert	59.00		../src/assets/foods/1700293110913-food_image.jpg
FD_3nxgsp9tz	Mixed Fresh Fruits	Dessert	59.00		../src/assets/foods/1700293268052-food_image.jpg
FD_jpolt6lye	Mango Jelly	Dessert	59.00		../src/assets/foods/1700293371502-food_image.jpg
FD_lpen7pocw	Dessert Bar 	Dessert	59.00		../src/assets/foods/1700293559558-food_image.jpg
FD_xupe8qvkr	Fried Chicken	Chicken	79.00	Love ko 'to!	../src/assets/foods/1700233163969-food_image.jpg
FD_bswknv4m9	N/A	N/A	0.00	Need to delete	../src/assets/foods/1700233521027-food_image.png
FD_nyva1ew66	Chicken Macaroni Salad	Appetizers	99.00	A hearty and delicious side dish.	../src/assets/foods/1700539413640-food_image.jpg
FD_04n7cjrlu	Chicken Potato 	Appetizers	150.00	need to delete	../src/assets/foods/1700541904992-food_image.png
FD_ldq6t3pt0	Corn Soup 	Soup	100.00	 A seasonal way to enjoy fresh corn.	../src/assets/foods/1700543748637-food_image.png
FD_f8wlqpp23	Pumpkin Soup 	Soup	150.00	Usually 'bound' soup made from a purée of pumpkin.	../src/assets/foods/1700543909459-food_image.png
FD_jpep5iwbg	Mushroom Soup 	Soup	150.00	Roux is thinned with cream and then mushrooms	../src/assets/foods/1700543997237-food_image.png
FD_z4mdb95sv	Garden Salad with Thousand Island	Appetizers	149.00	Completely customizable depending on the season.	../src/assets/foods/1700541811301-food_image.jpg
FD_f16dtbzzu	Macaroni Soup 	Soup	150.00		../src/assets/foods/1700544207719-food_image.png
FD_qymguwxuk	Cream of Chicken 	Soup	150.00		../src/assets/foods/1700544243652-food_image.png
FD_sxmqsvdy4	Clear Vegetable 	Soup	100.00		../src/assets/foods/1700544276830-food_image.png
FD_5g363ddwe	Cream of Vegetable 	Soup	120.00		../src/assets/foods/1700544309186-food_image.png
FD_7qyav9f76	Carrots Soup 	Soup	120.00		../src/assets/foods/1700547690981-food_image.png
FD_vtbuyvxph	Cream of Broccoli 	Soup	150.00		../src/assets/foods/1700547782632-food_image.png
FD_5ajjz1ehf	Potato Soup 	Soup	120.00		../src/assets/foods/1700547997132-food_image.png
FD_1634o4eqc	Italian Minestrone 	Soup	150.00		../src/assets/foods/1700548088268-food_image.png
FD_haspa83ke	Cream of Asparagus 	Soup	130.00		../src/assets/foods/1700548129085-food_image.png
FD_p3azc5iw7	Cream of Onion Soup 	Soup	130.00		../src/assets/foods/1700548157920-food_image.png
FD_kqy03mx0k	Chicken Potato Salad	Appetizer	145.00		../src/assets/foods/1700548261218-food_image.png
FD_xe22ijl6m	Tomato Soup 	Soup	150.00		../src/assets/foods/1700548038926-food_image.png
FD_a6z2ar941	Szechuan Style Pork	Pork	500.00		../src/assets/foods/1700550633587-food_image.jpg
FD_m3bkss9qo	Pork Chop Zingara	Pork	500.00		../src/assets/foods/1700550659735-food_image.JPG
FD_85kc3hog0	Roast Steak Mushroom Sauce	Pork	520.00		../src/assets/foods/1700550688675-food_image.jpg
FD_ef4vdx8a4	Pork Stew with Vegetables	Pork	550.00		../src/assets/foods/1700550716732-food_image.jpg
FD_us1rdcrfh	Pork BBQ Liempo	Pork	520.00		../src/assets/foods/1700550753761-food_image.jpg
FD_wvsunv7xm	Sweet Sour Pork	Pork	545.00		../src/assets/foods/1700550783782-food_image.jpg
FD_66d1gambt	Pork Cordon Bleu	Pork	350.00		../src/assets/foods/1700550807421-food_image.jpg
FD_xnmgi0lyk	Pork Hamonado	Pork	450.00		../src/assets/foods/1700550841966-food_image.jpg
FD_u9tuneaji	Pork BBQ Tenderloin with Sauce	Pork	550.00		../src/assets/foods/1700550866643-food_image.jpg
FD_sbqnde1r3	Pork Teriyaki	Pork	550.00		../src/assets/foods/1700550891294-food_image.jpg
FD_41q0zqaui	Besuto	All Guests Table (Choice of One)	250.00		../src/assets/foods/1700551045070-food_image.jpg
FD_w6uvvx4ho	Mixed Nuts	All Guests Table (Choice of One)	280.00		../src/assets/foods/1700551102217-food_image.jpg
FD_zcp8jncrs	Chopsuey	All Guests Table (Choice of One)	350.00		../src/assets/foods/1700551129766-food_image.jpg
FD_t5ijvatcp	Pork Tofu	Presidential Table (Add On)	450.00		../src/assets/foods/1700558996907-food_image.jpg
FD_i9n91i052	Cereal Prawn	Presidential Table (Add On)	650.00		../src/assets/foods/1700559027142-food_image.jpg
FD_g99wy0j8b	Mixed Vegetables	Appetizers	109.00		../src/assets/foods/1700233345962-food_image.jpg
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
RF_5lxng9ofc	RS_wrqeacq8j	FD_41hj2s3zq
RF_y3531ldg6	RS_wrqeacq8j	FD_xupe8qvkr
RF_awc3lwfe3	RS_wrqeacq8j	FD_lpen7pocw
RF_doagyvy02	RS_wrqeacq8j	FD_g99wy0j8b
RF_j9zf33vh2	RS_tp3mh2cpn	FD_41hj2s3zq
RF_5ymtmh604	RS_tp3mh2cpn	FD_3nxgsp9tz
RF_xkaf92jsb	RS_tp3mh2cpn	FD_gjs99f7mc
RF_9vl32lck0	RS_tp3mh2cpn	FD_xupe8qvkr
RF_5q0a2axnn	RS_kwtqz7fqr	FD_izg1kmudv
RF_w93walyma	RS_kwtqz7fqr	FD_41hj2s3zq
RF_omm1gong6	RS_kwtqz7fqr	FD_g99wy0j8b
RF_qbyu2ikik	RS_i15l9s3iv	FD_41hj2s3zq
RF_e8l6qlit8	RS_i15l9s3iv	FD_g99wy0j8b
RF_vj419vcl2	RS_i15l9s3iv	FD_izg1kmudv
\.


--
-- Data for Name: reservation_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation_table (reservation_id, client_id, event_id, total_price, client_fname, client_lname, client_email, client_contact, status, proposal) FROM stdin;
RS_uszjl98ta	CL_irs17tzk0	EV_0u9cuer2l	\N	Charlene Gale	Almario	c.almario1@example.com	09123456789	Pending	\N
RS_oeozksjv1	CL_irs17tzk0	EV_xt4zhlu7j	\N	Charlene Gale	Almario	c.almario1@example.com	09123456789	Pending	\N
RS_395njupi6	CL_irs17tzk0	EV_eerkjuxt9	\N	Charlene Gale1	Almario	c.almario1@example.com	09123456789	Pending	\N
RS_3na2eguky	CL_irs17tzk0	EV_wf0uksasn	\N	Charlene Gale1	Almario	c.almario1@example.com	09123456789	Pending	\N
RS_z62cufxzm	CL_irs17tzk0	EV_vqmb824ma	\N	Charlene Gale1	Almario	c.almario1@example.com	09123456789	Pending	\N
RS_g30j2n7ne	CL_jhqoso9pg	EV_q9x4d937p	\N	jane	doe	janedoe@gmail.com	09123457689	Pending	\N
RS_wrqeacq8j	CL_n66awg9yf	EV_9inv06hjj	\N	Ammie Joy	Mallada	ammiejoymallada01@gmail.com	09502354399	Pending	\N
RS_tp3mh2cpn	CL_sesoiimbn	EV_00qi3zlkc	\N	Charlene Gale	Largado	charlenegale01@gmail.com	09991849712	Pending	\N
RS_kwtqz7fqr	CL_ak113xmia	EV_2nay95oiq	\N	Raizhell Ann	Quijano	raizhellann@gmail.com	09092484177	Pending	\N
RS_i15l9s3iv	CL_eifkfmnfr	EV_rqbfdplvr	\N	Mark Andrew	Almario	mrkndrw515@gmail.com	09155437979	Pending	\N
RS_k7eyl801q	CL_irs17tzk0	EV_cubkirhb0	123123.00	Charlene Gale	Almario	c.almario1@example.com	09123456789	Completed	../src/assets/foods/1700659657131-file.png
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
n25trv6k5	2023-11-22	13:06:35	56000.00	Completed	Over the Counter	56000	RS_i15l9s3iv
ezas12wuu	2023-11-22	13:27:45	123123.00	Completed	Over the Counter	123	RS_k7eyl801q
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

