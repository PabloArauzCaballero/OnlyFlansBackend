-- =========================================================
-- PATCH ONLYFLANS
-- Ajustes:
-- 1. Agregar imagenPerfil y urlImagenPortada al usuario
-- 2. Cambiar logs.metadata de TEXT a JSONB
-- 3. Permitir logs sin sesión obligatoria
-- 4. Agregar id_usuario en logs
-- 5. Cambiar FK de logs para no borrar logs si se borra sesión
-- 6. Crear publicacion_imagen para múltiples imágenes por publicación
-- 7. Quitar imagen_url de publicacion
-- =========================================================

BEGIN;

-- =========================================================
-- 1. AGREGAR IMÁGENES GENERALES AL USUARIO
-- =========================================================

ALTER TABLE onlyflans.usuario
ADD COLUMN IF NOT EXISTS url_imagen_portada TEXT;

ALTER TABLE onlyflans.usuario
ADD COLUMN IF NOT EXISTS imagen_perfil TEXT;

-- =========================================================
-- 2. MEJORAR LOGS: metadata TEXT -> JSONB
-- =========================================================
-- Este cambio es seguro incluso si metadata tiene texto plano,
-- porque lo convierte en un JSON con la clave "raw".

ALTER TABLE onlyflans.logs
ALTER COLUMN metadata TYPE JSONB
USING
    CASE
        WHEN metadata IS NULL OR TRIM(metadata) = '' THEN NULL
        ELSE jsonb_build_object('raw', metadata)
    END;

-- =========================================================
-- 3. PERMITIR LOGS SIN SESIÓN
-- =========================================================

ALTER TABLE onlyflans.logs
ALTER COLUMN id_sesion DROP NOT NULL;

-- =========================================================
-- 4. CAMBIAR FK DE LOGS A SESIÓN
-- Para que no se borren logs si se elimina una sesión.
-- =========================================================

ALTER TABLE onlyflans.logs
DROP CONSTRAINT IF EXISTS fk_log_sesion_usuario;

ALTER TABLE onlyflans.logs
ADD CONSTRAINT fk_log_sesion_usuario
FOREIGN KEY (id_sesion)
REFERENCES onlyflans.sesion_usuario(id_sesion)
ON DELETE SET NULL;

-- =========================================================
-- 5. AGREGAR id_usuario DIRECTO EN LOGS
-- Sirve para registrar acciones incluso si no hay sesión activa.
-- =========================================================

ALTER TABLE onlyflans.logs
ADD COLUMN IF NOT EXISTS id_usuario BIGINT;

ALTER TABLE onlyflans.logs
DROP CONSTRAINT IF EXISTS fk_logs_usuario;

ALTER TABLE onlyflans.logs
ADD CONSTRAINT fk_logs_usuario
FOREIGN KEY (id_usuario)
REFERENCES onlyflans.usuario(id_usuario)
ON DELETE SET NULL;

-- =========================================================
-- 6. CREAR TABLA PARA MÚLTIPLES IMÁGENES POR PUBLICACIÓN
-- =========================================================

CREATE TABLE IF NOT EXISTS onlyflans.publicacion_imagen (
    id_publicacion_imagen BIGINT GENERATED ALWAYS AS IDENTITY,
    id_publicacion BIGINT NOT NULL,

    link_imagen TEXT NOT NULL,
    orden INTEGER NOT NULL DEFAULT 1,

    fecha_registro TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fecha_actualizacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    version INTEGER NOT NULL DEFAULT 1,
    estado_registro VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT pk_publicacion_imagen PRIMARY KEY (id_publicacion_imagen),

    CONSTRAINT fk_publicacion_imagen_publicacion
        FOREIGN KEY (id_publicacion)
        REFERENCES onlyflans.publicacion(id_publicacion)
        ON DELETE CASCADE,

    CONSTRAINT chk_publicacion_imagen_link
        CHECK (LENGTH(TRIM(link_imagen)) > 0),

    CONSTRAINT chk_publicacion_imagen_orden
        CHECK (orden > 0),

    CONSTRAINT chk_publicacion_imagen_estado_registro
        CHECK (estado_registro IN ('ACTIVO', 'INACTIVO', 'ELIMINADO'))
);

CREATE INDEX IF NOT EXISTS idx_publicacion_imagen_publicacion
ON onlyflans.publicacion_imagen(id_publicacion, orden);

-- =========================================================
-- 7. MIGRAR IMÁGENES EXISTENTES DESDE publicacion.imagen_url
-- Si ya tenías publicaciones con imagen_url, se pasan a la nueva tabla.
-- =========================================================

INSERT INTO onlyflans.publicacion_imagen (
    id_publicacion,
    link_imagen,
    orden,
    fecha_registro,
    fecha_actualizacion,
    version,
    estado_registro
)
SELECT
    p.id_publicacion,
    p.imagen_url,
    1,
    NOW(),
    NOW(),
    1,
    'ACTIVO'
FROM onlyflans.publicacion p
WHERE p.imagen_url IS NOT NULL
  AND LENGTH(TRIM(p.imagen_url)) > 0
  AND NOT EXISTS (
      SELECT 1
      FROM onlyflans.publicacion_imagen pi
      WHERE pi.id_publicacion = p.id_publicacion
        AND pi.link_imagen = p.imagen_url
  );

-- =========================================================
-- 8. QUITAR imagen_url DE publicacion
-- =========================================================

ALTER TABLE onlyflans.publicacion
DROP CONSTRAINT IF EXISTS chk_publicacion_contenido;

ALTER TABLE onlyflans.publicacion
DROP COLUMN IF EXISTS imagen_url;

-- Ahora la publicación puede tener:
-- - texto solamente
-- - imágenes solamente
-- - texto + imágenes
-- La validación de "debe tener texto o imagen" la haces desde backend.

ALTER TABLE onlyflans.publicacion
ADD CONSTRAINT chk_publicacion_texto_valido
CHECK (
    texto IS NULL
    OR LENGTH(TRIM(texto)) > 0
);

-- =========================================================
-- 9. ÍNDICES EXTRA RECOMENDADOS PARA LOGS
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_logs_id_usuario
ON onlyflans.logs(id_usuario);

CREATE INDEX IF NOT EXISTS idx_logs_id_sesion
ON onlyflans.logs(id_sesion);

CREATE INDEX IF NOT EXISTS idx_logs_fecha_registro
ON onlyflans.logs(fecha_registro DESC);

CREATE INDEX IF NOT EXISTS idx_logs_metadata_gin
ON onlyflans.logs
USING GIN (metadata);

COMMIT;