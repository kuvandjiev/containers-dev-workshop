CREATE TABLE public.messages (id integer NOT NULL, message text);
ALTER TABLE public.messages OWNER TO postgres;
CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.messages_id_seq OWNER TO postgres;
ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
SELECT pg_catalog.setval('public.messages_id_seq', 1, true);
ALTER TABLE ONLY public.messages ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
