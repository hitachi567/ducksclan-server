create table IF NOT EXISTS token(
    id          INTEGER,
    user_id     TEXT NOT NULL,
    fingerprint TEXT NOT NULL UNIQUE,
    ip          TEXT,
    token       TEXT NOT NULL UNIQUE,
    date        DATE NOT NULL,
    PRIMARY KEY(id AUTOINCREMENT)
)