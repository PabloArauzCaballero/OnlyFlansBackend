--
-- PostgreSQL database dump
--

-- Dumped from database version 17.10 (322a063)
-- Dumped by pg_dump version 17.0

-- Started on 2026-05-22 17:45:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 8 (class 2615 OID 73728)
-- Name: onlyflans; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA onlyflans;


ALTER SCHEMA onlyflans OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 81970)
-- Name: apoyo; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.apoyo (
    id_apoyo bigint NOT NULL,
    id_seguidor bigint NOT NULL,
    id_creador bigint NOT NULL,
    id_tipo_apoyo bigint NOT NULL,
    cantidad integer NOT NULL,
    monto_unitario_bs numeric(10,2) NOT NULL,
    monto_total_bs numeric(12,2) GENERATED ALWAYS AS (((cantidad)::numeric * monto_unitario_bs)) STORED,
    mensaje text,
    estado_pago character varying(30) DEFAULT 'SIMULADO_APROBADO'::character varying NOT NULL,
    fecha_apoyo timestamp with time zone DEFAULT now() NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_apoyo_cantidad CHECK ((cantidad > 0)),
    CONSTRAINT chk_apoyo_estado_pago CHECK (((estado_pago)::text = ANY ((ARRAY['PENDIENTE'::character varying, 'SIMULADO_APROBADO'::character varying, 'ANULADO'::character varying])::text[]))),
    CONSTRAINT chk_apoyo_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[]))),
    CONSTRAINT chk_apoyo_monto_unitario CHECK ((monto_unitario_bs > (0)::numeric))
);


ALTER TABLE onlyflans.apoyo OWNER TO neondb_owner;

