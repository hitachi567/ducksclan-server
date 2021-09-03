CREATE TABLE IF NOT EXISTS user(
    id          TEXT PRIMARY KEY,
    username    TEXT NOT NULL UNIQUE,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    create_date DATE NOT NULL
);