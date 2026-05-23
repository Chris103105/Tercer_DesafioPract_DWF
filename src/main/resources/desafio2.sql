
CREATE DATABASE IF NOT EXISTS desafio2;
USE desafio2;


DROP TABLE IF EXISTS alumno_materia;
DROP TABLE IF EXISTS alumno;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS profesor;


CREATE TABLE IF NOT EXISTS profesor (
                                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                        nombre VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS materia (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       nombre VARCHAR(100) NOT NULL,
    id_profesor BIGINT NOT NULL,
    FOREIGN KEY (id_profesor) REFERENCES profesor(id)
    );

CREATE TABLE IF NOT EXISTS alumno (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS alumno_materia (
                                              id_alumno BIGINT,
                                              id_materia BIGINT,
                                              PRIMARY KEY (id_alumno, id_materia),
    FOREIGN KEY (id_alumno) REFERENCES alumno(id),
    FOREIGN KEY (id_materia) REFERENCES materia(id)
    );


INSERT INTO profesor (nombre) VALUES
                                  ('Ligia Marcela Majano'),
                                  ('Bladimir Campos'),
                                  ('Alexander  Campos'),
                                  ('Nelson  Belloso '),
                                  ('Leonardo Alfonso ');

INSERT INTO materia (nombre, id_profesor) VALUES
                                              ('Programación Orientada a Objetos', 1),
                                              ('Administración de Bases de Datos', 2),
                                              ('Redes de Comunicación', 3),
                                              ('Algebra', 4),
                                              ('Servidores en Plataformas Propietarias', 5);

INSERT INTO alumno (nombre, apellido) VALUES
                                          ('Christopher ', 'Jovel'),
                                          ('Odaly', 'Cruz'),
                                          ('Manuel', 'Luna'),
                                          ('Sofia', 'Menjivar'),
                                          ('Diego', 'Torre');

INSERT INTO alumno_materia (id_alumno, id_materia) VALUES
                                                       (1, 1), (2, 2), (3, 3), (4, 4), (5, 5);