--
-- TOC entry 232 (class 1259 OID 81969)
-- Name: apoyo_id_apoyo_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.apoyo ALTER COLUMN id_apoyo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.apoyo_id_apoyo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 82114)
-- Name: comentario_publicacion; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.comentario_publicacion (
    id_comentario bigint NOT NULL,
    id_publicacion bigint NOT NULL,
    id_seguidor bigint NOT NULL,
    comentario text NOT NULL,
    fecha_comentario timestamp with time zone DEFAULT now() NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_comentario_no_vacio CHECK ((length(TRIM(BOTH FROM comentario)) > 0)),
    CONSTRAINT chk_comentario_publicacion_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.comentario_publicacion OWNER TO neondb_owner;

--
-- TOC entry 238 (class 1259 OID 82113)
-- Name: comentario_publicacion_id_comentario_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.comentario_publicacion ALTER COLUMN id_comentario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.comentario_publicacion_id_comentario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 82172)
-- Name: creador_favorito; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.creador_favorito (
    id_favorito bigint NOT NULL,
    id_seguidor bigint NOT NULL,
    id_creador bigint NOT NULL,
    fecha_favorito timestamp with time zone DEFAULT now() NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_creador_favorito_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.creador_favorito OWNER TO neondb_owner;

--
-- TOC entry 240 (class 1259 OID 82171)
-- Name: creador_favorito_id_favorito_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.creador_favorito ALTER COLUMN id_favorito ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.creador_favorito_id_favorito_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 237 (class 1259 OID 82083)
-- Name: creador_seguido; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.creador_seguido (
    id_seguimiento bigint NOT NULL,
    id_seguidor bigint NOT NULL,
    id_creador bigint NOT NULL,
    fecha_seguimiento timestamp with time zone DEFAULT now() NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_creador_seguido_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.creador_seguido OWNER TO neondb_owner;

--
-- TOC entry 236 (class 1259 OID 82082)
-- Name: creador_seguido_id_seguimiento_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.creador_seguido ALTER COLUMN id_seguimiento ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.creador_seguido_id_seguimiento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 73953)
-- Name: logs; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.logs (
    id_log bigint NOT NULL,
    id_sesion bigint,
    accion text,
    metadata jsonb,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    id_usuario bigint,
    CONSTRAINT chk_logs_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.logs OWNER TO neondb_owner;

--
-- TOC entry 224 (class 1259 OID 73952)
-- Name: logs_id_log_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.logs ALTER COLUMN id_log ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.logs_id_log_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 231 (class 1259 OID 81952)
-- Name: meta_apoyo; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.meta_apoyo (
    id_meta bigint NOT NULL,
    id_creador bigint NOT NULL,
    titulo character varying(160) NOT NULL,
    descripcion text NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_meta_apoyo_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.meta_apoyo OWNER TO neondb_owner;

--
-- TOC entry 230 (class 1259 OID 81951)
-- Name: meta_apoyo_id_meta_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.meta_apoyo ALTER COLUMN id_meta ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.meta_apoyo_id_meta_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 74002)
-- Name: perfil_creador; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.perfil_creador (
    id_usuario bigint NOT NULL,
    nombre_publico character varying(120) NOT NULL,
    biografia text,
    foto_perfil_url text,
    banner_url text,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_perfil_creador_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.perfil_creador OWNER TO neondb_owner;

--
-- TOC entry 227 (class 1259 OID 81920)
-- Name: perfil_seguidor; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.perfil_seguidor (
    id_usuario bigint NOT NULL,
    nombre_visible character varying(120) NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_perfil_seguidor_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.perfil_seguidor OWNER TO neondb_owner;

--
-- TOC entry 235 (class 1259 OID 82034)
-- Name: publicacion; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.publicacion (
    id_publicacion bigint NOT NULL,
    id_creador bigint NOT NULL,
    texto text,
    fecha_publicacion timestamp with time zone DEFAULT now() NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_publicacion_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[]))),
    CONSTRAINT chk_publicacion_texto_valido CHECK (((texto IS NULL) OR (length(TRIM(BOTH FROM texto)) > 0)))
);


ALTER TABLE onlyflans.publicacion OWNER TO neondb_owner;

--
-- TOC entry 234 (class 1259 OID 82033)
-- Name: publicacion_id_publicacion_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.publicacion ALTER COLUMN id_publicacion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.publicacion_id_publicacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 243 (class 1259 OID 90129)
-- Name: publicacion_imagen; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.publicacion_imagen (
    id_publicacion_imagen bigint NOT NULL,
    id_publicacion bigint NOT NULL,
    link_imagen text NOT NULL,
    orden integer DEFAULT 1 NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_publicacion_imagen_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[]))),
    CONSTRAINT chk_publicacion_imagen_link CHECK ((length(TRIM(BOTH FROM link_imagen)) > 0)),
    CONSTRAINT chk_publicacion_imagen_orden CHECK ((orden > 0))
);


ALTER TABLE onlyflans.publicacion_imagen OWNER TO neondb_owner;

--
-- TOC entry 242 (class 1259 OID 90128)
-- Name: publicacion_imagen_id_publicacion_imagen_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.publicacion_imagen ALTER COLUMN id_publicacion_imagen ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.publicacion_imagen_id_publicacion_imagen_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 73934)
-- Name: sesion_usuario; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.sesion_usuario (
    id_sesion bigint NOT NULL,
    id_usuario bigint NOT NULL,
    fecha_inicio timestamp with time zone DEFAULT now() NOT NULL,
    fecha_cierre timestamp with time zone,
    ip character varying(80),
    user_agent text,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_sesion_usuario_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[])))
);


ALTER TABLE onlyflans.sesion_usuario OWNER TO neondb_owner;

--
-- TOC entry 222 (class 1259 OID 73933)
-- Name: sesion_usuario_id_sesion_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.sesion_usuario ALTER COLUMN id_sesion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.sesion_usuario_id_sesion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 81936)
-- Name: tipo_apoyo; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.tipo_apoyo (
    id_tipo_apoyo bigint NOT NULL,
    codigo character varying(40) NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    monto_unitario_bs numeric(10,2) NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    CONSTRAINT chk_tipo_apoyo_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[]))),
    CONSTRAINT chk_tipo_apoyo_monto CHECK ((monto_unitario_bs > (0)::numeric))
);


