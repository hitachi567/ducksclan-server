create table IF NOT EXISTS journal(
    id          INTEGER,
    fingerprint TEXT,
    ip          TEXT,
    user_id     TEXT,
    action      INTEGER,
    PRIMARY KEY(id AUTOINCREMENT)
)