ALTER TABLE onlyflans.tipo_apoyo OWNER TO neondb_owner;

--
-- TOC entry 228 (class 1259 OID 81935)
-- Name: tipo_apoyo_id_tipo_apoyo_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.tipo_apoyo ALTER COLUMN id_tipo_apoyo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.tipo_apoyo_id_tipo_apoyo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 73916)
-- Name: usuario; Type: TABLE; Schema: onlyflans; Owner: neondb_owner
--

CREATE TABLE onlyflans.usuario (
    id_usuario bigint NOT NULL,
    nombre character varying(120) NOT NULL,
    email public.citext NOT NULL,
    password_hash text NOT NULL,
    rol character varying(20) NOT NULL,
    ultimo_login timestamp with time zone,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    fecha_actualizacion timestamp with time zone DEFAULT now() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    estado_registro character varying(20) DEFAULT 'ACTIVO'::character varying NOT NULL,
    url_imagen_portada text,
    imagen_perfil text,
    CONSTRAINT chk_usuario_estado_registro CHECK (((estado_registro)::text = ANY ((ARRAY['ACTIVO'::character varying, 'INACTIVO'::character varying, 'ELIMINADO'::character varying])::text[]))),
    CONSTRAINT chk_usuario_rol CHECK (((rol)::text = ANY ((ARRAY['CREADOR'::character varying, 'SEGUIDOR'::character varying])::text[])))
);


ALTER TABLE onlyflans.usuario OWNER TO neondb_owner;

--
-- TOC entry 220 (class 1259 OID 73915)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE onlyflans.usuario ALTER COLUMN id_usuario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME onlyflans.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3714 (class 0 OID 81970)
-- Dependencies: 233
-- Data for Name: apoyo; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.apoyo (id_apoyo, id_seguidor, id_creador, id_tipo_apoyo, cantidad, monto_unitario_bs, mensaje, estado_pago, fecha_apoyo, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3720 (class 0 OID 82114)
-- Dependencies: 239
-- Data for Name: comentario_publicacion; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.comentario_publicacion (id_comentario, id_publicacion, id_seguidor, comentario, fecha_comentario, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3722 (class 0 OID 82172)
-- Dependencies: 241
-- Data for Name: creador_favorito; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.creador_favorito (id_favorito, id_seguidor, id_creador, fecha_favorito, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3718 (class 0 OID 82083)
-- Dependencies: 237
-- Data for Name: creador_seguido; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.creador_seguido (id_seguimiento, id_seguidor, id_creador, fecha_seguimiento, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3706 (class 0 OID 73953)
-- Dependencies: 225
-- Data for Name: logs; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.logs (id_log, id_sesion, accion, metadata, fecha_registro, fecha_actualizacion, version, estado_registro, id_usuario) FROM stdin;
\.


--
-- TOC entry 3712 (class 0 OID 81952)
-- Dependencies: 231
-- Data for Name: meta_apoyo; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.meta_apoyo (id_meta, id_creador, titulo, descripcion, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3707 (class 0 OID 74002)
-- Dependencies: 226
-- Data for Name: perfil_creador; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.perfil_creador (id_usuario, nombre_publico, biografia, foto_perfil_url, banner_url, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3708 (class 0 OID 81920)
-- Dependencies: 227
-- Data for Name: perfil_seguidor; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.perfil_seguidor (id_usuario, nombre_visible, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3716 (class 0 OID 82034)
-- Dependencies: 235
-- Data for Name: publicacion; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.publicacion (id_publicacion, id_creador, texto, fecha_publicacion, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3724 (class 0 OID 90129)
-- Dependencies: 243
-- Data for Name: publicacion_imagen; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.publicacion_imagen (id_publicacion_imagen, id_publicacion, link_imagen, orden, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3704 (class 0 OID 73934)
-- Dependencies: 223
-- Data for Name: sesion_usuario; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.sesion_usuario (id_sesion, id_usuario, fecha_inicio, fecha_cierre, ip, user_agent, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
\.


--
-- TOC entry 3710 (class 0 OID 81936)
-- Dependencies: 229
-- Data for Name: tipo_apoyo; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.tipo_apoyo (id_tipo_apoyo, codigo, nombre, descripcion, monto_unitario_bs, fecha_registro, fecha_actualizacion, version, estado_registro) FROM stdin;
1	FLAN	Flan	Apoyo simbólico equivalente a un flan	10.00	2026-05-22 15:42:15.759427+00	2026-05-22 15:42:15.759427+00	1	ACTIVO
\.


--
-- TOC entry 3702 (class 0 OID 73916)
-- Dependencies: 221
-- Data for Name: usuario; Type: TABLE DATA; Schema: onlyflans; Owner: neondb_owner
--

COPY onlyflans.usuario (id_usuario, nombre, email, password_hash, rol, ultimo_login, fecha_registro, fecha_actualizacion, version, estado_registro, url_imagen_portada, imagen_perfil) FROM stdin;
\.


--
-- TOC entry 3730 (class 0 OID 0)
-- Dependencies: 232
-- Name: apoyo_id_apoyo_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.apoyo_id_apoyo_seq', 1, false);


--
-- TOC entry 3731 (class 0 OID 0)
-- Dependencies: 238
-- Name: comentario_publicacion_id_comentario_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.comentario_publicacion_id_comentario_seq', 1, false);


--
-- TOC entry 3732 (class 0 OID 0)
-- Dependencies: 240
-- Name: creador_favorito_id_favorito_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.creador_favorito_id_favorito_seq', 1, false);


--
-- TOC entry 3733 (class 0 OID 0)
-- Dependencies: 236
-- Name: creador_seguido_id_seguimiento_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.creador_seguido_id_seguimiento_seq', 1, false);


--
-- TOC entry 3734 (class 0 OID 0)
-- Dependencies: 224
-- Name: logs_id_log_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.logs_id_log_seq', 1, false);


--
-- TOC entry 3735 (class 0 OID 0)
-- Dependencies: 230
-- Name: meta_apoyo_id_meta_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.meta_apoyo_id_meta_seq', 1, false);


--
-- TOC entry 3736 (class 0 OID 0)
-- Dependencies: 234
-- Name: publicacion_id_publicacion_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.publicacion_id_publicacion_seq', 1, false);


--
-- TOC entry 3737 (class 0 OID 0)
-- Dependencies: 242
-- Name: publicacion_imagen_id_publicacion_imagen_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.publicacion_imagen_id_publicacion_imagen_seq', 1, false);


--
-- TOC entry 3738 (class 0 OID 0)
-- Dependencies: 222
-- Name: sesion_usuario_id_sesion_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.sesion_usuario_id_sesion_seq', 1, false);


--
-- TOC entry 3739 (class 0 OID 0)
-- Dependencies: 228
-- Name: tipo_apoyo_id_tipo_apoyo_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.tipo_apoyo_id_tipo_apoyo_seq', 1, true);


--
-- TOC entry 3740 (class 0 OID 0)
-- Dependencies: 220
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: onlyflans; Owner: neondb_owner
--

SELECT pg_catalog.setval('onlyflans.usuario_id_usuario_seq', 1, false);


--
-- TOC entry 3519 (class 2606 OID 81987)
-- Name: apoyo pk_apoyo; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.apoyo
    ADD CONSTRAINT pk_apoyo PRIMARY KEY (id_apoyo);


--
-- TOC entry 3530 (class 2606 OID 82127)
-- Name: comentario_publicacion pk_comentario_publicacion; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.comentario_publicacion
    ADD CONSTRAINT pk_comentario_publicacion PRIMARY KEY (id_comentario);


--
-- TOC entry 3533 (class 2606 OID 82182)
-- Name: creador_favorito pk_creador_favorito; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_favorito
    ADD CONSTRAINT pk_creador_favorito PRIMARY KEY (id_favorito);


--
-- TOC entry 3525 (class 2606 OID 82093)
-- Name: creador_seguido pk_creador_seguido; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_seguido
    ADD CONSTRAINT pk_creador_seguido PRIMARY KEY (id_seguimiento);


--
-- TOC entry 3502 (class 2606 OID 73964)
-- Name: logs pk_id_log; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.logs
    ADD CONSTRAINT pk_id_log PRIMARY KEY (id_log);


--
-- TOC entry 3514 (class 2606 OID 81963)
-- Name: meta_apoyo pk_meta_apoyo; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.meta_apoyo
    ADD CONSTRAINT pk_meta_apoyo PRIMARY KEY (id_meta);


--
-- TOC entry 3506 (class 2606 OID 74013)
-- Name: perfil_creador pk_perfil_creador; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.perfil_creador
    ADD CONSTRAINT pk_perfil_creador PRIMARY KEY (id_usuario);


--
-- TOC entry 3508 (class 2606 OID 81929)
-- Name: perfil_seguidor pk_perfil_seguidor; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.perfil_seguidor
    ADD CONSTRAINT pk_perfil_seguidor PRIMARY KEY (id_usuario);


--
-- TOC entry 3522 (class 2606 OID 82047)
-- Name: publicacion pk_publicacion; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.publicacion
    ADD CONSTRAINT pk_publicacion PRIMARY KEY (id_publicacion);


--
-- TOC entry 3538 (class 2606 OID 90143)
-- Name: publicacion_imagen pk_publicacion_imagen; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.publicacion_imagen
    ADD CONSTRAINT pk_publicacion_imagen PRIMARY KEY (id_publicacion_imagen);


--
-- TOC entry 3496 (class 2606 OID 73946)
-- Name: sesion_usuario pk_sesion_usuario; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.sesion_usuario
    ADD CONSTRAINT pk_sesion_usuario PRIMARY KEY (id_sesion);


--
-- TOC entry 3510 (class 2606 OID 81948)
-- Name: tipo_apoyo pk_tipo_apoyo; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.tipo_apoyo
    ADD CONSTRAINT pk_tipo_apoyo PRIMARY KEY (id_tipo_apoyo);


--
-- TOC entry 3490 (class 2606 OID 73928)
-- Name: usuario pk_usuario; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.usuario
    ADD CONSTRAINT pk_usuario PRIMARY KEY (id_usuario);


--
-- TOC entry 3535 (class 2606 OID 82184)
-- Name: creador_favorito uq_creador_favorito; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_favorito
    ADD CONSTRAINT uq_creador_favorito UNIQUE (id_seguidor, id_creador);


--
-- TOC entry 3527 (class 2606 OID 82095)
-- Name: creador_seguido uq_creador_seguido; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_seguido
    ADD CONSTRAINT uq_creador_seguido UNIQUE (id_seguidor, id_creador);


--
-- TOC entry 3512 (class 2606 OID 81950)
-- Name: tipo_apoyo uq_tipo_apoyo_codigo; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.tipo_apoyo
    ADD CONSTRAINT uq_tipo_apoyo_codigo UNIQUE (codigo);


--
-- TOC entry 3492 (class 2606 OID 73930)
-- Name: usuario uq_usuario_email; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.usuario
    ADD CONSTRAINT uq_usuario_email UNIQUE (email);


--
-- TOC entry 3494 (class 2606 OID 73932)
-- Name: usuario uq_usuario_id_rol; Type: CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.usuario
    ADD CONSTRAINT uq_usuario_id_rol UNIQUE (id_usuario, rol);


--
-- TOC entry 3515 (class 1259 OID 82199)
-- Name: idx_apoyo_creador_fecha; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_apoyo_creador_fecha ON onlyflans.apoyo USING btree (id_creador, fecha_apoyo DESC);


--
-- TOC entry 3516 (class 1259 OID 82201)
-- Name: idx_apoyo_creador_seguidor; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_apoyo_creador_seguidor ON onlyflans.apoyo USING btree (id_creador, id_seguidor);


--
-- TOC entry 3517 (class 1259 OID 82200)
-- Name: idx_apoyo_seguidor_fecha; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_apoyo_seguidor_fecha ON onlyflans.apoyo USING btree (id_seguidor, fecha_apoyo DESC);


--
-- TOC entry 3528 (class 1259 OID 82202)
-- Name: idx_comentario_publicacion_fecha; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_comentario_publicacion_fecha ON onlyflans.comentario_publicacion USING btree (id_publicacion, fecha_comentario DESC);


--
-- TOC entry 3531 (class 1259 OID 82203)
-- Name: idx_favorito_seguidor; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_favorito_seguidor ON onlyflans.creador_favorito USING btree (id_seguidor);


--
-- TOC entry 3497 (class 1259 OID 90153)
-- Name: idx_logs_fecha_registro; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_logs_fecha_registro ON onlyflans.logs USING btree (fecha_registro DESC);


--
-- TOC entry 3498 (class 1259 OID 90152)
-- Name: idx_logs_id_sesion; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_logs_id_sesion ON onlyflans.logs USING btree (id_sesion);


--
-- TOC entry 3499 (class 1259 OID 90151)
-- Name: idx_logs_id_usuario; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_logs_id_usuario ON onlyflans.logs USING btree (id_usuario);


--
-- TOC entry 3500 (class 1259 OID 90154)
-- Name: idx_logs_metadata_gin; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_logs_metadata_gin ON onlyflans.logs USING gin (metadata);


--
-- TOC entry 3503 (class 1259 OID 82196)
-- Name: idx_perfil_creador_nombre; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_perfil_creador_nombre ON onlyflans.perfil_creador USING btree (nombre_publico);


--
-- TOC entry 3504 (class 1259 OID 82197)
-- Name: idx_perfil_creador_nombre_trgm; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_perfil_creador_nombre_trgm ON onlyflans.perfil_creador USING gin (nombre_publico public.gin_trgm_ops);


--
-- TOC entry 3520 (class 1259 OID 82198)
-- Name: idx_publicacion_creador_fecha; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_publicacion_creador_fecha ON onlyflans.publicacion USING btree (id_creador, fecha_publicacion DESC);


--
-- TOC entry 3536 (class 1259 OID 90149)
-- Name: idx_publicacion_imagen_publicacion; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_publicacion_imagen_publicacion ON onlyflans.publicacion_imagen USING btree (id_publicacion, orden);


--
-- TOC entry 3523 (class 1259 OID 82204)
-- Name: idx_seguido_seguidor; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_seguido_seguidor ON onlyflans.creador_seguido USING btree (id_seguidor);


--
-- TOC entry 3488 (class 1259 OID 82195)
-- Name: idx_usuario_email; Type: INDEX; Schema: onlyflans; Owner: neondb_owner
--

CREATE INDEX idx_usuario_email ON onlyflans.usuario USING btree (email);


--
-- TOC entry 3545 (class 2606 OID 81993)
-- Name: apoyo fk_apoyo_creador; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.apoyo
    ADD CONSTRAINT fk_apoyo_creador FOREIGN KEY (id_creador) REFERENCES onlyflans.perfil_creador(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3546 (class 2606 OID 81988)
-- Name: apoyo fk_apoyo_seguidor; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.apoyo
    ADD CONSTRAINT fk_apoyo_seguidor FOREIGN KEY (id_seguidor) REFERENCES onlyflans.perfil_seguidor(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3547 (class 2606 OID 81998)
-- Name: apoyo fk_apoyo_tipo_apoyo; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.apoyo
    ADD CONSTRAINT fk_apoyo_tipo_apoyo FOREIGN KEY (id_tipo_apoyo) REFERENCES onlyflans.tipo_apoyo(id_tipo_apoyo) ON DELETE RESTRICT;


--
-- TOC entry 3551 (class 2606 OID 82128)
-- Name: comentario_publicacion fk_comentario_publicacion_publicacion; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.comentario_publicacion
    ADD CONSTRAINT fk_comentario_publicacion_publicacion FOREIGN KEY (id_publicacion) REFERENCES onlyflans.publicacion(id_publicacion) ON DELETE CASCADE;


--
-- TOC entry 3552 (class 2606 OID 82133)
-- Name: comentario_publicacion fk_comentario_publicacion_seguidor; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.comentario_publicacion
    ADD CONSTRAINT fk_comentario_publicacion_seguidor FOREIGN KEY (id_seguidor) REFERENCES onlyflans.perfil_seguidor(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3553 (class 2606 OID 82190)
-- Name: creador_favorito fk_creador_favorito_creador; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_favorito
    ADD CONSTRAINT fk_creador_favorito_creador FOREIGN KEY (id_creador) REFERENCES onlyflans.perfil_creador(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3554 (class 2606 OID 82185)
-- Name: creador_favorito fk_creador_favorito_seguidor; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_favorito
    ADD CONSTRAINT fk_creador_favorito_seguidor FOREIGN KEY (id_seguidor) REFERENCES onlyflans.perfil_seguidor(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3549 (class 2606 OID 82101)
-- Name: creador_seguido fk_creador_seguido_creador; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_seguido
    ADD CONSTRAINT fk_creador_seguido_creador FOREIGN KEY (id_creador) REFERENCES onlyflans.perfil_creador(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3550 (class 2606 OID 82096)
-- Name: creador_seguido fk_creador_seguido_seguidor; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.creador_seguido
    ADD CONSTRAINT fk_creador_seguido_seguidor FOREIGN KEY (id_seguidor) REFERENCES onlyflans.perfil_seguidor(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3540 (class 2606 OID 90118)
-- Name: logs fk_log_sesion_usuario; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.logs
    ADD CONSTRAINT fk_log_sesion_usuario FOREIGN KEY (id_sesion) REFERENCES onlyflans.sesion_usuario(id_sesion) ON DELETE SET NULL;


--
-- TOC entry 3541 (class 2606 OID 90123)
-- Name: logs fk_logs_usuario; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.logs
    ADD CONSTRAINT fk_logs_usuario FOREIGN KEY (id_usuario) REFERENCES onlyflans.usuario(id_usuario) ON DELETE SET NULL;


--
-- TOC entry 3544 (class 2606 OID 81964)
-- Name: meta_apoyo fk_meta_apoyo_creador; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.meta_apoyo
    ADD CONSTRAINT fk_meta_apoyo_creador FOREIGN KEY (id_creador) REFERENCES onlyflans.perfil_creador(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3542 (class 2606 OID 74014)
-- Name: perfil_creador fk_perfil_creador_usuario; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.perfil_creador
    ADD CONSTRAINT fk_perfil_creador_usuario FOREIGN KEY (id_usuario) REFERENCES onlyflans.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3543 (class 2606 OID 81930)
-- Name: perfil_seguidor fk_perfil_seguidor_usuario; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.perfil_seguidor
    ADD CONSTRAINT fk_perfil_seguidor_usuario FOREIGN KEY (id_usuario) REFERENCES onlyflans.usuario(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3548 (class 2606 OID 82048)
-- Name: publicacion fk_publicacion_creador; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.publicacion
    ADD CONSTRAINT fk_publicacion_creador FOREIGN KEY (id_creador) REFERENCES onlyflans.perfil_creador(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 3555 (class 2606 OID 90144)
-- Name: publicacion_imagen fk_publicacion_imagen_publicacion; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.publicacion_imagen
    ADD CONSTRAINT fk_publicacion_imagen_publicacion FOREIGN KEY (id_publicacion) REFERENCES onlyflans.publicacion(id_publicacion) ON DELETE CASCADE;


--
-- TOC entry 3539 (class 2606 OID 73947)
-- Name: sesion_usuario fk_sesion_usuario_usuario; Type: FK CONSTRAINT; Schema: onlyflans; Owner: neondb_owner
--

ALTER TABLE ONLY onlyflans.sesion_usuario
    ADD CONSTRAINT fk_sesion_usuario_usuario FOREIGN KEY (id_usuario) REFERENCES onlyflans.usuario(id_usuario) ON DELETE CASCADE;


-- Completed on 2026-05-22 17:46:03

--
-- PostgreSQL database dump complete
--

